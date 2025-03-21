import { generateKeyPairSync } from "crypto";
import crypto from 'crypto';

/**
 * Prefix for all keys stored in local storage
 */
export const PREFIX: string = "aitdt";

export function prefixed(key: string): string {
    return `${PREFIX}_${key}`;
}

export type Token = {
    token: string,
    type: string,
}

export type Session = {
    id: string,
    sym_key: string,
    expiration_date: Date,
};

export class RequestWrapper {
    static loginFetch(url: string, options: RequestInit, data: { username: string, password: string }): Promise<Response> {
        const encrypted_data = RSAUtils.encrypt(RSAUtils.read().publicKey, JSON.stringify(data));
        return fetch(url, {
            body: encrypted_data,
            ...options
        });
    }

    static cryptedFetch(url: string, options: RequestInit, token: Token): Promise<Response> {
        const body = options.body as string;
        const session: Session = JSON.parse(localStorage.getItem(prefixed("session"))!);
        const encrypted_body = AESUtils.encrypt(session.sym_key, body);
        return fetch(url, {
            headers: {
                "Authorization": `Bearer ${token.token}`,
                "SessionID": session.id,
                ...options.headers
            },
            body: encrypted_body,
            ...options
        });
    }
}

export class AESUtils {
    static save_session(session: Session, token: Token): void {
        localStorage.setItem(prefixed("token"), JSON.stringify(token));
        localStorage.setItem(prefixed("session"), JSON.stringify(session));
    }

    static read_session(): { session: Session, token: Token } {
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

    static encrypt(key: string, data: string): string {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(data);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return Buffer.concat([iv, encrypted]).toString('base64');
    }
}

export class RSAUtils {
    private static BITS: number = 2048;
    static generate(): void {
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: this.BITS,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });
        localStorage.setItem(prefixed("public_key"), publicKey);
        localStorage.setItem(prefixed("private_KEY"), privateKey);
    }

    static read(): { publicKey: string, privateKey: string } {
        const publicKey = localStorage.getItem(prefixed("public_key"));
        const privateKey = localStorage.getItem(prefixed("private_key"));
        if (!publicKey || !privateKey) {
            throw new Error("RSA keys not found");
        }
        return { publicKey: publicKey, privateKey: privateKey };
    }

    static encrypt(public_key: string, data: string): string {
        const buffer = Buffer.from(JSON.stringify(data), 'utf8');
        const encryptedData = crypto.publicEncrypt({
            key: public_key,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha1"
        }, buffer);
        return encryptedData.toString('base64')
    }
}
