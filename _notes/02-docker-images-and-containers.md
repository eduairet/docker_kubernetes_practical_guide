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

## Containers

- They execute the code in the Docker image and add a read-write layer on top
- Creating container from image
  - On your node directory, create a `Dockerfile` with the following content
    ```Dockerfile
    # Use an existing docker image as a base
    FROM node
    # Use copy . /app to copy all files from the current directory to the container except for the Dockerfile
    # Here the first dot refers to host file system, and the second dot or route (/app in this case) refers to the image/container file system
    COPY . /app
    # Run a command to install dependencies
    RUN npm install
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
