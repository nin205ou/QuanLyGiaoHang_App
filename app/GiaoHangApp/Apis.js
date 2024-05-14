import axios from "axios";

const root_api = 'https://858b-2402-800-6314-c783-ec6d-c21b-6ff3-3dbf.ngrok-free.app/'

export const endpoints = {
    'login': 'o/token/',
    'register': 'api/users/',
    'current_user': 'api/users/current_user/',
    'auctions': 'api/auctions/',
    'payment_methods': 'api/payment_methods/',
    'bids': 'api/bids/',
    'otps': 'api/otps/',
    'orders': 'api/orders/',
    'status_order': 'api/status_order/',
    'momo_payment': 'api/momo_payment/',
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