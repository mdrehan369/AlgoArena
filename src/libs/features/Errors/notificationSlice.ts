import { createSlice } from "@reduxjs/toolkit"
import React from "react"

export enum Variant {
    SUCCESS,
    ERROR,
    WARNING
}

export interface NotificationState {
    message: string | React.ReactNode
    title: string
    variant: Variant
    isOpen: boolean
}

const initialState: NotificationState | null = {
    message: "",
    title: "",
    variant: Variant.SUCCESS,
    isOpen: false
}

const notificationSlice = createSlice({
    name: "NotificationState",
    initialState,
    reducers: {
        setNotification: (
            state,
            action: {
                payload: { message: string | React.ReactNode; title: string; variant: Variant }
            }
        ) => {
            state.message = action.payload.message
            state.title = action.payload.title
            state.variant = action.payload.variant
            state.isOpen = true
        },
        clearNotification: (state) => {
            state.isOpen = false
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
