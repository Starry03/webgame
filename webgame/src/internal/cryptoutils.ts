import forge from 'node-forge'

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
    localStorage.removeItem(prefixed('token'))
    localStorage.removeItem(prefixed('session'))
    localStorage.removeItem(prefixed('public_key'))
    localStorage.removeItem(prefixed('private_key'))
    localStorage.removeItem(prefixed('server_public_key'))
  }
}

export class RequestWrapper {
  static async loginFetch(
    url: string,
    options: RequestInit,
    data: { username: string; password: string },
  ): Promise<Response> {
    const public_key_request = await fetch('http://127.0.0.1:8000/auth/public-key')
    if (public_key_request.status !== 200) throw new Error('Failed to fetch public key')
    const { public_key: serverPublicKey } = await public_key_request.json()
    localStorage.setItem(prefixed('server_public_key'), serverPublicKey)
    RSAUtils.generate()
    const encrypted_data = RSAUtils.encrypt(serverPublicKey, JSON.stringify(data))

    return fetch(url, {
      body: JSON.stringify({
        plain_data: { client_public_key: RSAUtils.read().publicKey },
        encrypted_data,
      }),
      ...options,
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
        headers,
      })
    }
    const encrypted_body = body ? AESUtils.encrypt(body) : null
    return fetch(url, {
      ...options,
      headers,
      body: encrypted_body,
    })
  }
}

export class AESUtils {
  static save(session: Session, token: Token): void {
    localStorage.setItem(prefixed('token'), JSON.stringify(token))
    localStorage.setItem(prefixed('session'), JSON.stringify(session))
  }

  static read(): { session: Session; token: Token } {
    const token = localStorage.getItem(prefixed('token'))
    const session = localStorage.getItem(prefixed('session'))
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
    localStorage.setItem(prefixed('public_key'), publicKeyPem)
    localStorage.setItem(prefixed('private_key'), privateKeyPem)
  }

  static read(): { publicKey: string; privateKey: string } {
    const publicKey = localStorage.getItem(prefixed('public_key'))
    const privateKey = localStorage.getItem(prefixed('private_key'))
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
