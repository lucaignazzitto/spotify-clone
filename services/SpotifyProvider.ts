import { HttpStatusCode } from 'axios'
import AccountProvider from './AccountProvider'
import { NextRequest } from 'next/server'

type SpotifyResponse = {
  message: string
  error: string
  status: HttpStatusCode
  value: string
}

type SpotifyCredentialsResponse = {
  access_token: string,
  token_type: string,
  expires_in: number
}

class SpotifyToken {
  bearerToken: string = ''
  scope: string[] = [
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
  httpLocalUrl: string = process.env.NEXT_LOCAL_DOMAIN
  redirect_uri: string = `${this.httpLocalUrl}api/callback`
  httpBaseUrl: string = `${process.env.NEXT_PUBLIC_API_DOMAIN}`
  response: SpotifyResponse = {
    message: '',
    error: '',
    status: 200,
    value: ''
  }

  retriveInternalToken(request): string {
    // retrive data from localstorage
    // and check with expiration
    const token = request && request.cookies.get('accessToken')
    return token?.value || this.bearerToken
  }

  getToken(request: NextRequest): SpotifyResponse {
    const bearerToken = this.retriveInternalToken(request)
    return { ...this.response, ...{ value: bearerToken, status: bearerToken ? 200 : 401 } }
  }

  async retriveAuthToken(code: string): Promise<SpotifyCredentialsResponse> {
    if (code) {
      const encodedClientId = Buffer.from(`${process.env.NEXT_CLIENT_ID}:${process.env.NEXT_CLIENT_SECRET}`).toString('base64')
      return AccountProvider.post('api/token', {
        grant_type: "authorization_code",
        code,
        client_id: process.env.NEXT_CLIENT_ID,
        redirect_uri: this.redirect_uri
      }, {
        headers: {
          'Authorization': 'Basic ' + (encodedClientId),
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then((res) => {
          if (res.status === 200) {
            return res.data
          } else {
            return {
              access_token: '',
              token_type: '',
              expires_in: 0
            }
          }
        })
        .catch((err) => {
          throw new Error(err)
        })
    } else {
      throw new Error('No code found')
    }
  }

  retriveLoginUrl(): string {
    const type = 'code'
    const scope = this.scope.join(' ')
    const state = this.generateRandomString()
    const client_id = process.env.NEXT_CLIENT_ID
    return `${process.env.NEXT_PUBLIC_ACCOUNT_DOMAIN}authorize?response_type=${type}&client_id=${client_id}&scope=${scope}&redirect_uri=${this.redirect_uri}&state=${state}`
  }

  logout(cookies: any): SpotifyResponse {
    const bearerToken = this.storeToken({ cookies, token: '', expires_in: 0 })
    return { ...this.response, ...{ value: '', status: bearerToken ? 500 : 200 } }
  }

  storeToken({ cookies, token, expires_in }: { cookies: any, token: string, expires_in: number }): string {
    this.bearerToken = token
    if (cookies) {
      cookies.set('accessToken', token,
        {
          maxAge: expires_in,
          path: "/",
        }
      )
    }
    return this.bearerToken
  }

  generateRandomString(count = 16): string {
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
