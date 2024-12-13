# First Kubernetes Deployment

## Creating the Docker Image

- Build the Docker image
  ```bash
  cd rest_api
  docker build -t kub-first-app .
  ```
- Run the Docker image
  ```bash
  docker run -d -p 8080:8080 --name kub-first-app --rm kub-first-app
  ```
- Visit the API at `http://localhost:8080`
- If everything works, stop the container
  ```bash
  docker stop kub-first-app
  ```
- Push the image to Docker Hub
  ```bash
  docker tag kub-first-app <username>/kub-first-app
  docker push <username>/kub-first-app
  ```

## Deploying to Kubernetes

- Start the Kubernetes cluster
  ```bash
  minikube start
  ```
- Create the deployment object using the image from Docker Hub (if not it will fail)
  ```bash
  kubectl create deployment kub-first-app --image=<username>/kub-first-app
  ```
- Check the deployment
  ```bash
  kubectl get deployments # If fails READY is 0/1
  kubectl get pods # If fails STATUS is 0/1
  kubectl delete deployment kub-first-app # If fails
  ```
- If the deployment goes well, it will look like this after running `kubectl get deployments`
  ```bash
  NAME            READY   UP-TO-DATE   AVAILABLE   AGE
  kub-first-app   1/1     1            1           5s
  ```
- And the pods will look like this after running `kubectl get pods`
  ```bash
  NAME                             READY   STATUS    RESTARTS   AGE
  kub-first-app-547df8d976-jchrq   1/1     Running   0          2m7s
  ```
- Check the minikube dashboard for more information
  ```bash
  minikube dashboard
  ```
