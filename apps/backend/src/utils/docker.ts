import Docker from 'dockerode'
import { Queue } from './queue'
import { HealthStatus } from './health'
import stream from 'stream'

enum ContainerStatus {
    'CREATED',
    'RUNNING',
    'STOPPED',
    'CRASHED',
}

enum TaskStatus {
    'IDLE',
    'ASSIGNED',
}
interface IContainer {
    id: string
    name: string
    status: ContainerStatus
    taskStatus: TaskStatus
    partition: number
}

export class DockerManager {
    private docker: Docker
    private containerMap: Map<number, IContainer>
    private schedulingQueue: Queue

    // private IMAGE = "mdrehan369/algoarena:runner_dev";
    private IMAGE = 'algoarena_runner_dev'
    private NETWORK = 'algoarena'

    constructor() {
        this.docker = new Docker()
        this.containerMap = new Map()
        this.schedulingQueue = new Queue()
    }

    async createContainers(partitions: number) {
        if (partitions < 1 || !this.docker) {
            console.log('Invalid Configuration')
            return
        }

        try {
            for (let i = 0; i < partitions; i++) {
                const container = await this.docker.createContainer({
                    Image: this.IMAGE,
                    name: `algoarenaRunnerDev${i}`,
                    HostConfig: {
                        NetworkMode: this.NETWORK,
                        AutoRemove: true,
                        Memory: 512 * 1024 * 1024, // 512 MB
                        MemorySwap: 512 * 1024 * 1024, // no extra swap
                        NanoCpus: 1 * 1e9, // 1 CPU core (1e9 = 1 CPU)
                        PidsLimit: 100,
                        Ulimits: [
                            { Name: 'nofile', Soft: 1024, Hard: 1024 }, // max file descriptors
                        ],
                        // ✅ Security
                        ReadonlyRootfs: true, // root FS is read-only
                        Privileged: false, // never privileged
                        CapDrop: ['ALL'],
                        Tmpfs: {
                            '/app/tmp': 'rw,exec,nosuid,nodev,uid=1000,gid=1000,size=64m',
                            '/tmp': 'rw,exec,nosuid,nodev',
                        },
                    },
                    Env: [`KAFKA_CLIENT_ID=algoarenaRunner${i}`],
                    User: '1000:1000',
                })

                console.log(container.id)
                await container.start()

                this.schedulingQueue.enqueue(i)

                this.containerMap.set(i, {
                    id: container.id,
                    name: `algoarenaRunnerDev${i}`,
                    partition: i,
                    status: ContainerStatus.CREATED,
                    taskStatus: TaskStatus.IDLE,
                })
            }
        } catch (error) {
            console.log('Error while creating containers: ', error)
        }
    }

    async assignTask() {
        if (this.schedulingQueue.isEmpty()) return 0
        const partition = this.schedulingQueue.dequeue()
        this.schedulingQueue.enqueue(partition!)
        return partition
    }

    async getContainers() {
        const containers: Array<Record<string, any>> = []
        for (const partition of this.containerMap.keys()) {
            containers.push({
                partition,
                id: this.containerMap.get(partition)?.id,
            })
        }

        return containers
    }

    async healthCheck(): Promise<HealthStatus[]> {
        const containerHealths: HealthStatus[] = []

        for (const key of this.containerMap.keys()) {
            const containerVal = this.containerMap.get(key)
            const startTime = Date.now()

            const healthStatus: HealthStatus = {
                status: 'DOWN',
                responseTime: 0,
                details: {},
            }

            if (
                !containerVal ||
                [ContainerStatus.CRASHED, ContainerStatus.STOPPED].includes(containerVal.status)
            ) {
                healthStatus.responseTime = Date.now() - startTime
                healthStatus.details = {
                    message: "Can't reach the container",
                    reason: containerVal?.status,
                }
                containerHealths.push(healthStatus)
                continue
            }

            const container = this.docker.getContainer(containerVal.id)

            try {
                const exec = await container.exec({
                    AttachStdout: true,
                    AttachStderr: true,
                    Cmd: [
                        'curl',
                        '-s',
                        '-o',
                        '/dev/null',
                        '-w',
                        '%{http_code}',
                        'http://localhost:6001/health/live',
                    ],
                })

                const execStream = await exec.start({ hijack: true, stdin: false })

                const stdout = new stream.PassThrough()
                const stderr = new stream.PassThrough()

                // ✅ Properly demultiplex the Docker stream
                this.docker.modem.demuxStream(execStream, stdout, stderr)

                const output = await new Promise<string>((resolve, reject) => {
                    let data = ''
                    stdout.on('data', (chunk) => (data += chunk.toString()))
                    stderr.on('data', (chunk) => (data += chunk.toString()))
                    execStream.on('end', () => resolve(data.trim()))
                    execStream.on('error', reject)
                })

                healthStatus.responseTime = Date.now() - startTime

                if (output.includes('200')) {
                    healthStatus.status = 'UP'
                    healthStatus.details = { message: 'Health check passed', response: output }
                } else {
                    healthStatus.details = {
                        message: 'Health check failed',
                        reason: 'Invalid HTTP response',
                        response: output,
                    }
                }
            } catch (err: any) {
                healthStatus.responseTime = Date.now() - startTime
                healthStatus.details = { message: 'Error in container', reason: err.message || err }
            }

            containerHealths.push(healthStatus)
        }

        return containerHealths
    }

    async cleanup() {
        console.log('Cleaning up containers...')

        for (const key of this.containerMap.keys()) {
            const id = this.containerMap.get(key)?.id
            if (!id) continue
            const container = this.docker.getContainer(id)
            try {
                await container.stop({ t: 10 }) // it will remove automatically since AutoRemove is on
                console.log(`Stopped & removed ${container.id}`)
            } catch (err) {
                console.error(`Error cleaning container ${id}:`, err)
            }
        }

        process.exit(0)
    }
}
