
import { createSlice } from "@reduxjs/toolkit";
import { FullProblem } from "types/problems.types";

export interface ProblemState {
  problem: FullProblem | null,
}

const initialState: ProblemState = {
  problem: null,
};

const problemsSlice = createSlice({
  name: "problems",
  initialState,
  reducers: {
    setProblemStatement: (state, action) => {
      state.problem = action.payload;
    },
  },
});

export const { setProblemStatement } = problemsSlice.actions;
export default problemsSlice.reducer
