# Networking Exercise

## APIs

- [Auth API](./auth_api/)
- [Tasks API](./tasks_api/)
- [Users API](./users_api/)

## Building the containers

### Auth API

```bash
docker build -t auth-api ./auth_api
docker run -d -p 80:80 --name auth-api --rm auth-api
```

- `http://localhost:80/verify-token/abc` -> `{"message":"Valid token.","uid":"u1"}`
- `http://localhost:80/token/123_hash/123` -> `{"message":"Token created.","token":"abc"}`
- `http://localhost:80/hashed-password/123` -> `{"hashed_password":"123_hash"}`

### Tasks API

```bash
docker build -t tasks-api ./tasks_api
docker run -d -p 8000:8000 --name tasks-api --rm tasks-api
```

- `http://localhost:8000/tasks/` -> `{"message":"Tasks loaded.","tasks":[{"title":"Task 1","text":"Description"}],"created_task":null}`
- `http://localhost:8000/tasks/ POST {"title":"Task 1","text":"Description"}` -> `{"message":"Task stored.","tasks":null,"created_task":{"title":"Task 1","text":"Description"}}`

### Users API

```bash
docker build -t users-api ./users_api
docker run -d -p 8080:8080 --name users-api --rm users-api
```

- `http://localhost:8080/signup` -> `{"message":"User created!"}`
- `http://localhost:8080/login` -> `{"message":"abc"}`

### Docker Compose

```bash
docker-compose up -d
docker-compose down
```
