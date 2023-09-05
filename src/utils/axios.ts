import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  timeout: 4000,
})

export default instance
