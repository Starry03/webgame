import { RequestWrapper } from './cryptoutils'

const ENVS: ImportMetaEnv = import.meta.env
export const SERVER_URL: String | null = ENVS.VITE_SERVER_URL || null
if (!SERVER_URL) {
  throw new Error('VITE_SERVER_URL is not defined')
}

export function buildEndpoint(path: String) {
  return `${SERVER_URL}${path}`
}

export const AuthService = {
  login: (endpoint: String, username: String, password: String) =>
    RequestWrapper.loginFetch(
      buildEndpoint(endpoint),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      {
        username: username,
        password: password,
      },
    ),
}

export const GameService = {
  classes: () =>
    RequestWrapper.cryptedFetch(buildEndpoint(ENVS.VITE_CLASSES_PATH), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
}
