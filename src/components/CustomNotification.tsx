"use client"

import { clearNotification, Variant } from "@/libs/features/Errors/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { Notification } from "@mantine/core"
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const CustomNotification = () => {

    const map= new Map<Variant, string>()
    map.set(Variant.SUCCESS, "green")
    map.set(Variant.ERROR, "red")
    map.set(Variant.WARNING, "yellow")


    const { isOpen, message, title, variant } = useAppSelector(state => state.notification)
    const dispatch = useAppDispatch()

    const pathname = usePathname()
    useEffect(() => {
        dispatch(clearNotification())
    }, [pathname])


    return (
        isOpen &&
        <Notification
            color={map.get(variant)}
            title={title}
            style={{
                position: "absolute",
                backgroundColor: "#0f172a",
                bottom: "25px",
                right: "25px",
                color: "white",
            }}
            styles={{ title: { color: "white" }, body: {paddingRight: "15px"} }}
            onClose={() => dispatch(clearNotification())}
        >
            {message}
        </Notification>
    )
}

export default CustomNotification