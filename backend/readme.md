# Backend

## Login Protocol

1. Client request to 'auth/public-key'
2. Server sends public key
3. Client request to 'auth/login', sends { username, password, public key }
4. Server sends { jwt-token, sym-key }

## Request protocol

1. Encrypt with symmetric key
2. Send jwt-token