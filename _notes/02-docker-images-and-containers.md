# Docker Images & Containers: The Core Building Blocks

## Images

- Docker images are read-only templates used to create containers
- They contain the application code, runtime, libraries, dependencies, and other files
- Existing images can be used as a base for new images
  - Search for images on [Docker Hub](https://hub.docker.com/)
  - For example, if we wanted to use a `node` image we could use
    ```bash
    docker run -it node
    ```
    - Here, `-it` is used to run the container in interactive mode which allows us to interact with the container using the terminal
- Notice that if you run the command multiple times, you'll use the same image but different containers
  ```bash
  CONTAINER ID   IMAGE     COMMAND                  CREATED              STATUS                      PORTS     NAMES
  7ed154284385   node      "docker-entrypoint.s…"   35 seconds ago       Exited (0) 16 seconds ago             gracious_moser
  423bed4cc4d7   node      "docker-entrypoint.s…"   About a minute ago   Exited (0) 37 seconds ago             pedantic_noyce
  ```
- Remember that images are read-only, so new changes on your code will need to be built into a new image
- Every time you build an image, a new layer is added on top of the previous one and the new image is created with the changes, if there are no changes, the new image will be the same as the previous one because the layers are cached

## Containers

- They execute the code in the Docker image and add a read-write layer on top
- Creating container from image
  - On your node directory, create a `Dockerfile` with the following content
    ```Dockerfile
    # Use an existing docker image as a base
    FROM node
    # Set the working directory in the container
    WORKDIR /app
    # Copy the package.json file to the container (this is done first to take advantage of the cache)
    COPY package.json /app
    # Run a command to install dependencies
    RUN npm install
    # Use copy . /app to copy all files from the current directory to the container except for the Dockerfile
    # Here the first dot refers to host file system, and the second dot or route (/app in this case) refers to the image/container file system
    COPY . /app
    # Since the container is running in a different environment, we need to expose a port to access the application (this is mostly an informative command since it just tells the user that the container will use this port, but it does not actually open the port)
    EXPOSE 3000
    # Run a command to start the application
    CMD ["npm", "server.js"]
    ```
  - Once the dockerfile is created, build the image using the following command (the dot at the end refers to the current directory)
    ```bash
    docker build .
    ```
  - And now you can run the container using
    ```bash
    docker run -p 3000:3000 <image_id>
    ```
    - Here, `-p` is used to map the port 3000 from the host to the port 3000 in the container
    - Take in consideration that you can use only the first characters of the image id

## Managing Images & Containers

> [!NOTE]
> When you need help with a command, you can use the `--help` flag to get more information about it

```bash
# List all images
docker images
# List all running containers
docker ps
# List all containers (including the ones that are not running)
docker ps -a
# Create a container from an image
docker run <image_id>
# Create a container in detached mode (run in the background and not block the terminal)
docker run -d <image_id>
# Attach to a detached container
docker attach <container_name>
# Run a previously created container (detached mode is default)
docker start <container_name>
# Run a previously created container in attached mode
docker start -a <container_name>
# Stop a container
docker stop <container_name>
# Get logs from a container
docker logs <container_name>
```

## Entering Interactive Mode

- To enter the interactive mode of a container, you can use the following command
  ```bash
  docker run -it <image_id>
  docker start -a -i <container_name>
  # Get previously created containers with docker ps -a
  ```
  - Here, `-it` is used to run the container in interactive mode which allows us to interact with the container using the terminal, where `-i` is used to keep the STDIN open even if not attached and `-t` is used to allocate a pseudo-TTY
  - And `-a` is used to attach to the container and `-i` is used to keep the STDIN open even if not attached
- To exit the interactive mode, you can use the `exit` command
