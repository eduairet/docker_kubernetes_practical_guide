# Networking: (Cross-)Container Communication

- Containers can communicate with external services both on the host and on the internet
  - External services: e.g. databases, APIs, etc.
  - Host: e.g. other containers, services running on the host, etc.
    - If you need to get the IP address of the host, you can use the special DNS name `host.docker.internal`
    - To allow containers to communicate with each other, you might need to use the container IP address
      - You can get the IP address of a container by running `docker container inspect <container-name> | grep "IPAddress"`
- When we have different applications, like a frontend and a backend, we need to make sure they can communicate with each other and they are in different containers so they can be scaled independently

## Docker Networks

- Docker provides a way to create networks that allow containers to communicate with each other
- When you create a container, you can specify the network it should be connected to using the `--network` flag
  ```bash
  docker run --network <network-name> ...
  ```
- Networks are not created by default, you need to create them first
  ```bash
  docker network create <network-name>
  ```
- A network will make it easier to resolve the IP address of a container
  - You can now use the container name as the hostname to communicate with another container `http://backend:3000`

- Docker networks use drivers to provide different networking capabilities
  - The default driver is `bridge`
  - Other drivers include `host`, `overlay`, `macvlan`, `none`, etc.
  - You can specify the driver when creating a network
    ```bash
    docker network create --driver <driver-name> <network-name>
    ```