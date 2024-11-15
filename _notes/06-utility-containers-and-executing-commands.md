# Working with "Utility Containers" & Executing Commands In Containers

- Utility containers are containers that are not meant to run a server or an application but to execute a specific task.
- They have the environment and tools needed to run the task.
- For example, you can run a `Rust` image and then create a new Rust project using `exec`
  ```bash
  docker run -it -d rust
  docker exec -it <container_id> cargo new my-project
  ```
- To avoid running a command that could files files other than the ones you want, you can create a Dockerfile and add an `ENTRYPOINT` to the command you want to run.

  ```Dockerfile
  FROM rust
  WORKDIR /app
  ENTRYPOINT ["cargo"]
  ```

- To simplify the process of running a command in a container, you can create a docker-compose file.
  ```yaml
  services:
    cargo:
      build: ./
      stdin_open: true
      tty: true
      volumes:
        - ./:/app
  ```
- Then you can run the command with `docker-compose run --rm cargo build`
