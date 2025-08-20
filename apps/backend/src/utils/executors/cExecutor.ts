import { randomUUID } from "node:crypto";
import fs from 'fs'
import { spawnSync } from "node:child_process";
import { TestCase } from "@repo/db";
import { Outputs } from "src/types/runner.types";


export default function cExecutor(code: string, testCases: TestCase[]) {
  const uuid = randomUUID()
  const filename = `${uuid}.c`
  fs.writeFileSync(filename, code, 'utf-8')

  const compile = spawnSync('gcc', [`${filename}`, '-o', `${uuid}`])
  if (compile.stderr && compile.stderr.toString() != "") return { success: false, message: "some error occured while compiling", error: compile.stderr.toString() }

  const outputs: Outputs[] = []

  for (const testCase of testCases) {
    const result = spawnSync(`./${uuid}`, {
      input: testCase.input,
      encoding: "utf-8"
    })

    if (result.stderr && result.stderr.toString() != "") {
      outputs.push({ testCaseId: testCase.id, output: result.stderr, status: "FAIL" })
      continue
    }
    const stdOut = result.stdout.toString()
    const formattedStdOut = stdOut.trim().replaceAll("\n", "")

    let isPass: Outputs['status'] = "FAIL"
    if (formattedStdOut == testCase.output) isPass = "PASS"

    outputs.push({ testCaseId: testCase.id, output: formattedStdOut, status: isPass })

  }


  fs.unlinkSync(filename)
  fs.unlinkSync(`./${uuid}`)


  return { success: true, data: outputs }
}
