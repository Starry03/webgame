# Backend

## Login Protocol

1. http://localhost:8000/auth/public-key
2. http://localhost:8000/auth/login

```sh
Session:  {
  id: 92,
  sym_key: '901a7121346910d2eb6c56adcfb7f4dae815c9467e05bc40b2b5c478b99b5880',
  expiration_date: '2025-03-19T18:09:04.352026'
}
Token:  {
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0YXJyeSIsInBhc3N3b3JkIjoiNzA3MCIsImV4cCI6MTc0MjMyMTM0NH0.jmjYUA_JgBsbCsM3V9EmgqwcOld5fcWILP_g_YpfLuA',
  token_type: 'bearer'
}
```


## Request protocol

1. token
2. body
3. encrypt both