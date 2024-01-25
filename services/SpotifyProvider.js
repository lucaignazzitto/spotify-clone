import AccountProvider from './AccountProvider'

class SpotifyToken {
  bearerToken = ''
  scope = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-follow-read',
    'user-follow-modify',
    'user-library-read',
    'user-library-modify',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-modify-playback-state',
    'playlist-read-private',
    'playlist-modify-private',
    'playlist-modify-public',
    'playlist-read-collaborative',
    'streaming'
  ]
  httpLocalUrl = process.env.NEXT_LOCAL_DOMAIN
  redirect_uri = `${this.httpLocalUrl}api/callback`
  httpBaseUrl = `${process.env.NEXT_PUBLIC_API_DOMAIN}`
  response = {
    message: '',
    error: '',
    status: 200,
    value: ''
  }

  retriveInternalToken (request) {
    // retrive data from localstorage
    // and check with expiration
    const token = request && request.cookies.get('accessToken')
    return token?.value || this.bearerToken
  }

  async getToken (request) {
    const bearerToken = this.retriveInternalToken(request)
    return { ...this.response, ...{ value: bearerToken, status: bearerToken ? 200 : 401 }}
  }
  
  async retriveAuthToken (code) {
    if (code) {
      return AccountProvider.post('api/token', {
        grant_type: "authorization_code",
        code,
        client_id: process.env.NEXT_CLIENT_ID,
        redirect_uri: this.redirect_uri
      }, {
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(process.env.NEXT_CLIENT_ID + ':' + process.env.NEXT_CLIENT_SECRET).toString('base64')),
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then((res) => {
          if (res.status === 200) {
            return res.data
          } else {
            return ''
          }
        })
        .catch((err) => {
          return { ...this.response, status: 401 }
        })
    } else {
      return { ...this.response, status: 401 }
    }
  }
  
  async retriveLoginUrl () {
    const type = 'code'
    const scope = this.scope.join(' ')
    const state = this.generateRandomString()
    const client_id = process.env.NEXT_CLIENT_ID
    return `${process.env.NEXT_PUBLIC_ACCOUNT_DOMAIN}authorize?response_type=${type}&client_id=${client_id}&scope=${scope}&redirect_uri=${this.redirect_uri}&state=${state}`
  }

  async logout (request) {
    const bearerToken = this.storeToken({ request, token: '', expires_in: 0 })
    return { ...this.response, ...{ value: '', status: bearerToken ? 500 : 200 }}
  }

  storeToken ({ request, token, expires_in }) {
    this.bearerToken = token
    if (request) {
      request.cookies.set('accessToken', token, {
        maxAge: expires_in,
        path: "/",
        // httpOnly: true
      })
    }
    return this.bearerToken
  }

  generateRandomString (count = 16) {
    let string = ''
    const legend = "0123456789abcdefjhilmnopqrstuvz"
    for (let index = 0; index < count; index++) {
      const random = Math.floor(Math.random() * (legend.length - 0) + 0)
      string += legend.charAt(random)
    }
    return string
  }
}

const NewAcc = new SpotifyToken()
export default NewAcc
