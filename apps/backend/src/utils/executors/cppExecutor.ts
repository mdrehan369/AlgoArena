import { randomUUID } from "node:crypto";
import fs from 'fs'
import { spawnSync } from "node:child_process";
import { TestCase } from "@repo/db";
import spawner from "../spawner.js";

export default async function cppExecutor(code: string, testCases: TestCase[], timeLimit: number, memoryLimit: number) {
  const uuid = randomUUID()
  const filename = `${uuid}.cpp`
  fs.writeFileSync(filename, code, 'utf-8')

  try {
    const compile = spawnSync('g++', [`${filename}`, '-o', `${uuid}`])
    if (compile.stderr && compile.stderr.toString() != "") return { success: true, message: "some error occured while compiling", error: compile.stderr.toString(), errorCode: 400 }

    return await spawner(`./${uuid}`, [], testCases, timeLimit, memoryLimit)
  } catch (error: any) {
    console.log(error)
    return { success: false, message: "Some error occured inside server", error: error.message, errorCode: 500 }
  } finally {
    if (fs.existsSync(filename)) fs.unlinkSync(filename)
    if (fs.existsSync(`./${uuid}`)) fs.unlinkSync(`./${uuid}`)
  }
}
