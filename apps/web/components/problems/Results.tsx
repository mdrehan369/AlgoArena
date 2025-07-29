"use client"

import { useAppSelector } from "@lib/hooks";
import { Text } from "@mantine/core";

export default function ProblemsResults() {

    const problems = useAppSelector(state => state.problem.problems)

    return (
        <Text c="gray.4" ta="center" mt="md" size="sm">
            Showing {problems.length} of {problems.length} problems
        </Text>

    )
}
