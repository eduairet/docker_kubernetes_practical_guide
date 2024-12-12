# First Kubernetes Deployment

## Creating the Docker Image

- Build the Docker image
  ```bash
  cd rest_api
  docker build -t kub-first-app .
  ```
- Run the Docker image
  ```bash
  docker run -d -p 8080:8080 --name kub-first-app --rm kub-first-app
  ```
- Visit the API at `http://localhost:8080`
