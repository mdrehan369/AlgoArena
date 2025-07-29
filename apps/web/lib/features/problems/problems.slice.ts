import { createSlice } from "@reduxjs/toolkit";
import { ProblemWithUserStatus } from "types/problems.types";
import { Level, Topic } from "@repo/db";

export interface ProblemState {
    problems: ProblemWithUserStatus[],
    filters: {
        searchQuery: string,
        selectedLevel: Level | null,
        selectedTopics: Topic[],
        selectedStatus: "solved" | "attempted" | "not-attempted" | null,
    },
    page: number,
    limit: number
}

const initialState: ProblemState = {
    problems: [],
    filters: {
        searchQuery: "",
        selectedLevel: null,
        selectedTopics: [],
        selectedStatus: null,
    },
    page: 1,
    limit: 15
};

const problemsSlice = createSlice({
    name: "problems",
    initialState,
    reducers: {
        setProblems: (state, action) => {
            state.problems = action.payload;
        },

        setFilters: (state, action: { payload: { filter: "searchQuery" | "selectedLevel" | "selectedStatus" | "selectedTopics", value: string |  string[] | null } }) => {
            state.filters = {
                ...state.filters,
                [action.payload.filter]: action.payload.value
            }
        },

        setPage: (state, action: { payload: { page: number } }) => {
            state.page = action.payload.page
        }
    },
});

export const { setProblems, setFilters, setPage } = problemsSlice.actions;
export default problemsSlice.reducer
