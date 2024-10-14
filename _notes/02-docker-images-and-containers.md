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
- To inspect an image, you can use the following command
  ```bash
  docker image inspect <image_id>
  ```
  - This will show you the metadata of the image

<details>
  <summary>Example</summary>

```
[
    {
        "Id": "sha256:2f0aa08406e28dc9f16f38971d72fad6004509ab3bda1313bc12b8f2264599c5",
        "RepoTags": [],
        "RepoDigests": [],
        "Parent": "",
        "Comment": "buildkit.dockerfile.v0",
        "Created": "2024-10-10T03:47:56.537035596Z",
        "DockerVersion": "27.2.0",
        "Author": "",
        "Config": {
            "Hostname": "",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "GPG_KEY=7169605F62C751356D054A26A821E680E5FA6305",
                "PYTHON_VERSION=3.13.0"
            ],
            "Cmd": [
                "python",
                "main.py"
            ],
            "ArgsEscaped": true,
            "Image": "",
            "Volumes": null,
            "WorkingDir": "/app",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": null
        },
        "Architecture": "amd64",
        "Os": "linux",
        "Size": 381194769,
        "GraphDriver": {
            "Data": null,
            "Name": "overlayfs"
        },
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:d50132f2fe78aaa8e67f229e53305d0c4a7a86c9deda4bf3160be0a678926458",
                "sha256:3e14a6961052c6ebe30f972947bf9d7ffec586a2bf081738fd9acd74fdceb343",
                "sha256:f91dc7a486d99ec2e605b4417fe39b503aa3045d6f91f92810b82fae54ae9293",
                "sha256:2bce433c3a290e09105af7c14ea063b125babdcc74544fa5773a2ce88e54f78e",
                "sha256:7f22fdb1c7d198a67572f86a4b7865fa185be7d2cc25b022a1abbd610fee7e5f",
                "sha256:8b83ad8f507b9c0069b20868e79dc7900a6312f0e9f22299366884fdcdc89cb8",
                "sha256:2b55cf69e53ebae408b13fca15892c1ab7e7a46702de9509a625ce97a18d1dbd",
                "sha256:6c6ce8575c0dd31c075d5a7639408637e5f30407509bb0cb2da26390a301f9e0",
                "sha256:e21b0090dcf14e76e0a3f41669c6ba6d26d069558941c43bfe81da37fc354ae4"
            ]
        },
        "Metadata": {
            "LastTagTime": "2024-10-10T04:20:29.566134726Z"
        }
    }
]
```

</details>

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
docker image ls
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

## Deleting Images & Containers

```bash
# Delete a container (make sure it is not running)
docker rm <container_name>
docker rm <container_name> <container_name> <container_name>
# Remove all stopped containers
docker container prune
# Delete an image (make sure it is not being used by any container)
docker rmi <image_id>
# Remove all images
docker image prune
# By default docker image prune will not remove images with tags, to remove all images use the -a flag
docker image prune -a
```

- You can make the container stop after a certain amount of time using the `--rm` flag when creating the container
  ```bash
  docker run -p 3000:3000 --rm <image_id>
  ```
  - This will remove the container after it stops

## Copying Files into Containers

- To copy files into a container, you can use the `docker cp` command
  ```bash
  docker cp <file_path> <container_name>:<destination_path>
  ```
  - Here, `<file_path>` is the path to the file you want to copy, `<container_name>` is the name of the container you want to copy the file to, and `<destination_path>` is the path where you want to copy the file to in the container
- To copy files from a container, you can use the same command but switch the source and destination
  ```bash
  docker cp <container_name>:<file_path> <destination_path>
  ```
  - Here, `<container_name>` is the name of the container you want to copy the file from, `<file_path>` is the path to the file you want to copy, and `<destination_path>` is the path where you want to copy the file to on your local machine
- You can try this using the [04-copy-files](../exercices/04.copy-files/) exercise:

  ```bash
  docker run <image_id>
  #Current directory: /app
  #Files in the current directory:
  #main.py
  #Dockerfile

  docker cp ../../text.txt <container_name>:/app
  #Current directory: /app
  #Files in the current directory:
  #text.txt
  #main.py
  #Dockerfile

  docker cp <container_name>:/app/text.txt  copied-from-container.txt
  ```

## Naming & Tagging Containers & Images

- You can name a container using the `--name` flag when creating the container
  ```bash
  docker run --name <container_name> <image_id>
  ```
  - Here, `<container_name>` is the name you want to give to the container
- You can tag an image using the `-t` or `--tag` to flag when building the image
  ```bash
  docker build -t <image_name>:<tag> .
  ```
  - Here, `<image_name>` is the name you want to give to the image
  - Images have also names which are the repository and the tag, for example, `node:latest`
