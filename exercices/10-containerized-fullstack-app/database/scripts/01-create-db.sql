USE master
GO

-- Create Goals database
IF NOT EXISTS (SELECT name
FROM sys.databases
WHERE name = 'DockerDemoGoals')
BEGIN
    CREATE DATABASE DockerDemoGoals
END
GO

USE DockerDemoGoals
GO

-- Create Goals schema
IF NOT EXISTS (SELECT *
FROM information_schema.schemata
WHERE schema_name = 'GoalsSchema')
BEGIN
    EXEC('CREATE SCHEMA GoalsSchema')
END
GO

-- Create Goals table
IF NOT EXISTS (SELECT *
FROM information_schema.tables
WHERE table_schema = 'GoalsSchema' AND table_name = 'Goals')
BEGIN
    CREATE TABLE GoalsSchema.Goals
    (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Text NVARCHAR(MAX) NOT NULL
    )
END
GO