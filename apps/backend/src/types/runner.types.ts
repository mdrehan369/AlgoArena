import { TestCase } from "@repo/db"

export type Outputs = {
  output: string,
  status: "PASS" | "FAIL" | "TIME_LIMIT_EXCEEDED" | "MEMORY_LIMIT_EXCEEDED",
  runtime: number, // in milli seconds
  memory: number // in kilo bytes,
  testCase: TestCase,
  console: string
}
