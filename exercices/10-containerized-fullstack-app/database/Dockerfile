# Use the official Microsoft SQL Server image from the Microsoft Container Registry
FROM mcr.microsoft.com/mssql/server:2022-latest

# Get the Password from the command line
ARG MSSQL_SA_PASSWORD

# Set environment variables
ENV ACCEPT_EULA=Y
ENV MSSQL_SA_PASSWORD=${MSSQL_SA_PASSWORD}
ENV MSSQL_PID=Developer

# Create a directory for the setup scripts
RUN mkdir -p /tmp/setup
COPY script/* /tmp/setup/

# Expose the SQL Server port
EXPOSE 1433

# Start the SQL Server service and run the initialization script
ENTRYPOINT [ "/bin/bash", "/tmp/setup/entrypoint.sh" ]
CMD [ "/opt/mssql/bin/sqlservr" ]
