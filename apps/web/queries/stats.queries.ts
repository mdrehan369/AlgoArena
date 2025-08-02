import api from "config/axios.config"

export const getBasicStats = async ({ userId }: { userId: string }) => {
    try {
        const res = await api.get(`/stats/basic/${userId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
