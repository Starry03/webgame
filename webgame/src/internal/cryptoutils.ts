/**
 * Prefix for all keys stored in local storage
 */
export const PREFIX: string = "aitdt";

export function prefixed(key: string): string {
    return `${PREFIX}_${key}`;
}

export type Token = {
    access_token: string,
    type: string,
}

export type Session = {
    id: string,
    sym_key: string,
    expiration_date: Date,
};

export class RequestWrapper {
    static async loginFetch(url: string, options: RequestInit, data: { username: string, password: string }): Promise<Response> {
        const public_key_request = await fetch('http://127.0.0.1:8000/auth/public-key');
        if (public_key_request.status !== 200)
            throw new Error("Failed to fetch public key");
        const public_key_data = await public_key_request.json();
        const server_public_key: string = public_key_data.public_key;
        localStorage.setItem(prefixed("server_public_key"), server_public_key);
        await RSAUtils.generate();
        const encrypted_data = await RSAUtils.encrypt(server_public_key, JSON.stringify(data));
        return fetch(url, {
            body: JSON.stringify({
                plain_data: { client_public_key: RSAUtils.read().publicKey },
                encrypted_data: encrypted_data,
            }),
            ...options
        });
    }

    /**
     * fetch wrapper for encryption
     * @param url 
     * @param options plain data, function will encrypt it
     * @param token
     * @returns promise
     */
    static async cryptedFetch(url: string, options: RequestInit): Promise<Response> {
        const body = options.body as string;
        const sessionData: string | null = localStorage.getItem(prefixed("session"));
        if (!sessionData)
            throw new Error("Session not found");
        const session: Session = JSON.parse(sessionData);
        const tokenData: string | null = localStorage.getItem(prefixed("token"));
        if (!tokenData)
            throw new Error("Token not found");
        const token: Token = JSON.parse(tokenData);
        if (options.method !== "POST")
            return fetch(url, {
                headers: {
                    "Authorization": `Bearer ${AESUtils.encrypt(token.token)}`,
                    "SessionID": session.id,
                    ...options.headers
                },
                ...options
            });
        const encrypted_body = await AESUtils.encrypt(body);
        return fetch(url, {
            headers: {
                "Authorization": `Bearer ${AESUtils.encrypt(token.token)}`,
                "SessionID": session.id,
                ...options.headers
            },
            body: encrypted_body,
            ...options
        });
    }
}

export class AESUtils {
    static save(session: Session, token: Token): void {
        localStorage.setItem(prefixed("token"), JSON.stringify(token));
        localStorage.setItem(prefixed("session"), JSON.stringify(session));
    }

    static read(): { session: Session, token: Token } {
        const token = localStorage.getItem(prefixed("token"));
        const session = localStorage.getItem(prefixed("session"));
        if (!token || !session) {
            throw new Error("Session not found");
        }
        return {
            token: JSON.parse(token),
            session: JSON.parse(session)
        };
    }

    static async encrypt(data: string): Promise<string> {
        const iv = window.crypto.getRandomValues(new Uint8Array(16));
        const cryptoKey = await window.crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(AESUtils.read().session.sym_key),
            "AES-CBC",
            false,
            ["encrypt"]
        );
        const encryptedData = await window.crypto.subtle.encrypt(
            { name: "AES-CBC", iv },
            cryptoKey,
            new TextEncoder().encode(data)
        );
        const result = new Uint8Array(iv.length + encryptedData.byteLength);
        result.set(iv, 0);
        result.set(new Uint8Array(encryptedData), iv.length);
        return RSAUtils._arrayBufferToBase64(result.buffer);
    }
}

export class RSAUtils {
    private static BITS: number = 4096;

    static read(): { publicKey: string, privateKey: string } {
        const publicKey = localStorage.getItem(prefixed("public_key"));
        const privateKey = localStorage.getItem(prefixed("private_key"));
        if (!publicKey || !privateKey) {
            throw new Error("RSA keys not found");
        }
        return {
            publicKey: publicKey,
            privateKey: privateKey
        };
    };

    static async generate(): Promise<{ publicKey: ArrayBuffer, privateKey: ArrayBuffer }> {
        try {
            const keyPair = await window.crypto.subtle.generateKey(
                {
                    name: "RSA-OAEP",
                    modulusLength: RSAUtils.BITS,
                    publicExponent: new Uint8Array([1, 0, 1]),
                    hash: "SHA-1",
                },
                true,
                ["encrypt", "decrypt"]
            );
            const publicKeyBuffer = await window.crypto.subtle.exportKey(
                "spki",
                keyPair.publicKey
            );
            const privateKeyBuffer = await window.crypto.subtle.exportKey(
                "pkcs8",
                keyPair.privateKey
            );
            const publicKeyBase64 = RSAUtils._arrayBufferToPEM(publicKeyBuffer, false);
            const privateKeyBase64 = RSAUtils._arrayBufferToPEM(privateKeyBuffer, true);
            localStorage.setItem(prefixed("public_key"), publicKeyBase64);
            localStorage.setItem(prefixed("private_key"), privateKeyBase64);
            return { publicKey: publicKeyBuffer, privateKey: privateKeyBuffer };
        } catch (error) {
            console.error("Failed to generate RSA key pair:", error);
            throw new Error("Failed to generate RSA key pair");
        }
    }

    static async decrypt(data: string): Promise<string> {
        let cleanedKey = RSAUtils.read().privateKey
            .replace('-----BEGIN PRIVATE KEY-----', '')
            .replace('-----END PRIVATE KEY-----', '')
            .replace(/\s/g, '');
        
        const privateKeyBuffer = RSAUtils._base64ToArrayBuffer(cleanedKey);
        
        const cryptoKey = await window.crypto.subtle.importKey(
            "pkcs8",
            privateKeyBuffer,
            {
                name: "RSA-OAEP",
                hash: "SHA-1",
            },
            false,
            ["decrypt"]
        );
        try {

            const decryptedData = await window.crypto.subtle.decrypt(
                {
                    name: "RSA-OAEP",
                },
                cryptoKey,
                RSAUtils._base64ToArrayBuffer(data)
            );
            return new TextDecoder().decode(decryptedData);
        } catch (error) {
            console.error(error);
            throw new Error("Failed to decrypt data");
        }
    }

    static async encrypt(publicKey: string, data: string): Promise<string> {
        let cleanedKey = publicKey
            .replace('-----BEGIN PUBLIC KEY-----', '')
            .replace('-----END PUBLIC KEY-----', '')
            .replace(/\s/g, '');

        const publicKeyBuffer = RSAUtils._base64ToArrayBuffer(cleanedKey);
        const cryptoKey = await window.crypto.subtle.importKey(
            "spki",
            publicKeyBuffer,
            {
                name: "RSA-OAEP",
                hash: "SHA-1",
            },
            false,
            ["encrypt"]
        );
        const encryptedData = await window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP",
            },
            cryptoKey,
            new TextEncoder().encode(data)
        );
        return RSAUtils._arrayBufferToBase64(encryptedData);
    }

    static _base64ToArrayBuffer(base64: string) {
        const binary = window.atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++)
            bytes[i] = binary.charCodeAt(i);
        return bytes.buffer;
    }

    static _arrayBufferToBase64(publicKeyBuffer: ArrayBuffer) {
        const bytes = new Uint8Array(publicKeyBuffer);
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    static _arrayBufferToPEM(buffer: ArrayBuffer, isPrivate: boolean = false): string {
        const base64 = RSAUtils._arrayBufferToBase64(buffer);
        const type = isPrivate ? "PRIVATE KEY" : "PUBLIC KEY";
        let formatted = '';
        for (let i = 0; i < base64.length; i += 64) {
            formatted += base64.substring(i, i + 64) + '\n';
        }
        return `-----BEGIN ${type}-----\n${formatted}-----END ${type}-----`;
    }
}
