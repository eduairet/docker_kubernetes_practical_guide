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
  - Now we have a master node that uses a scheduler to manage current and new pods in the worker nodes and our container is running in a pod
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
- We can update our deployment to use the service instead of the deployment
  ```bash
  # Firstly update our image in Docker Hub
  docker push <username>/kub-first-app:2 # Image should be changed to successfully update the deployment
  # Then update the deployment to pull the updated image
  kubectl set image deployment/kub-first-app kub-first-app=<username>/kub-first-app:2
  ```

# Creating a Service

- Create a service to expose the deployment
  ```bash
  kubectl expose deployment kub-first-app --type=LoadBalancer --port=8080
  ```
  - `LoadBalancer` will expose the service to the outside world and also scale it if needed
- To get the services run

  ```bash
  kubectl get services

  NAME            TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
  kub-first-app   LoadBalancer   10.106.155.123   <pending>     8080:31564/TCP   45s
  kubernetes      ClusterIP      10.96.0.1        <none>        443/TCP          8d
  ```

  - When using `minikube` the `EXTERNAL-IP` will be `<pending>`

- To access the service run

  ```bash
  minikube service kub-first-app

  |-----------|---------------|-------------|---------------------------|
  | NAMESPACE |     NAME      | TARGET PORT |            URL            |
  |-----------|---------------|-------------|---------------------------|
  | default   | kub-first-app |        8080 | http://192.168.99.4:31321 |
  |-----------|---------------|-------------|---------------------------|
  🏃  Starting tunnel for service kub-first-app.
  |-----------|---------------|-------------|------------------------|
  | NAMESPACE |     NAME      | TARGET PORT |          URL           |
  |-----------|---------------|-------------|------------------------|
  | default   | kub-first-app |             | http://127.0.0.1:62013 |
  |-----------|---------------|-------------|------------------------|
  🎉  Opening service default/kub-first-app in default browser...
  ❗  Because you are using a Docker driver on darwin, the terminal needs to be open to run it.
  ```

  - You can check the service using the tunneled URL shown in the terminal

## 