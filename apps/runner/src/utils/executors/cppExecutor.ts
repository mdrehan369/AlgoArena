import { randomUUID } from "node:crypto";
import fs from "fs";
import { spawnSync } from "node:child_process";
import { CustomTestCase, TestCase } from "@repo/db";
import spawner from "../spawner.js";
import path from "node:path";

export default async function cppExecutor(
  code: string,
  testCases: TestCase[] | CustomTestCase[],
  timeLimit: number,
  memoryLimit: number,
) {
  const uuid = randomUUID();
  const filename = `${uuid}.cpp`;
  const filePath = path.join("/app/tmp", filename);
  fs.writeFileSync(filePath, code, "utf-8");
  const outputPath = path.join("/app/tmp", uuid);

  fs.chmodSync(filePath, 0o755);

  try {
    const compile = spawnSync("g++", [`${filePath}`, "-o", `${outputPath}`]);
    if (compile.stderr && compile.stderr.toString() != "")
      return {
        success: true,
        message: "some error occured while compiling",
        error: compile.stderr.toString(),
        errorCode: 400,
      };

    fs.chmodSync(outputPath, 0o755);
    return await spawner(
      `${outputPath}`,
      [],
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
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    if (fs.existsSync(`${outputPath}`)) fs.unlinkSync(`${outputPath}`);
  }
}
