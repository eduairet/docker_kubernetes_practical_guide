# Networking: (Cross-)Container Communication

- Containers can communicate with external services both on the host and on the internet
  - External services: e.g. databases, APIs, etc.
  - Host: e.g. other containers, services running on the host, etc.
- When we have different applications, like a frontend and a backend, we need to make sure they can communicate with each other and they are in different containers so they can be scaled independently
