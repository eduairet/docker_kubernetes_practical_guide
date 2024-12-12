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