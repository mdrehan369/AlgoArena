import api from "config/axios.config"
import { Level, Topic } from "@repo/db"

export const getProblems = async (params: {
  page?: number,
  limit?: number,
  status?: "solved" | "attempted" | "not-attempted",
  level?: Level,
  topics?: Topic[],
  search?: string
}) => {
  try {
    const response = await api.get('/problems', { params })
    return response.data.data
  } catch (error) {
    console.log("Error while fetching problems", error)
    return null
  }
}
