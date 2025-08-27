import { randomUUID } from "node:crypto";
import fs from 'fs'
import { TestCase } from "@repo/db";
import spawner from "../spawner.js";

export default async function jsExecutor(code: string, testCases: TestCase[], timeLimit: number, memoryLimit: number) {
  const uuid = randomUUID()
  const filename = `${uuid}.cjs`
  fs.writeFileSync(filename, code, 'utf-8')

  try {
    const response = await spawner(`node`, [`./${filename}`], testCases, timeLimit, memoryLimit)
    return response
  } catch (error: any) {
    console.log(error)
    return { success: false, message: "Some error occured inside server", error: error.message, errorCode: 500 }
  } finally {
    if (fs.existsSync(filename)) fs.unlinkSync(filename)
  }
}
