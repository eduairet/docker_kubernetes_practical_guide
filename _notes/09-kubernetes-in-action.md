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
