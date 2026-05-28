# Auto-generated feature file for backend/src/app.js
# Generated on: 2026-05-28T08:59:04.688Z

# Auto-generated feature file for backend/src/app.js
# Generated on: 2026-05-24T18:43:49.054Z

Feature: Express Application Server Setup and Health Monitoring
  As a system administrator
  I want the application server to be properly configured with security and monitoring
  So that the API is secure, accessible, and operational

  Background:
    Given the application environment variables are loaded
    And the server is configured with necessary middleware
    And the following middleware are applied:
      | Middleware      | Purpose                    |
      | helmet          | Security headers           |
      | cors            | Cross-origin requests      |
      | morgan          | HTTP request logging       |
      | express.json    | JSON body parsing          |
      | urlencoded      | URL-encoded body parsing   |

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
    When a client requests the health check endpoint at GET /health
    Then the response status code should be 200
    And the response should contain success status as true
    And the response should contain the message "Server is running"
    And the response should contain a valid ISO timestamp

  Scenario: Security headers are applied to all responses
    Given the server is running
    When a client makes any request to the server
    Then the response should include security headers from helmet middleware

  Scenario: CORS is enabled for cross-origin requests
    Given the server is running
    When a client makes a cross-origin request
    Then the response should include appropriate CORS headers
    And the request should be processed successfully

  Scenario: HTTP requests are logged
    Given the server is running
    When a client makes a request to any endpoint
    Then the request should be logged by morgan in development format

  Scenario: JSON request bodies are parsed correctly
    Given the server is running
    When a client sends a POST request with JSON body
    Then the server should parse the JSON body correctly
    And the request handler should receive the parsed data

  Scenario: URL-encoded request bodies are parsed correctly
    Given the server is running
    When a client sends a POST request with URL-encoded body
    Then the server should parse the URL-encoded body correctly
    And the request handler should receive the parsed data

  Scenario: Order routes are properly mounted
    Given the server is running
    When a client requests any endpoint under /api/orders
    Then the request should be routed to the order routes handler

  Scenario: Analytics routes are properly mounted
    Given the server is running
    When a client requests any endpoint under /api/analytics
    Then the request should be routed to the analytics routes handler

  Scenario: 404 handler returns not found for undefined routes
    Given the server is running
    When a client requests an undefined endpoint
    Then the response status code should be 404
    And the notFoundHandler middleware should be invoked

  Scenario: Global error handler catches and processes errors
    Given the server is running
    And an error occurs during request processing
    When the error is thrown in a route handler
    Then the global error handler should catch the error
    And an appropriate error response should be returned

  Scenario: Unhandled promise rejections are caught
    Given the server is running
    When an unhandled promise rejection occurs
    Then the process should log the rejection error
    And the process should exit with error code 1

  Scenario: Server does not start in test mode
    Given the NODE_ENV environment variable is set to "test"
    When the application module is loaded
    Then the startServer function should not be automatically invoked

  Scenario: Server uses default port when PORT environment variable is not set
    Given the PORT environment variable is not set
    When the server starts
    Then the server should listen on port 3000

  Scenario: Server uses custom port from environment variable
    Given the PORT environment variable is set to 5000
    When the server starts
    Then the server should listen on port 5000