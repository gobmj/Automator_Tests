# Auto-generated feature file for backend/src/config/database.js
# Generated on: 2026-05-24T18:43:54.833Z

Feature: Database Configuration and Connection Management
  As a system administrator
  I want to ensure the database is properly configured and connected
  So that the application can reliably store and retrieve order data

  Background:
    Given the application environment is configured
    And environment variables are loaded from configuration

  Scenario: Successfully establish database connection with default configuration
    Given the database configuration uses default values
    When the system attempts to test the database connection
    Then the connection should be established successfully
    And a success message should be logged

  Scenario: Successfully establish database connection with custom environment variables
    Given the following environment variables are set:
      | Variable      | Value           |
      | DB_NAME       | custom_orders   |
      | DB_USER       | custom_user     |
      | DB_PASSWORD   | custom_pass     |
      | DB_HOST       | db.example.com  |
      | DB_PORT       | 5432            |
    When the system attempts to test the database connection
    Then the connection should be established successfully
    And the database should use the custom configuration

  Scenario: Handle database connection failure gracefully
    Given the database host is unreachable
    When the system attempts to test the database connection
    Then the connection should fail
    And an error message should be logged
    And the system should return false

  Scenario: Use default database credentials when environment variables are not set
    Given no custom environment variables are configured
    When the system initializes the database connection
    Then the system should use the default database name "ordermanagement"
    And the system should use the default database user "orderuser"
    And the system should use the default database password "orderpass"
    And the system should use the default host "localhost"
    And the system should use the default port 5433

  Scenario: Configure connection pool with appropriate settings
    Given the database connection is initialized
    When the system establishes a connection pool
    Then the maximum pool size should be 5 connections
    And the minimum pool size should be 0 connections
    And the connection acquisition timeout should be 30000 milliseconds
    And the idle connection timeout should be 10000 milliseconds

  Scenario: Enable logging in development environment
    Given the application is running in development mode
    When the database connection is established
    Then database query logging should be enabled
    And SQL queries should be logged to console

  Scenario: Disable logging in production environment
    Given the application is running in production mode
    When the database connection is established
    Then database query logging should be disabled
    And SQL queries should not be logged

  Scenario: Successfully synchronize database models without forcing reset
    Given the database connection is established
    And existing database schema exists
    When the system synchronizes the database models
    Then the database schema should be updated without data loss
    And a success message should be logged

  Scenario: Handle database synchronization errors
    Given the database connection is established
    And the database schema has conflicts
    When the system attempts to synchronize the database models
    Then the synchronization should fail
    And an error message should be logged
    And the error should be thrown to the caller

  Scenario: Use PostgreSQL dialect for database operations
    Given the database configuration is loaded
    When the system initializes the database connection
    Then the database dialect should be set to PostgreSQL
    And all database operations should use PostgreSQL syntax

  Scenario: Export sequelize instance for application use
    Given the database module is imported
    When the application accesses the default export
    Then the sequelize instance should be available
    And the application should be able to use it for model definitions