import axios from 'axios'

const BaseUrl = "https://api.musixmatch.com/ws"
const ApiVersion = "1.1"
const Apikey = process.env.NEXT_MUSIXMATCH_API_KEY

const axiosInstace = axios.create({
  baseURL: `${BaseUrl}/${ApiVersion}`,
  params: {
    'apikey': Apikey
  }
})

export default axiosInstace
