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
  . `docker run <image_name>`