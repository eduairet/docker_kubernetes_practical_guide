# Intro

## What is Docker?

- Docker is a container technology
  - Container: A standardized unit of software (package of code and dependencies)
  - A container ensures that the software will run the same way, regardless of the environment

## Why Docker?

- Ensure that the local environment is the same as the production environment across different machines
- Simplify the deployment process
- Avoid clashes between different tools and versions

## Docker vs. Virtual Machines

- Docker containers are lightweight and share the host OS kernel (unlike VMs)
  - Operating system -> OS Built-in / Emulated Container Support -> Docker Engine -> Containers
  - Better for running multiple applications on the same machine (e.g., microservices)
- VMs are slower to start and consume more resources than Docker containers

## Docker Setup

- Go to the [Get Started Docker website](https://docs.docker.com/get-started/get-docker/), download Docker Desktop for your OS (if not Linux) and follow installation instructions
  - Linux supports the Docker Engine natively
  - Older versions of Windows and macOS require Docker Toolbox
- Verify the installation by running `docker --version` in the terminal
  ```bash
  docker --version
  # Docker version 27.2.0, build 7cb1254
  ```
- Now run the application
  - If you don't run the app you won't be able to use Docker commands
- For writing Dockerfiles, use a text editor or an IDE
  - [Visual Studio Code](https://code.visualstudio.com/) is a popular choice
    - Install the [Docker extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) for syntax highlighting and IntelliSense

## Writing Dockerfiles

- Dockerfiles are used to create Docker images (blueprints for containers) with the necessary dependencies and configurations
- The Dockerfile syntax is straightforward
  - `FROM`: Base image
  - `WORKDIR`: Working directory
  - `COPY`: Copy files from the host to the container
  - `RUN`: Run commands
  - `EXPOSE`: Expose a port
  - `CMD`: Run the application
- Example Dockerfile for a `Node.js` app

  ```dockerfile
  # Use the official Node.js image
  FROM node:14
  # Set the working directory
  WORKDIR /app
  # Copy package.json and package-lock.json
  COPY package.json .
  # Install dependencies
  RUN npm install
  # Copy the rest of the files
  COPY . .
  # Expose port 3000
  EXPOSE 3000
  # Run the app
  CMD [ "node", "app.mjs" ]
  ```

- To build the image, run `docker build .` in the terminal (in the same directory as the Dockerfile)
- To run the container, run `docker run <image_id>` (use `docker ps` to see the running containers)
  - Use the `-p` flag to map the container port to the host port
    ```bash
    docker run -p 3000:3000 <image_id>
    ```
- To stop the container, run `docker stop <container_name>`
  - Get the container name from `docker ps`
