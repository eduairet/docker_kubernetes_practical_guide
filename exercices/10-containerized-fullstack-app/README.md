# Containerized Fullstack App

## Project Structure

- [Database](./database) - Microsoft SQL Server
- [Backend](./backend) - ASP.NET Core Web API
- [Frontend](./frontend) - Vite React SWC TypeScript App

## Running the App

- Create a network to be shared by the containers
  ```sh
  docker network create fullstack-app
  ```
- Start the database

  - Build the image with an argument to store the server password
    ```sh
    docker build --build-arg 'MSSQL_SA_PASSWORD=<password>' -t database:development ./database
    ```
  - Start the container and persist the database data
    ```sh
    docker run -d --name database --network fullstack-app --rm -v database-data:/var/opt/mssql -p 1433:1433 database:development
    ```

- Start the backend

  - Build the image
    ```sh
    docker build -t backend:development --build-arg 'MSQL_PASSWORD=<password>' ./backend
    ```
  - Start it with a bind mount to get the log files
    ```sh
    docker run -d --name backend --network fullstack-app --rm -v "path/to/logs/dir:/app/Logs" -p 5035:8080 backend:development
    ```
  - Visit http://localhost:5035/swagger/index.html

- Start the frontend

  - Build the image
    ```sh
    docker build -t frontend:development ./frontend
    ```
  - Start the container with a bind mount to allow hot reloading
    ```sh
    docker run --name frontend --network fullstack-app --rm -v "path/to/app/src:/app/src" -it -p 5173:5173 frontend:development
    ```
  - Visit http://localhost:5173
