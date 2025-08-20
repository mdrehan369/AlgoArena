import { TestCase } from "@repo/db"

export type Outputs = {
  output: string,
  status: "PASS" | "FAIL",
  runtime: number, // in milli seconds
  memory: number // in kilo bytes,
  testCase: TestCase
}
