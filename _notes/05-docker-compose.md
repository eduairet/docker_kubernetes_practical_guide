# Docker Compose: Elegant Multi-Container Orchestration

- Docker Compose is a tool that allows you to define and run multi-container Docker applications with a single configuration file.
- It's a YAML file where you define services, networks, and volumes.
- To run a multi-container application, you can use `docker-compose up` (or `docker-compose up -d` to run in detached mode).
- To stop the application, you can use `docker-compose down` (to delete the volumes, use `docker-compose down -v`).
- It's a great tool to run multiple containers in the same host, but it's not suitable for production environments.

## Docker Compose File

```yaml
services:
  redis-server:
    build:
      context: .
      dockerfile: Dockerfile-redis # If the Dockerfile is named differently
    image: 'redis'
    docker_container_name: 'redis-server' # Name of the container if you want to give it a name
    environment:
      - ACCEPT_EULA=Y
    env_file:
      - ./env/redis.env
  node-app:
    build: .
    volumes:
      - my-volume:/app
    ports:
      - '4001:8081'
    stdin_open: true # Keep STDIN open even if not attached
    tty: true # Allocate a pseudo-TTY
    depends_on:
      - redis-server

volumes:
  my-volume:
```

- All services are run in the same network by default, so you might not need to define a network but if you do, you can do it like this:

  ```yaml
  networks:
    my-network:
  ```

- To rebuild the images, you can use `docker-compose up --build`.
  - If you want just to rebuild your image, you can use `docker-compose build`.
