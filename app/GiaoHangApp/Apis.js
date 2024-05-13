import axios from "axios";

const root_api = 'https://a3f2-2402-800-6314-c783-dd4e-45d4-40c8-677d.ngrok-free.app/'

export const endpoints = {
    'login': 'o/token/',
    'register': 'api/users/',
    'current_user': 'api/users/current_user/',
    'auctions': 'api/auctions/',
    'payment_methods': 'api/payment_methods/',
    'bids': 'api/bids/',
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