import axios from 'axios'

const axiosInstace = axios.create()

axiosInstace.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    //place your reentry code
    window.location.href = '/login'
  }
  return Promise.reject(error)
})

export default axiosInstace
