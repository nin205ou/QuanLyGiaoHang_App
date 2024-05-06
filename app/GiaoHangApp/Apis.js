import axios from "axios";

const root_api = 'https://00b6-2402-800-6315-c5ca-e1f2-ac70-8fb2-8f8.ngrok-free.app'

export const endpoints = {
    'login': 'o/token/',
    'register': 'api/users/',

}

export const authApi = (accessToken) => axios.create(
    {
        baseURL: root_api,
        headers: { 'Authorization': 'Bearer ' + accessToken}
    }
)

export default axios.create({
    baseURL: root_api
})