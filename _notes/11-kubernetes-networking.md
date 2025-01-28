# Kubernetes Networking

- When we need to make a deployment available to the world in Kubernetes, we usually use a `Service` resource to create an stable endpoint for the service.
- The most reliable way to expose a service to the world is to use a `LoadBalancer` service type, which will create a `LoadBalancer` in the cloud provider and assign a public IP to it.

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
  name: users-service
  spec:
  selector:
      app: users
  type: LoadBalancer
  ports:
      - protocol: TCP
      port: 8080
      targetPort: 8080
  ```

- This will create a `LoadBalancer` in the cloud provider and assign a public IP to it that we can use to access the service.
- If we need another container for internal access we can add the image to the same deployment and use `localhost` to access it.

  ```yaml
  apiVersions: apps/v1
  kind: Deployment
  metadata:
  name: users-deployment
  spec:
  replicas: 1
  selector:
      matchLabels:
      app: users
  template:
      metadata:
      labels:
          app: users
      spec:
      containers:
          - name: users
          image: eduairet/users-api:latest # This will have a load balancer that will be reachable from the internet
          env:
              - name: AUTH_ADDRESS
              value: localhost # This will only be reachable inside the container
          - name: auth
          image: eduairet/auth-api:latest
  ```

- Another way to expose a container internally is to use a `ClusterIP` service type, which will create a virtual IP that can be used to access the service from inside the cluster.

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
  name: auth-service
  spec:
      selector:
          app: auth
      type: ClusterIP
      ports:
          - protocol: TCP
          port: 80
          targetPort: 80
  ```

- This will create a virtual IP that can be used to access the service from inside the cluster.
  - This is a better approach since we will handle the service security and access control in the service itself.
- No we can access the service from inside the cluster:
  - We can start the service and use the virtual IP to access it.
  - We can use the auto-generated environment variables that Kubernetes creates for each service like `AUTH_SERVICE_SERVICE_HOST` and `AUTH_SERVICE_SERVICE_PORT` for `auth-service`.
  - Or we can use the `CoreDNS` service that Kubernetes creates to access the service by its name and namespace, like `auth-service.default`.
