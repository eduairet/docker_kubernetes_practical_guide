# Networking Exercise

## APIs

- [Auth API](./auth_api/)
- [Tasks API](./tasks_api/)
- [Users API](./users_api/)
- [Frontend](./frontend/)

## Docker

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

### Frontend

```bash
docker build -t frontend ./frontend
docker run -d -p 80:80 --name frontend --rm frontend
```

### Docker Compose

```bash
docker-compose up -d
docker-compose down
```

### Push to Docker Hub

```bash
docker build -t <username>/auth-api:latest ./auth_api
docker push <username>/auth-api:latest

docker build -t <username>/tasks-api:latest ./tasks_api
docker push <username>/tasks-api:latest

docker build -t <username>/users-api:latest ./users_api
docker push <username>/users-api:latest

docker build -t <username>/tasks-frontend:latest ./frontend
docker push <username>/tasks-frontend:latest
```

- To make it easier you can run the shell script `./build-and-push-to-docker-hub.sh`

  ```bash
  chmod +x build-and-push-to-docker-hub.sh
  ./build-and-push-to-docker-hub.sh
  ```

## Kubernetes

- Start Minikube

  ```bash
  minikube start
  ```

- Create the deployments and services

  ```bash
  kubectl apply -f=./kubernetes/auth-deployment.yaml -f=./kubernetes/auth-service.yaml
  kubectl apply -f=./kubernetes/users-deployment.yaml -f=./kubernetes/users-service.yaml
  kubectl apply -f=./kubernetes/tasks-deployment.yaml -f=./kubernetes/tasks-service.yaml
  kubectl apply -f=./kubernetes/frontend-deployment.yaml -f=./kubernetes/frontend-service.yaml
  ```

- Get the services' IPs

  ```bash
  kubectl get services
  ```

- Access the services

  ```bash
  minikube service auth-service
  minikube service tasks-service
  minikube service users-service
  minikube service frontend-service
  ```

- Terminate the deployments and services by deleting the resources

  ```bash
  kubectl delete -f=./kubernetes/auth-deployment.yaml -f=./kubernetes/auth-service.yaml
  kubectl delete -f=./kubernetes/users-deployment.yaml -f=./kubernetes/users-service.yaml
  kubectl delete -f=./kubernetes/tasks-deployment.yaml -f=./kubernetes/tasks-service.yaml
  kubectl delete -f=./kubernetes/frontend-deployment.yaml -f=./kubernetes/frontend-service.yaml
  ```
