
import { createSlice } from "@reduxjs/toolkit";
import { string } from "better-auth";
import { FullProblem } from "types/problems.types";
import { Outputs } from "types/TestCase.types";

enum Language {
  C = "C",
  CPP = "CPP",
  JS = "JS",
  PYTHON = "PYTHON"
}

export interface ProblemState {
  problem: FullProblem | null,
  code: string,
  language: Language,
  isRunning: boolean,
  testResults: Outputs[],
  compileError: string | null
}

const initialState: ProblemState = {
  problem: null,
  code: "",
  language: Language.CPP,
  isRunning: false,
  testResults: [],
  compileError: null
};

const problemsSlice = createSlice({
  name: "problems",
  initialState,
  reducers: {
    setProblemStatement: (state, action: { payload: FullProblem }) => {
      state.problem = action.payload;
    },
    setCode: (state, action: { payload: string }) => {
      state.code = action.payload
    },
    setLanguage: (state, action: { payload: Language }) => {
      state.language = action.payload
    },
    startRunTest: (state) => {
      state.compileError = null
      state.isRunning = true
    },
    stopRunTest: (state) => {
      state.isRunning = false
    },
    setTestResults: (state, action: { payload: Outputs[] }) => {
      state.testResults = action.payload
    },
    setCompileError: (state, action: { payload: string }) => {
      state.testResults = []
      state.compileError = action.payload
    }
  },
});

export const { setProblemStatement, setCode, setLanguage, startRunTest, stopRunTest, setTestResults, setCompileError } = problemsSlice.actions;
export default problemsSlice.reducer
