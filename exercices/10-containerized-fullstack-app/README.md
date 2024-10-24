# Containerized Fullstack App

## Project Structure

- [Database](./database) - Microsoft SQL Server
- [Backend](./backend) - ASP.NET Core Web API
- [Frontend](./frontend) - Vite React SWC TypeScript App

## Running the App

- Create a network for the app
  ```sh
  docker network create fullstack-app
  ```
- Start the database

  - Build the image
    ```sh
    docker build -t database:development ./database
    ```
  - Start the container
    ```sh
    docker run -d --name database --network fullstack-app -e 'SA_PASSWORD=<server_password>' -p 1433:1433 database:development
    ```

- Start the backend

  - Build the image
    ```sh
    docker build -t backend:development --build-arg 'MSQL_SERVER=<server>'  --build-arg 'MSQL_PASSWORD=<password>'  ./backend
    ```
  - Start the container
    ```sh
    docker run -d --name backend --network fullstack-app -p 5035:8080 backend:development
    ```
  - Visit http://localhost:5035/swagger/index.html
