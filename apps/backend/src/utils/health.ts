import { PrismaClient } from '@repo/db'
import axios from 'axios'
import { client } from '../kafka/client.js'

export type HealthStatus = {
    status: 'UP' | 'DOWN' | 'TIMED_OUT'
    responseTime: number
    details: Record<string, any>
}

export const checkDbHealth = async (prisma: PrismaClient): Promise<HealthStatus> => {
    const healthStatus: HealthStatus = {
        status: 'DOWN',
        responseTime: 0,
        details: {},
    }

    const startTime = Date.now()

    try {
        await prisma.$queryRaw`SELECT 1;`

        healthStatus.status = 'UP'
        healthStatus.responseTime = Date.now() - startTime
        healthStatus.details = { message: 'Successfull SELECT 1 query completed' }
    } catch (error: any) {
        healthStatus.status = 'DOWN'
        healthStatus.responseTime = Date.now() - startTime
        healthStatus.details = {
            error: error.message,
            reason: 'Failed to execute health query (connection lost or timed out).',
        }
    }

    return healthStatus
}

export const checkKafkaHealth = async (): Promise<HealthStatus> => {
    const healthStatus: HealthStatus = {
        status: 'DOWN',
        responseTime: 0,
        details: {},
    }

    const startTime = Date.now()
    const admin = client.admin()

    try {
        await admin.connect()
        await admin.listTopics()

        healthStatus.status = 'UP'
        healthStatus.responseTime = Date.now() - startTime
        healthStatus.details = {
            message: 'Successfully executed simple list topics query in kafka',
        }
    } catch (error: any) {
        healthStatus.responseTime = Date.now() - startTime
        healthStatus.details = {
            reason: 'Failed to execute health query (connection lost or timed ou).',
            error: error.message,
        }
    } finally {
        admin.disconnect()
    }

    return healthStatus
}

export const checkExternalServiceHealth = async (
    url: string,
    timeout: number = 1000
): Promise<HealthStatus> => {
    const healthStatus: HealthStatus = {
        status: 'DOWN',
        responseTime: 0,
        details: {},
    }

    const startTime = Date.now()
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
        const response = await axios.get(url, { signal: controller.signal })
        clearTimeout(timeoutId)

        healthStatus.responseTime = Date.now() - startTime
        healthStatus.status = 'UP'
        healthStatus.details = { statusCode: response.status, message: 'Successfull connection!' }
    } catch (error: any) {
        clearTimeout(timeoutId)
        healthStatus.responseTime = Date.now() - startTime

        if (error.name == 'AbortError') {
            healthStatus.status = 'TIMED_OUT'
            healthStatus.details = {
                error: `Request timed out after ${healthStatus.responseTime}ms.`,
                reason: 'Service is unresponsive.',
            }
        } else {
            healthStatus.details = {
                error: error.message,
                reason: 'Network error or connection refused.',
            }
        }
    }

    return healthStatus
}
