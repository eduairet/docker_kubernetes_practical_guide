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
  - Example at [hub.docker.com/repository/docker/eduairet/eat-dotnet-example-01/general](https://hub.docker.com/repository/docker/eduairet/eat-dotnet-example-01/general)
- And then we can run it in our AWS instance.
  ```bash
  docker run -d --rm -p 80:80 <docker-hub-username>/eat-dotnet-example-01
  ```
  - Make sure the security group allows traffic on port 80.
  - Visit the instance's public IP to see the API running `http://<public-aws-api>/index.html`
