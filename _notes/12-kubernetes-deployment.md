# Kubernetes - Deployment (AWS EKS)

- Kubernetes utilizes the (cloud) provider resources to create and manage the infrastructure
- We still need to:
  - Create the cluster and master node instances
  - Setup the API server, kubelet, and other services / software on Nodes
  - Create the cloud provider resources needed
- Deployments on a cloud provider have two different approaches:
  - Install and configure things manually
    - Create and connect machines
    - Install and configure Kubernetes
  - Use a managed service
    - AWS EKS, Google GKE, Azure AKS
    - They manage the master nodes and the control plane
    - We only need to manage the worker nodes

## AWS EKS VS AWS ECS

- **ECS** (Elastic Container Service)
  - Managed container service
  - AWS-specific syntax and philosophy
  - Uses ECS-specific tools and resources
- **EKS** (Elastic Kubernetes Service)
  - Managed Kubernetes service
  - No AWS-specific syntax or philosophy
  - Uses standard Kubernetes tools and resources

## Diving into AWS EKS

- First, we need to create the cluster
  - Add a new cluster with a name
  - Select the Kubernetes version
  - Select the role that will manage the cluster
    - Use the IAM service to create a new role that gives EKS the permissions it needs
    - Click on "Create Role" and select "EKS" as the service
    - Then select "EKS Cluster" as the use case
    - Add a name and attach the "AmazonEKSClusterPolicy" policy
    - Click on "Create" to create the cluster
- Specify the networking configuration
  - Use the default VPC and subnets or create a new one if needed
  - Leave the rest of the settings as default
  - Select the endpoint access
    - Public access: The API server is accessible from the internet
    - Private access: The API server is only accessible from the VPC
    - Public and private access: The API server is accessible from the internet and the VPC
  - Click on "Create" to create the cluster
- When the cluster is created, we need to configure `kubectl` to connect to it
  - Locally, we need to edit the `~/.kube/config` file to allow `kubectl` to connect to the cluster
  - Install the AWS CLI
  - Authenticate with AWS
    - Run `aws configure` and add the access key and secret key, and the default region
  - Run `aws eks --region <region> update-kubeconfig --name <cluster-name>` to update the `~/.kube/config` file
  - Run `kubectl get nodes` to check if the connection is working

## Adding Worker Nodes

- We need to add worker nodes to the cluster
  - Go to the EKS service and select the cluster
  - Click on "Add Node Group"
  - Add a name and select the IAM role that will manage the nodes
    - Use the IAM service to create a new EC2 role with the "AmazonEKSWorkerNodePolicy", "AmazonEKS_CNI_Policy", and "AmazonEC2ContainerRegistryReadOnly" policies
  - The other options can be left as default
  - Click on "Create" to create the node group
  - Then we'll configure the compute and scaling settings
    - Select the AMI type, instance type, and disk size
      - For example, use the Amazon Linux 2 AMI, t2.micro instance type, and 20GB disk size
    - Select the node group scaling configuration
      - Minimum, maximum, and desired number of nodes
        - For example, 2, 2, and 2
      - Click on next leave the networking settings as default and click on "Create"

## Applying our Kubernetes Configuration

- From the working directory were we have our Kubernetes configuration files, we can run `kubectl apply -f=<file-name>` to apply the configuration
- This will create the resources defined in the configuration file on the cluster
- Get the IP address of your service by running `kubectl get services`
- Access the service by going to the IP address in your browser or in postman
  - Notice that your service is accessible from the internet and that a Load Balancer was created automatically by AWS
- To update the service, we can update our container image and run `kubectl apply -f=<file-name>` again
- To delete the service, we can run `kubectl delete -f=<file-name>` to delete the resources

## Volumes

- When using EKS we can use the [Amazon EFS CSI](https://github.com/kubernetes-sigs/aws-efs-csi-driver) driver to create a volume (we need this since AWS EFS is not natively supported by Kubernetes)
  ```bash
  kubectl apply -k "github.com/kubernetes-sigs/aws-efs-csi-driver/deploy/kubernetes/overlays/stable/?ref=release-2.0"
  ```
- Then we'll need to create a Elastic File System (EFS) on AWS

  - Go to the EFS service and click on "Create file system"
  - First create a security group
    - Add a name and description
    - Select the VPC (usually is a good idea to use the same we're using with our EKS)
    - The inbounds rules might need to have an NFS rule with our VPC IPv4 CIDR as custom destination to allow the EKS to connect to the EFS
    - The outbounds rules can stay as default
    - Then click on "Create"
  - Then create the EFS
    - Add a name and select the VPC we're using with our EKS
    - Click on "Customize" and select the security group we created before on every availability zone
    - Click on "Next"
    - Leave the rest of the settings as default and click on "Next"
    - Click on "Create"
  - If everything went well, we should have an EFS created with an ID, this ID is the one we'll use on our Kubernetes configuration

    ```yaml
    kind: StorageClass
    apiVersion: storage.k8s.io/v1
    metadata:
      name: efs-sc
    provisioner: efs.csi.aws.com
    ---
    apiVersion: v1
    kind: PersistentVolume
    metadata:
      name: efs-pv
    spec:
      capacity:
        storage: 5Gi
      volumeMode: Filesystem
      accessModes:
        - ReadWriteMany
      storageClassName: efs-sc
      csi:
        driver: efs.csi.aws.com
        volumeHandle: fs-<efs-id>
    ---
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: efs-pvc
    spec:
      accessModes:
        - ReadWriteMany
      storageClassName: efs-sc
      resources:
        requests:
          storage: 5Gi
    ---
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
          port: 80
          targetPort: 3000
    ---
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: users-deployment
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: users
      template:
        metadata:
          labels:
            app: users
        spec:
          containers:
            - name: users-api
              image: <user-id>/kub-dep-users:latest
              env:
                - name: MONGODB_CONNECTION_URI
                  value: 'mongodb+srv://<user>:<id>@cluster0.ntrwp.mongodb.net/users?retryWrites=true&w=majority'
                - name: AUTH_API_ADDRESSS
                  value: 'auth-service.default:3000'
              volumeMounts:
                - name: efs-vol
                  mountPath: /app/users
          volumes:
            - name: efs-vol
              persistentVolumeClaim:
                claimName: efs-pvc
    ```

    - Notice that we need both the storage class and the persistent volume definitions

- Then we can apply the configuration with `kubectl apply -f=<file-name>`
- We can check the status of the volume by running `kubectl get pv` and `kubectl get pvc` and we can confirm that the volume is being used in the EKS dashboard
