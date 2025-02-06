import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: true
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        console.log("Request Config: ", config)
        return config
    },
    function (error) {
        console.log("Request Error: ", error)
        return Promise.reject(error)
    }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
    function (response) {
        console.log("Successful Response: ", response)
        return response
    },
    function (error) {
        console.log("Unsuccessful Response: ", error)
        return Promise.reject(error)
    }
)

// TODO: Implement interceptors
