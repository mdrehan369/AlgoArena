import {
    Container,
    Box,
} from "@mantine/core"
import Stats from "@components/problems/Stats"
import { secondaryColors } from "@utils/colors"
import PageHeader from "@components/PageHeader"
import Filters from "@components/problems/Filters"
import ProblemsTable from "@components/problems/ProblemsTable"
import ProblemsPagination from "@components/problems/Pagination"
import ProblemsResults from "@components/problems/Results"


export default function ProblemsPage() {

    return (
        <Box style={{ backgroundColor: secondaryColors.DARKER, minHeight: "100vh" }}>
            <PageHeader heading="Problems" />
            <Container size="xl" py="xl">
                <Stats />
                <Filters />
                <ProblemsTable />
                <ProblemsPagination />
                <ProblemsResults />
            </Container>
        </Box>
    )
}
