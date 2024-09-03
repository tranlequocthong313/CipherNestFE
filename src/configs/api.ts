import axios from 'axios'

export const coverFileApis = {
    coverFileInformation: '/covers/',
}

export const BASE_URL = 'http://localhost:1212'

const HTTP = axios.create({
    baseURL: BASE_URL,
})

export default HTTP
