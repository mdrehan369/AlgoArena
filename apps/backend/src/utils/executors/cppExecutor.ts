import { randomUUID } from "node:crypto";
import fs from 'fs'
import { spawn, spawnSync } from "node:child_process";
import { TestCase } from "@repo/db";
import { Outputs } from "src/types/runner.types";
import pidusage from "pidusage"

export default async function cppExecutor(code: string, testCases: TestCase[]) {
  const uuid = randomUUID()
  const filename = `${uuid}.cpp`
  fs.writeFileSync(filename, code, 'utf-8')

  try {
    const compile = spawnSync('g++', [`${filename}`, '-o', `${uuid}`])
    if (compile.stderr && compile.stderr.toString() != "") return { success: true, message: "some error occured while compiling", error: compile.stderr.toString(), errorCode: 400 }

    const outputs: Outputs[] = []

    for (const testCase of testCases) {

      await new Promise(async (res, rej) => {
        const result = spawn(`./${uuid}`)
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
            }
          });
        };

        // run once immediately
        poll();

        const interval = setInterval(poll, 10);
        let stdoutData = "";
        let stderrData = "";

        result.stdout.on("data", (data) => {
          stdoutData += data.toString();
        });

        result.stderr.on("data", (data) => {
          stderrData += data.toString();
        });

        result.on("close", () => {
          clearInterval(interval)
          if (stderrData && stderrData != "") {
            outputs.push({ testCase: testCase, output: stderrData, status: "FAIL", runtime, memory: Number(memoryPeak.toFixed(3)) })
            res(false)
            return
          }
          const formattedStdOut = stdoutData.trim().replaceAll("\n", "")

          let isPass: Outputs['status'] = "FAIL"
          if (formattedStdOut == testCase.output) isPass = "PASS"

          outputs.push({ testCase: testCase, output: formattedStdOut, status: isPass, runtime, memory: Number(memoryPeak.toFixed(3)) })
          res(true)
        })
      })
    }

    return { success: true, data: outputs }

  } catch (error: any) {
    console.log(error)
    return { success: false, message: "Some error occured inside server", error: error.message, errorCode: 500 }
  } finally {
    if (fs.existsSync(filename)) fs.unlinkSync(filename)
    if (fs.existsSync(`./${uuid}`)) fs.unlinkSync(`./${uuid}`)
  }
}
