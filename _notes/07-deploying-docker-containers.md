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
