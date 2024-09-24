import axios from 'axios'

export const coverFileApis = {
    coverFileInformation: '/covers/',
    embed: '/embed/',
}

export const embeddedFileApis = {
    extract: '/extract/',
}

export const BASE_URL = 'http://localhost:1212'

const HTTP = axios.create({
    baseURL: BASE_URL,
})

export default HTTP
