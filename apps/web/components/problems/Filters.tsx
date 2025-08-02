"use client"

import { setFilters } from "@lib/features/problems/problems.slice";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { Card, Group, MultiSelect, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { primaryColors, secondaryColors } from "@utils/colors";
import { topicOptions } from "@utils/constants";
import useDebounce from "hooks/useDebounce";

export default function Filters() {

    const { searchQuery, selectedLevel, selectedStatus, selectedTopics } = useAppSelector(state => state.problem.filters)
    const dispatch = useAppDispatch()

    const { debounceValue, setDebounceValue } = useDebounce({
        initialState: searchQuery,
        action: (val) => dispatch(setFilters({ filter: "searchQuery", value: val })),
        timeout: 2000
    })

    return (
        <Card
            padding="lg"
            mb="xl"
            style={{
                backgroundColor: secondaryColors.DARK,
                border: "1px solid #475569",
            }}
        >
            <Group grow>
                <TextInput
                    placeholder="Search problems..."
                    leftSection={<IconSearch size={16} />}
                    value={debounceValue}
                    onChange={(e) => setDebounceValue(e.target.value)}
                    styles={{
                        input: {
                            backgroundColor: secondaryColors.DARKER,
                            border: "1px solid #475569",
                            color: "white",
                        },
                    }}
                />

                <Select
                    placeholder="Difficulty"
                    data={[
                        { value: "STARTER", label: "Starter" },
                        { value: "APPRENTICE", label: "Apprentice" },
                        { value: "CHALLENGER", label: "Challenger" },
                        { value: "EXPERT", label: "Expert" },
                        { value: "LEGENDARY", label: "Legendary" },
                    ]}
                    value={selectedLevel}
                    onChange={(value) => dispatch(setFilters({ filter: "selectedLevel", value }))}
                    clearable
                    styles={{
                        input: {
                            backgroundColor: secondaryColors.DARKER,
                            border: "1px solid #475569",
                            color: "white",
                        },
                        dropdown: {
                            backgroundColor: secondaryColors.DARK,
                            border: "0px",
                            color: primaryColors.DEFAULT,
                            '&[dataHovered]': {
                                backgroundColor: secondaryColors.LIGHT
                            },
                        },
                    }}
                />

                <MultiSelect
                    placeholder="Topics"
                    data={topicOptions.map((topic) => ({ value: topic, label: topic.replace(/_/g, " ") }))}
                    value={selectedTopics}
                    onChange={(value) => dispatch(setFilters({ filter: "selectedTopics", value }))}
                    styles={{
                        input: {
                            backgroundColor: secondaryColors.DARKER,
                            border: "1px solid #475569",
                            color: "white",
                        },
                        dropdown: {
                            backgroundColor: secondaryColors.DARK,
                            border: "0px",
                            color: primaryColors.DEFAULT,
                            '&[dataHovered]': {
                                backgroundColor: secondaryColors.LIGHT
                            },
                        },

                    }}
                />

                <Select
                    placeholder="Status"
                    data={[
                        { value: "solved", label: "Solved" },
                        { value: "attempted", label: "Attempted" },
                        { value: "not-attempted", label: "Not Attempted" },
                    ]}
                    value={selectedStatus}
                    onChange={(value) => dispatch(setFilters({ filter: "selectedStatus", value }))}
                    clearable
                    styles={{
                        input: {
                            backgroundColor: secondaryColors.DARKER,
                            border: "1px solid #475569",
                            color: "white",
                        },
                        dropdown: {
                            backgroundColor: secondaryColors.DARK,
                            border: "0px",
                            color: primaryColors.DEFAULT,
                            '&[dataHovered]': {
                                backgroundColor: secondaryColors.LIGHT
                            },
                        },

                    }}
                />
            </Group>
        </Card>

    )
}
