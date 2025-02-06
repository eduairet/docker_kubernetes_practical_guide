#!/bin/bash

# Define the username
USERNAME="eduairet"

# Build and push auth-api
docker build -t $USERNAME/auth-api:latest ./auth_api
docker push $USERNAME/auth-api:latest

# Build and push tasks-api
docker build -t $USERNAME/tasks-api:latest ./tasks_api
docker push $USERNAME/tasks-api:latest

# Build and push users-api
docker build -t $USERNAME/users-api:latest ./users_api
docker push $USERNAME/users-api:latest

# Build and push tasks-frontend
docker build -t $USERNAME/tasks-frontend:latest ./frontend
docker push $USERNAME/tasks-frontend:latest