import ProblemPage from "@components/problems/problemsPage/ProblemPage"
import api from "config/axios.config"

export default async function ProblemSolvePage({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params

  const problem = await api.get(`/problems/problem/${slug}`)

  return <ProblemPage problem={problem.data.data} />
}

