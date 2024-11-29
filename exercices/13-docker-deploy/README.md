# Deploy Luck.API to AWS

## Endpoints

- `GET /luck`: Returns a random number and a message with your luck.
  ```json
  {
    "value": -4,
    "message": "You've lost -4 luck points!"
  }
  ```

## Do it yourself approach

### Prepare the Docker Image

- First build the Docker image.
  ```bash
  docker build -t eat-dotnet-example-01 .
  ```
- Then assign a tag to the image.
  ```bash
  docker tag eat-dotnet-example-01 <docker-hub-username>/eat-dotnet-example-01
  ```
- Then we push it to docker hub
  ```bash
  docker push <docker-hub-username>/eat-dotnet-example-01
  ```
  - Example at [hub.docker.com/repository/docker/eduairet/eat-dotnet-example-01/general](https://hub.docker.com/repository/docker/eduairet/eat-dotnet-example-01/general)
- And then we can run it in our AWS instance.
  ```bash
  docker run -d --rm -p 80:80 <docker-hub-username>/eat-dotnet-example-01
  ```
  - Make sure the security group allows traffic on port 80.
  - Visit the instance's public IP to see the API running `http://<public-aws-api>/index.html`

### Update the AWS container

- If you want to update the container, you can stop it (check with `docker ps` the container id)
  ```bash
  docker stop <container-id>
  ```
- Update your code and push it to docker hub again.
  ```bash
  docker build -t eat-dotnet-example-01 .
  docker tag eat-dotnet-example-01 <docker-hub-username>/eat-dotnet-example-01
  docker push <docker-hub-username>/eat-dotnet-example-01
  ```
- Pull the nw image in the AWS instance.
  ```bash
  docker pull <docker-hub-username>/eat-dotnet-example-01
  ```
- And then run it again in the AWS instance.
  ```bash
  docker run -d --rm -p 80:80 <docker-hub-username>/eat-dotnet-example-01
  ```

### Disadvantages of this approach

- You need to do everything manually.
- The scalability is very limited.
- You need to have a good knowledge of Docker and AWS to make it work and secure.
- The security is completely up to you.
- It's not automated, so updates are manual.

## Using Managed Remote Services (AWS ECS)

### Advantages

- AWS ECS is a managed service that allows you to run Docker containers in a cluster.
- It's scalable and secure.
- It's easy to deploy and update.
- It's integrated with other AWS services.

### Setting up AWS ECS

- First you'll configure the Container and Task Definitions.
  - Select custom container and fill it with the Docker Hub image we've used before `<docker-hub-username>/eat-dotnet-example-01`.
  - Set the port mapping to 80.
  - Configure the rest of the options according to your project.
  - The task is the remote server that will run the container.
- Then you'll define a Service.
  - Select the task definition you've created.
  - Set the number of tasks you want to run.
  - Configure the rest of the options according to your project.
  - The service is the way you manage the tasks.
  - Here Fargate is a good option for small projects since it's serverless and you don't need to manage the instances.
- Finally, you'll create a Cluster.
  - Select the service you've created.
  - Configure the rest of the options according to your project.
  - The cluster is the way you manage the services.
- Check the summary and if everything is correct, and click on create.

### Updating the service

- If you want to update the service, you can do it by updating the task definition.
- Update your Docker hub image and then update the task definition with the new image by clicking on the `Create new revision` button.
  - You'll usually leave the rest of the options as they are.

### Adding more containers

- If you want to add more containers, you can do it by updating the service.
- Update the number of tasks you want to run and click on update.
- The service will automatically create the new tasks and manage them.

### Load Balancing

- If you want to add a load balancer, you can do it by creating a new one and linking it to the cluster.
- The load balancer will distribute the traffic between the tasks.
- You can configure the load balancer to use HTTPS and other security options.
- You can also configure the load balancer to use a custom domain and avoid changing the IP public address every time you update the service.

### Persisting Data

- If you want to persist data, you can use EFS
  - This allows to set volumes that can be shared between the tasks.
  - Even though we can create a DB here, it's not recommended for production, we rather use a hosted DB instead (RDS, DynamoDB, etc).
- EFS is a managed service that allows you to create a file system that can be shared between the tasks.
- You can mount the EFS file system in the tasks and use it to store data.
- Make sure to configure the security groups and the permissions correctly.
  - Set the NFS security group to allow traffic from the ECS security group.
