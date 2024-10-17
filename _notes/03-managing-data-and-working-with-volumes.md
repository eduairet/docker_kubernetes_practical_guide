# Managing Data & Working with Volumes

- Every container has its own file system and it's isolated from the host file system.
- When a container is removed, all the temporary data inside it is erased (files, state, etc).
- To persist data, we can use volumes.

## Volumes

- Volumes are a way to persist data outside of the container.
- There are two types of volumes:
  - **Anonymous and Named volumes**: created and managed by Docker and are stored in a Docker managed directory.
    - Anonymous volumes are created by Docker and have a random name, they're removed when the container is removed if it's run with the `--rm` flag.
      ```Dockerfile
      ...
      VOLUME [ "/app/data" ]
      ```
      - You can remove the volume with `docker volume rm <volume-name>` or all anonymous volumes with `docker volume prune`.
    - Named volumes are created by the user and have a specific name, they're not removed when the container is removed.
      ```sh
      docker run -v my-named-volume:/app/data my-image
      ```
      - When you run a new container now, you can use the same volume with the same name and there will be no data loss.
  - **Bind mounts**: link a container path to a host path (a directory on your machine).
    - You can use bind mounts to share data between the host and the container.
      ```sh
      docker run -v /host/path:/container/path my-image
      ```
      - The data is stored in the host directory and is accessible from the container.
        - You should use absolute paths for the host directory or use the `-v $(pwd)/:/path/to/workdir` variable (Linux/Mac) or `-v "%cd%":/path/to/workdir` (Windows).
        - Make sure the host directory is listed on the Docker Desktop settings (settings -> resources -> file sharing).
      - If we update the data in the host directory, it will be updated in the container as well.
    - Bind mounts are mostly used for development purposes, when you want to share code between the host and the container, so always try to use `COPY` in production.
- Read-only volumes are volumes that can't be written to, you can use the `ro` flag to create a read-only volume.
  ```sh
  docker run -v /host/path:/container/path:ro my-image
  ```
- Useful commands:
  - `docker volume ls`: list all volumes.
  - `docker volume create <volume-name>`: create a named volume.
  - `docker volume inspect <volume-name>`: inspect a volume.
  - `docker volume prune`: remove all anonymous volumes.
  - `docker volume rm <volume-name>`: remove a specific volume.

## Arguments and Environment Variables

- You can pass arguments to a container using the `--build-arg` flag.
  ```sh
  docker build --build-arg MY_ARG=value .
  ```
  - You can use the `ARG` instruction in the Dockerfile to define the argument.
    ```Dockerfile
    ARG MY_ARG
    ENV MY_ENV=$MY_ARG
    ```
- You can set environment variables in the Dockerfile using the `ENV` instruction or in the `docker run` command.
  ```Dockerfile
  ENV MY_ENV=value
  ```
  ```sh
  docker run --env MY_ENV=value my-image
  ```
  - Be careful with sensitive data, don't hardcode passwords or API keys in the Dockerfile.
    - Use the `--env-file` flag to pass environment variables from a file instead.
      ```sh
      docker run --env-file .env my-image
      ```
