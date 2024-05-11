import axios from "axios";

const root_api = 'https://3439-2402-800-6314-c783-e9d0-e28f-3a2f-4ef5.ngrok-free.app'

export const endpoints = {
    'login': 'o/token/',
    'register': 'api/users/',
    'current_user': 'api/users/current_user/',
    'auctions': 'api/auctions/',
    'payment_methods': 'api/payment_methods/',
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