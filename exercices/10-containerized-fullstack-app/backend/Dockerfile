#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 7073
EXPOSE 5035

ARG MSQL_SERVER
ARG MSQL_PASSWORD
ENV ConnectionStrings__DefaultConnection="Server=database,1433;Database=DockerDemoGoals;User Id=sa;Password=${MSQL_PASSWORD};TrustServerCertificate=true;MultipleActiveResultSets=true"

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY backend.csproj .
RUN dotnet restore backend.csproj
COPY . .
RUN dotnet build backend.csproj -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish backend.csproj -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "backend.dll"]