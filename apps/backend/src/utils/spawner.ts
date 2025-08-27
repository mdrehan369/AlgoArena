import { TestCase } from "@repo/db"
import { spawn } from "child_process"
import pidusage from "pidusage"
import { Outputs } from "@/types/runner.types.js"

export default async function spawner(spawningCmd: string, params: string[], testCases: TestCase[], timeLimit: number, memoryLimit: number) {
  const outputs: Outputs[] = []

  for (const testCase of testCases) {

    await new Promise(async (res, rej) => {
      const result = spawn(spawningCmd, params)
      const pid = result.pid
      result.stdin.write(testCase.input)
      result.stdin.end()

      let memoryPeak = 0
      let runtime = 0

      const poll = () => {
        pidusage(pid!, (err, stats) => {
          if (!err && stats) {
            memoryPeak = Math.max(memoryPeak, stats.memory / (1024 * 1024));
            runtime = stats.elapsed;

            if (runtime > timeLimit * 1000) {
              result.kill(3) // 3 for TLE
            }
            if (memoryPeak > memoryLimit) {
              result.kill(4) // 4 for MLE
            }
          }
        });
      };

      let interval: NodeJS.Timeout | null = null
      setTimeout(() => {
        poll();
        interval = setInterval(poll, 50);
      }, 50);
      let stdoutData = "";
      let stderrData = "";

      result.stdout.on("data", (data) => {
        stdoutData += data.toString();
      });

      result.stderr.on("data", (data) => {
        stderrData += data.toString();
      });

      result.on("error", (error) => {
        console.log("Spawn error:", error);
      });

      result.on("close", (code) => {
        if (interval) clearInterval(interval)
        console.log(stderrData)
        const consoleOutput = stdoutData.split("~")
        const formattedStdOut = consoleOutput[1]?.trim().replaceAll("\n", "")

        if (code == 3) {
          outputs.push({ testCase, output: "", status: "TIME_LIMIT_EXCEEDED", runtime, memory: memoryPeak, console: stdoutData.replace("~", "\n") })
          res(true)
        }

        if (code == 4) {
          outputs.push({ testCase, output: "", status: "MEMORY_LIMIT_EXCEEDED", runtime, memory: memoryPeak, console: stdoutData.replace("~", "\n") })
          res(true)
        }
        if (stderrData && stderrData != "") {
          outputs.push({ testCase: testCase, output: stderrData, status: "FAIL", runtime, memory: Number(memoryPeak.toFixed(3)), console: stdoutData.replace("~", "\n") })
          res(false)
          return
        }

        let isPass: Outputs['status'] = "FAIL"
        if (formattedStdOut == testCase.output) isPass = "PASS"

        outputs.push({ testCase: testCase, output: formattedStdOut, status: isPass, runtime, memory: Number(memoryPeak.toFixed(3)), console: consoleOutput[0] })
        res(true)
      })
    })
  }

  return { success: true, data: outputs }

}
