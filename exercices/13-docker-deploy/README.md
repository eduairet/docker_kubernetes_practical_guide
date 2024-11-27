# Deploy Luck.API to AWS

## Endpoints

- `GET /luck`: Returns a random number and a message with your luck.
  ```json
  {
    "value": -4,
    "message": "You've lost -4 luck points!"
  }
  ```

## Prepare the Docker Image

- First build the Docker image.
  ```bash
  docker build -t eat-dotnet-example-01 .
  ```
- Then assign a tag to the image.
  ```bash
  docker tag eat-dotnet-example-01 <docker-hub-username>/eat-dotnet-example-01
  ```
- Then we push it to docker hub
  ```bash
  docker push <docker-hub-username>/eat-dotnet-example-01
  ```
