# webgame

## Dependencies

### Client

```sh
cd ./webgame
npm i
npm run format
```

### Server

- pip install fastapi jwt cryptography

```sh
cd backend
python -m venv .venv
pip install -r /path/to/requirements.txt
```

## Run (devel)

### Client

env variables in `webgame/.env` file

```sh
VITE_SERVER_URL=
VITE_PUBLIC_KEY_PATH=/auth/public-key
VITE_LOGIN_PATH=/auth/login
VITE_DELETE_PATH=/auth/delete
VITE_REGISTER_PATH=/auth/register
VITE_CLASSES_PATH=/game/data/classes
```

run

```sh
cd ./webgame
npm i
npm run dev
```

### Server

private key in `backend/auth/private_key.pem` file

public key in `backend/auth/public_key.pem` file

env variables in `backend/.env` file

```sh
DB_NAME=
DB_USER=
DB_PORT=
DB_PASSWORD=
DB_HOST=
JWT_SECRET=
JWT_EXPIRES_IN_DAYS=1
JWT_ALGORITHM=HS256
HASH_SALT=
```

run

```sh
cd ./backend
uvicorn app.main:app --reload --host=0.0.0.0
# or .venv/bin/uvicorn
```
