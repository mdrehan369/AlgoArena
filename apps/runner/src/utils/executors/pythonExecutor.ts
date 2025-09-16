import { randomUUID } from "node:crypto";
import fs from "fs";
import { CustomTestCase, TestCase } from "@repo/db";
import os from "os";
import spawner from "../spawner.js";

const platform = os.platform();

export default async function pythonExecutor(
  code: string,
  testCases: TestCase[] | CustomTestCase[],
  timeLimit: number,
  memoryLimit: number,
) {
  const uuid = randomUUID();
  const filename = `${uuid}.py`;
  fs.writeFileSync(filename, code, "utf-8");

  let interpretor = "python3";
  if (platform != "linux") interpretor = "python";

  try {
    return await spawner(
      `${interpretor}`,
      [filename],
      testCases,
      timeLimit,
      memoryLimit,
    );
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: "Some error occured inside server",
      error: error.message,
      errorCode: 500,
    };
  } finally {
    if (fs.existsSync(filename)) fs.unlinkSync(filename);
  }
}
