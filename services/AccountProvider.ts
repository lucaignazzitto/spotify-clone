import axios from 'axios'

const axiosInstace = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ACCOUNT_DOMAIN
})

axiosInstace.interceptors.response.use(response => {
  return response;
}, error => {
  if (error?.response?.status === 401) {
    window.location.href = '/login'
  }
  return Promise.reject(error)
})

export default axiosInstace
