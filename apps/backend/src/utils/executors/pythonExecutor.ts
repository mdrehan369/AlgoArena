import { randomUUID } from "node:crypto";
import fs from 'fs'
import { spawnSync } from "node:child_process";
import { TestCase } from "@repo/db";
import { Outputs } from "src/types/runner.types";
import os from 'os'

const platform = os.platform()

export default function pythonExecutor(code: string, testCases: TestCase[]) {
  const uuid = randomUUID()
  const filename = `${uuid}.py`
  fs.writeFileSync(filename, code, 'utf-8')

  let interpretor = 'python3'
  if (platform != 'linux') interpretor = 'python'

  const outputs: Outputs[] = []

  for (const testCase of testCases) {
    const result = spawnSync(`${interpretor} ${filename}`, {
      input: testCase.input,
      encoding: "utf-8"
    })

    if (result.error) outputs.push({ testCaseId: testCase.id, output: result.stderr, status: "FAIL" })
    if (result.stdout != testCase.output) outputs.push({ testCaseId: testCase.id, output: result.stdout, status: "FAIL" })
    else outputs.push({ testCaseId: testCase.id, output: result.stdout, status: "PASS" })
  }

  fs.unlinkSync(filename)

  return { success: true, data: outputs }
}
