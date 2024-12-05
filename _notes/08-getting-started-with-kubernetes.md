# Getting Started with Kubernetes

- Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.
- Even though ECS checks our containers health and automatically restarts them, auto scale them on traffic spikes, and distribute their traffic with a Load Balancer, it doesn't provide the same level of control and flexibility that Kubernetes does.
- With Kubernetes we won't be tied to AWS, we can run our Kubernetes cluster on any cloud provider or on-premises.
- Kubernetes uses an easy-to-use syntax to define how our application should be deployed and managed.

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: auth-service
    annotations:
      service.beta.kubernetes.io/aws-load-balancer-type: nlb # Specific provider annotations
  spec:
    selector:
      app: auth-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: LoadBalancer
  ```

- We could say that Kubernetes is a docker-compose for multiple machines.

## Kubernetes Architecture

- **Worker Node:** A machine that runs our containers (Nodes are your machines/virtual instances).
  - They wrap up the containers and run them in a Pod.
    - **Pod:** A group of one or more containers that are deployed together on the same host.
  - The incoming and outcoming traffic is managed by a Proxy/Config called `Kube Proxy`.
  - It uses a `Kubelet` to manage the containers and report back to the Master Node.
- We can create multiple Worker Nodes to run our containers.
- All the Worker Nodes are managed by a **Master Node**.
  - The master node has a control plane that manages the worker nodes.
  - It uses several components to manage the worker nodes.
  - It communicates with the cloud provider API to manage the worker nodes.
  - It uses an API server for the `Kubelets` to communicate with it.
  - The `Scheduler` is responsible for watching new Pods and assigning them to a Worker Node.
  - The `Controller Manager` watches the state of the cluster and makes changes to the desired state.
  - The `Cloud Controller Manager` is responsible for managing the cloud provider resources.
- Take in count that you'll need to create the cluster and Node instances (Worker + Master Nodes) on your cloud provider.
- Kubernetes will:
  - Create your objects and manage them.
  - Monitor Pods and restart them if they fail.
  - Scale Pods up or down based on the traffic.
  - Utilize your provider resources to apply your configuration / goals.

## Kubernetes Core Concepts

- **Cluster:** A set of Nodes that run containerized applications (`Worker Nodes`) or control the other Nodes (`Master Node`).
- **Node:** A machine (physical or virtual) with certain hardware capacity that makes them capable of hosting Pods and communicating with the cluster.
- **Pod:** A group of one or more containers that are deployed together on the same host.
- **Container:** A standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.
- **Service:** An abstraction that defines a logical set of Pods and a policy by which to access them.
