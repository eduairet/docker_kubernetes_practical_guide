# Just getting the price
# docker build -t 09-external-connection:get-price .
# docker run --rm 09-external-connection:get-price

# Setup Microsoft SQL Server
# sudo docker pull mcr.microsoft.com/mssql/server:2022-latest
# docker run -d --name <server_name> -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=<server_password>' -p <container_port>:<local_port> mcr.microsoft.com/mssql/server:2022-latest

# Getting the price connecting to a local SQL Server
# docker build -t 09-external-connection:db-connection .
# docker run --rm --env-file .env 09-external-connection:db-connection
# Where .env contains the following:
    # MSQL_SERVER=ServerNameOrIpAdress
    # MSQL_PORT=ServerPort
    # MSQL_USER=ServerUserName
    # MSQL_PASSWORD=Password

FROM python:3.9.20
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

# Install ODBC driver for SQL Server
RUN apt-get update && \
    apt-get install -y curl apt-transport-https gnupg && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y msodbcsql17 unixodbc-dev

COPY . .
CMD ["python", "main.py"]