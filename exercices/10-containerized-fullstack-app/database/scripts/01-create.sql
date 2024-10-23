IF NOT EXISTS (SELECT *
FROM sys.databases
WHERE name = 'DockerDemoGoals')
BEGIN
    CREATE DATABASE DockerDemoGoals
END
GO

USE DockerDemoGoals
GO

IF NOT EXISTS (SELECT *
FROM sys.tables
WHERE name = 'Goals')
BEGIN
    CREATE TABLE Goals
    (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Text NVARCHAR(MAX) NOT NULL
    )
END
GO