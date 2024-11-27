# Deploying Docker Containers

- Production trade-offs
  - In production we don't use bind mounts because we don't need to encapsulate the environment.
  - The container should work standalone and not depend on the host machine.
    - For this we'll use copy to get the code snapshot from the build instead of bind mounts.
- Deploying to AWS
  - EC2 is the most common way to deploy Docker containers since it's a service that provides virtual servers in the cloud.
  - To deploy a Docker container to an EC2 instance, you'll need:
    - Create and launch an EC2 instance, VPC, and security group.
    - Configure the security group to expose all the required ports to WWWW
    - Connect to the EC2 instance using SSH, install Docker, and run the container.
  - To configure this service, you can use the AWS Management Console and look for the EC2 service.
  - Then you need to create a new instance.
    - Select the Amazon Linux 2 AMI.
    - Choose the instance type (t2.micro is free tier).
    - Create a new key pair and download it (never share or lose this key pair or you'll need to create a new one and shut down the old instance).
    - Configure the instance details by selecting the VPC (for this it could be the default one) and leave the rest as default unless you have specific requirements.
    - Launch the instance.
  - To connect to the instance, you can use the SSH command with the key pair you downloaded.
    ```bash
    chmod 400 "my-key-pair.ppk"
    ssh -i "my-key-pair.ppk" ec2-user@ecX-XX-XXX-XXX-XX.compute-1.amazonaws.com
    ```
  - Now you can install Docker on the instance.
    ```bash
    sudo yum update -y
    sudo amazon-linux-extras install docker
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    ```
