# Backend

## Login Protocol

1. Client request to 'auth/public-key'
2. Server sends public key
3. Client request to 'auth/login', sends { username, password, public key }
4. Server sends { jwt-token, sym-key }

## Request protocol

1. token
2. body
3. encrypt both