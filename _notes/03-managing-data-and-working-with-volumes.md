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
