import api from "config/axios.config"

export const getBasicStats = async () => {
    try {
        const res = await api.get(`/stats`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
