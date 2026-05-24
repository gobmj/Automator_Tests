# Auto-generated feature file for backend/src/app.js
# Generated on: 2026-05-24T18:43:49.054Z

Feature: Express Application Server Setup and Health Monitoring
  As a system administrator
  I want the application server to be properly configured with security and monitoring
  So that the API is secure, accessible, and operational

  Background:
    Given the application environment variables are loaded
    And the server is configured with necessary middleware

  Scenario: Server starts successfully with database connection
    Given the database connection is available
    And the database models are synchronized
    When the server starts
    Then the server should listen on the configured port
    And the startup message should display the API endpoint
    And the startup message should list all available endpoints

  Scenario: Server fails to start when database connection is unavailable
    Given the database connection fails
    When the server attempts to start
    Then the server should exit with error code 1
    And an error message should be logged about database connection failure

  Scenario: Server fails to start when database synchronization fails
    Given the database connection is available
    But the database synchronization fails
    When the server attempts to start
    Then the server should exit with error code 1
    And an error message should be logged about synchronization failure

  Scenario: Health check endpoint returns server status
    Given the server is running
    When a client requests the health check endpoint
    Then the response status code should be 200
    And the response should contain success status as true
    And the response should contain the message "Server is running"
    And the response should contain a valid timestamp

  Scenario: Security headers are applied to all responses
    Given the server is running
    When a client makes any request to the server
    Then the response should include security headers from Helmet middleware
    And the response should protect against common web vulnerabilities

  Scenario: CORS is enabled for cross-origin requests
    Given the server is running
    When a client from a different origin makes a request
    Then the request should be accepted
    And the response should include appropriate CORS headers

  Scenario: HTTP requests are logged
    Given the server is running
    When a client makes an HTTP request
    Then the request should be logged with Morgan logger
    And the log should include request method, path, and response status

  Scenario: JSON request bodies are parsed correctly
    Given the server is running
    When a client sends a request with JSON content type
    And the request body contains valid JSON data
    Then the server should parse the JSON body correctly
    And the parsed data should be available in the request object

  Scenario: URL-encoded request bodies are parsed correctly
    Given the server is running
    When a client sends a request with URL-encoded content type
    And the request body contains URL-encoded data
    Then the server should parse the URL-encoded body correctly
    And the parsed data should be available in the request object

  Scenario: 404 handler responds to undefined routes
    Given the server is running
    When a client requests a route that does not exist
    Then the response status code should be 404
    And the not found handler should be invoked

  Scenario: Global error handler catches application errors
    Given the server is running
    When an unhandled error occurs during request processing
    Then the global error handler should catch the error
    And an appropriate error response should be returned to the client

  Scenario: Unhandled promise rejections are caught
    Given the server is running
    When an unhandled promise rejection occurs
    Then the process should log the error
    And the process should exit with error code 1

  Scenario: Server does not start in test mode
    Given the NODE_ENV environment variable is set to "test"
    When the application module is loaded
    Then the startServer function should not be automatically invoked

  Scenario: Order routes are properly registered
    Given the server is running
    When a client makes a request to the orders API endpoint
    Then the request should be routed to the order routes handler
    And the order routes should be available at /api/orders

  Scenario: Server uses configured port from environment
    Given the PORT environment variable is set to a specific value
    When the server starts
    Then the server should listen on the configured port

  Scenario: Server uses default port when environment variable is not set
    Given the PORT environment variable is not set
    When the server starts
    Then the server should listen on port 3000

  Scenario Outline: All order endpoints are available
    Given the server is running
    When a client requests the <method> <endpoint> endpoint
    Then the endpoint should be routed to the order routes handler

    Examples:
      | method | endpoint                    |
      | POST   | /api/orders                 |
      | GET    | /api/orders                 |
      | GET    | /api/orders/:orderId        |
      | PUT    | /api/orders/:orderId        |
      | DELETE | /api/orders/:orderId        |
      | POST   | /api/orders/:orderId/release|
      | GET    | /api/orders/status/:status  |
      | GET    | /api/orders/search          |