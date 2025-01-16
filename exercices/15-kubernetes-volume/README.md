# Story API

## API Container

- Build locally and check if it works at `http://localhost:8080`
  ```bash
  docker build -t kubernetes-volume .
  docker run -d -p 8080:8080 --name kubernetes-volume --rm kubernetes-volume
  docker stop kubernetes-volume
  ```
- Push the image to Docker Hub
  ```bash
  docker tag kubernetes-volume <username>/kubernetes-volume
  docker push <username>/kubernetes-volume
  ```
