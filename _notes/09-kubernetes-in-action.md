# Kubernetes in Action - Diving into the Core Concepts

- To work with Kubernetes you need to:
  - Create a cluster and the Node instances
  - Set up the Kubernetes API server, kubelet, and other Kubernetes services/software on Nodes
  - Create other (cloud) providers resources like Load Balancers, Volumes, etc.
- Kubernetes will help you to
  - Create your objects and manage them
  - Monitor pods and re-create them, scale them, etc.
  - It will utilize the resources to apply your configuration/goals

## Setting up Kubernetes Locally

- Requirements:
  - A cluster with at least one Node
    - On the cloud for example it will be an instance with the Kubernetes software installed
    - Locally we can use Minikube to create a single-node cluster
  - A kubectl (Kube control tool) to interact with the cluster
- Installing kubectl
  - The easiest way to install kubectl is to use a package manager like Homebrew
    ```bash
    brew install kubectl
    ```
  - Check if kubectl is installed
    ```bash
    kubectl version --client
    ```
- Installing Minikube (we're going to use it to create a local cluster)
  - Install a Hypervisor like [VirtualBox](https://www.virtualbox.org/wiki/Downloads) or [Docker](https://docs.docker.com/get-docker/)
  - The easiest way to install Minikube is to use a package manager like Homebrew
    ```bash
    brew install minikube
    ```
  - Check if Minikube is installed
    ```bash
    minikube version
    ```
  - Starting Minikube
    - Start Minikube with the default driver (VirtualBox)
      ```bash
      minikube start --driver=docker # you can also use virtualbox but this fails on some Macs
      ```
    - Check the status of the cluster
      ```bash
      minikube status
      ```
    - Open the Kubernetes dashboard (it will open a browser window)
      ```bash
      minikube dashboard
      ```

## Kubernetes Objects

- Kubernetes works with objects, which are entities that represent the state of your cluster
- Some of the most important objects are:
  - Pods (the smallest unit in Kubernetes)
    - A Pod is a group of one or more containers, with shared storage/network, and a specification for how to run the containers
    - It's ephemeral, meaning that it can be created, destroyed, and replaced at any time
    - It has a unique IP address within the cluster
    - We let Kubernetes manage the Pods, we don't interact with them directly
  - Services (to expose your application to the outside world)
  - Deployments (to manage the lifecycle of your Pods)
  - Namespaces (to organize your objects)
  - ConfigMaps (to store configuration data)
  - Secrets (to store sensitive data)
  - PersistentVolumeClaims (to request storage)
  - PersistentVolumes (to provide storage)
  - StatefulSets (to manage stateful applications)
  - DaemonSets (to run a Pod on all Nodes)
  - Jobs (to run a Pod until it succeeds)
  - CronJobs (to run a Pod on a schedule)
- The deployment object is the most common way to create Pods
  - It's a higher-level object that manages Pods
  - It allows you to define the desired state of your application
  - It will create and manage the Pods for you
  - It will monitor the Pods and re-create them if they fail
  - It will scale the Pods up or down based on the load
- The service object is used to expose pods to other pods or for the outside world
  - Pods have a unique IP address within the cluster and it changes when they are re-created
    - For example, if you have a node.js app and it crashes the Pod will be re-created with a new IP address, so you'll see the pod down until it's re-created, this will show a restart increase.
      - Every restart can be checked at the dashboard events log
  - Services group Pods together and give them a stable IP address
- Scaling your application
  - Kubernetes has a command to scale your application
    ```bash
    kubectl scale deployment/<deployment-name> --replicas=3
    ```
    - A replica is a copy of a Pod, adding more pods will increase the load capacity, for example, if a pod is down the service will redirect the request to another pod
- Updating your application
  - To update your application you can change the image of the deployment
    ```bash
    kubectl set image deployment/<deployment-name> <container-name>=<new-image>
    ```
    - The deployment will create a new Pod with the new image and then delete the old Pod
    - The service will redirect the requests to the new Pod
- There will be occasions where there's a problem when trying to update the deployment, usually when we have several replicas and some of them have the `ImagePullBackOff` status
  - This means that the Pod can't pull the image from the registry
  - To fix this you can roll back the deployment
    ```bash
    kubectl rollout undo deployment/<deployment-name>
    ```
  - We can even use the history command to see the changes made to the deployment
    ```bash
    kubectl rollout history deployment/<deployment-name>
    ```
    - This will show the revision number, the date, and the status of the deployment
    - For more information about a specific revision
      ```bash
      kubectl rollout history deployment/<deployment-name> --revision=1
      ```
    - And we can even roll back to a specific revision
      ```bash
      kubectl rollout undo deployment/<deployment-name> --to-revision=1
      ```

## Creating a Deployment Configuration File

- The name is up to you, but it's a good practice to name it `deployment.yaml`
- The file will have the following structure
  ```yaml
  apiVersion: apps/v1 # Check the Kubernetes documentation for the latest version
  kind: Deployment # The kind of object we're creating
  metadata:
    name: <deployment-name> # The name of the deployment
    labels:
      app: <app-name> # The label of the deployment for further reference
      # You can use the group label to group deployments and manage them together
      # group: <group-name>
      # With this group label, you can for example delete all deployments with the same group label at once
      # kubectl delete deployments,services -l group=<group-name>
  spec:
    replicas: 3
    selector:
      matchLabels:
        app: <app-name>
      # Alternatively you can use matchExpressions if we need to match multiple labels
      # matchExpressions:
      #   - key: app # The key of the label
      #     operator: In # Can be NotIn, Exists, DoesNotExist
      #     values: [<app-name>, <app-name2>] # Can be a list of values
    template:
      metadata:
        labels:
          app: <app-name>
      spec:
        containers:
          - name: <container-name>
            image: <image-name>
            imagePullPolicy: Always # This will always pull the image from the registry
            ports:
              - containerPort: 8080
            # livenessProbe: # This is a health check that will be used to know if the pod is healthy
            #   httpGet:
            #     path: /
            #     port: 8080
            #   periodSeconds: 10
            #   initialDelaySeconds: 5
  ```
- To run the configuration file
  ```bash
  kubectl apply -f deployment.yaml
  ```
  - For multiple files
    ```bash
    kubectl apply -f deployment1.yaml -f service.yaml
    ```
- If you need to update the deployment you can edit the file and run the `kubectl apply` command again
- To delete the deployment you can run the name of the deployment or the file
  ```bash
  kubectl delete deployment <deployment-name>
  kubectl delete -f deployment.yaml
  ```
- If you need to add different configurations you can create extra files like `service.yaml` or add them to the same file separated by `---`

  ```yaml
  apiVersion: v1
  kind: Service
  # ...
  ---
  apiVersion: apps/v1
  kind: Deployment
  # ...
  ```

  - It's a good practice to declare the service first if you add it to the same file
