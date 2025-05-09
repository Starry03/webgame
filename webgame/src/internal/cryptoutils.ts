import forge from 'node-forge'
import { Storage_e } from './types'
import { buildEndpoint } from './apiService'

export const PREFIX = 'aitdt'

export function prefixed(key: string): string {
  return `${PREFIX}_${key}`
}

export type Token = {
  access_token: string
  token_type: string
}

export type Session = {
  id: string
  sym_key: string
  expiration_date: Date
}

export class SessionUtils {
  static isLogged(): boolean {
    try {
      AESUtils.read()
      return true
    } catch (_) {
      return false
    }
  }

  static logout(): void {
    localStorage.removeItem(prefixed(Storage_e.TOKEN))
    localStorage.removeItem(prefixed(Storage_e.SESSION))
    localStorage.removeItem(prefixed(Storage_e.PUBLIC_KEY))
    localStorage.removeItem(prefixed(Storage_e.PRIVATE_KEY))
    localStorage.removeItem(prefixed(Storage_e.SERVER_PUBLIC_KEY))
    localStorage.removeItem(prefixed(Storage_e.SELECTED_CHARACTER))
  }
}

export class RequestWrapper {
  static TIMEOUT: number = 5000
  static async loginFetch(
    url: string,
    options: RequestInit,
    data: { username: string; password: string },
  ): Promise<Response> {
    const _url: string | undefined = import.meta.env.VITE_PUBLIC_KEY_PATH
    if (!_url) throw new Error('Public key path not defined')
    const public_key_request = await fetch(buildEndpoint(_url))
    if (public_key_request.status !== 200) throw new Error('Failed to fetch public key')
    const { public_key: serverPublicKey } = await public_key_request.json()
    localStorage.setItem(prefixed(Storage_e.SERVER_PUBLIC_KEY), serverPublicKey)
    RSAUtils.generate()
    const encrypted_data = RSAUtils.encrypt(serverPublicKey, JSON.stringify(data))

    return fetch(url, {
      body: JSON.stringify({
        plain_data: { client_public_key: RSAUtils.read().publicKey },
        encrypted_data,
      }),
      ...options,
      signal: AbortSignal.timeout(RequestWrapper.TIMEOUT),
    })
  }

  static async cryptedFetch(url: string, options: RequestInit): Promise<Response> {
    const body = options.body as string
    const { session, token } = AESUtils.read()
    const encrypted_token = AESUtils.encrypt(token.access_token)
    const headers = new Headers(options.headers)
    headers.set('authorization', `Bearer ${encrypted_token}`)
    headers.set('sessionid', session.id)

    if (options.method !== 'POST') {
      return fetch(url, {
        ...options,
        headers: headers,
        signal: AbortSignal.timeout(RequestWrapper.TIMEOUT),
      })
    }
    const encrypted_body = body ? AESUtils.encrypt(body) : null
    return fetch(url, {
      ...options,
      headers,
      body: encrypted_body,
      signal: AbortSignal.timeout(RequestWrapper.TIMEOUT),
    })
  }
}

export class AESUtils {
  static save(session: Session, token: Token): void {
    localStorage.setItem(prefixed(Storage_e.TOKEN), JSON.stringify(token))
    localStorage.setItem(prefixed(Storage_e.SESSION), JSON.stringify(session))
  }

  static read(): { session: Session; token: Token } {
    const token = localStorage.getItem(prefixed(Storage_e.TOKEN))
    const session = localStorage.getItem(prefixed(Storage_e.SESSION))
    if (!token || !session) {
      throw new Error('Session not found')
    }
    return {
      token: JSON.parse(token),
      session: JSON.parse(session),
    }
  }

  static encrypt(data: string): string {
    const { session } = AESUtils.read()
    const key = forge.util.createBuffer(forge.util.decode64(session.sym_key)).getBytes()
    const iv = forge.random.getBytesSync(16)

    const cipher = forge.cipher.createCipher('AES-CTR', key)
    cipher.start({ iv })
    cipher.update(forge.util.createBuffer(data))
    cipher.finish()

    const encrypted = forge.util.encode64(iv + cipher.output.getBytes())
    return encrypted
  }

  static decrypt(encryptedData: string): string {
    const { session } = AESUtils.read()
    const key = forge.util.createBuffer(forge.util.decode64(session.sym_key))
    const input = forge.util.decode64(encryptedData)

    const iv = input.substring(0, 16)
    const encrypted = input.substring(16)

    const decipher = forge.cipher.createDecipher('AES-CTR', key)
    decipher.start({ iv })
    decipher.update(forge.util.createBuffer(encrypted))
    decipher.finish()

    return decipher.output.toString()
  }
}

export class RSAUtils {
  static generate(): void {
    const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 })
    const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey)
    const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey)
    localStorage.setItem(prefixed(Storage_e.PUBLIC_KEY), publicKeyPem)
    localStorage.setItem(prefixed(Storage_e.PRIVATE_KEY), privateKeyPem)
  }

  static read(): { publicKey: string; privateKey: string } {
    const publicKey = localStorage.getItem(prefixed(Storage_e.PUBLIC_KEY))
    const privateKey = localStorage.getItem(prefixed(Storage_e.PRIVATE_KEY))
    if (!publicKey || !privateKey) {
      throw new Error('RSA keys not found')
    }
    return { publicKey, privateKey }
  }

  static encrypt(publicKeyPem: string, data: string): string {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem)
    const encrypted = publicKey.encrypt(data, 'RSA-OAEP')
    return forge.util.encode64(encrypted)
  }

  static decrypt(encryptedData: string): string {
    const privateKey = forge.pki.privateKeyFromPem(RSAUtils.read().privateKey)
    const decoded = forge.util.decode64(encryptedData)
    return privateKey.decrypt(decoded, 'RSA-OAEP')
  }
}
