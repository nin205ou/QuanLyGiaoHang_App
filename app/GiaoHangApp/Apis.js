import axios from "axios";

const root_api = 'https://1960-2402-800-6315-c5ca-c0f4-855-a30b-4dbd.ngrok-free.app/'

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