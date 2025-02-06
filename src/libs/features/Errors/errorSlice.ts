import { createSlice } from "@reduxjs/toolkit";

export interface ErrorState {
    error: string | null;
} 

const initialState: ErrorState = {
    error: null
}

const errorSlice = createSlice({
    name: "ErrorState",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload
        },
        clearError: (state) => {
            state.error = null
        }
    }
})

export const { setError, clearError } = errorSlice.actions
export default errorSlice.reducer