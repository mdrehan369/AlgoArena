import { TestCase } from "@repo/db"

export type Outputs = {
  testCase: TestCase,
  output: string,
  status: "PASS" | "FAIL",
  runtime: number,
  memory: number
}
