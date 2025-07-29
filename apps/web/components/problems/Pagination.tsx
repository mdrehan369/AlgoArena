"use client"

import { setPage } from "@lib/features/problems/problems.slice";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { Group, Pagination } from "@mantine/core";

export default function ProblemsPagination() {

    const { problems, limit, page } = useAppSelector(state => state.problem)
    const dispatch = useAppDispatch()

    return (
        <Group justify="center" mt="xl">
            <Pagination
                total={Math.ceil(problems.length / limit)}
                value={page}
                onChange={(val: number) => dispatch(setPage({ page: val }))}
                color="teal"
                styles={{
                    control: {
                        "&[dataActive]": {
                            backgroundColor: "#14b8a6",
                            borderColor: "#14b8a6",
                        },
                    },
                }}
            />
        </Group>

    )
}
