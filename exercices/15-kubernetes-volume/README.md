# Story API

## API Container

- Build locally and check if it works at `http://localhost:8080`

  ```bash
  docker build -t kubernetes-volume .
  docker run -d -p 8080:8080 --name kubernetes-volume -v stories:/app/story --rm kubernetes-volume
  docker stop kubernetes-volume
  ```

  - You can either use the docker compose file
    ```bash
    docker-compose up -d
    docker-compose down
    ```

- Push the image to Docker Hub
  ```bash
  docker tag kubernetes-volume <username>/kubernetes-volume
  docker push <username>/kubernetes-volume
  ```

## Kubernetes Deployment

- Start the Kubernetes cluster
  ```bash
  minikube start --driver=docker
  ```
- Create the persistent volume
  ```bash
  kubectl apply -f=host-pv.yaml
  ```
- Create the persistent volume claim
  ```bash
  kubectl apply -f=host-pvc.yaml
  ```
- Run the deployment files
  ```bash
  kubectl apply -f=deployment.yaml -f=service.yaml
  ```
- Check the deployment
  ```bash
  kubectl get deployments # If succeeded is 1/1 READY
  ```
- Now open the service and visit the API URL provided
  ```bash
  minikube service story-service
  ```
