import axios from 'axios'

export const coverFileApis = {
    coverFileInformation: '/covers/',
    embed: '/embed/',
}

export const embeddedFileApis = {
    extract: '/extract/',
}

export const BASE_URL = process.env.REACT_APP_API_BASE_URL

const HTTP = axios.create({
    baseURL: BASE_URL,
})

export default HTTP
