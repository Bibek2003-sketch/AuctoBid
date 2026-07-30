import axios from "axios"

// Base URL of our backend
const API = axios.create({
    baseURL: "http://localhost:3000/api/users",
})

// forgot password API
export const forgotPassword = async (email) => {
    const response = await API.post("/forgot-password", {email,})

    return response.data
}

export const resetPassword = async (token, password) => {
    const response = await API.post(`/reset-password/${token}`, {password})

    return response.data;
}