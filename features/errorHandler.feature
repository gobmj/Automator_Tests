# Auto-generated feature file for backend/src/middleware/errorHandler.js
# Generated on: 2026-05-24T18:44:11.407Z

Feature: Error Handling and Response Management
  As a backend API consumer
  I want the system to handle errors gracefully
  So that I receive clear, actionable error messages

  Background:
    Given the error handler middleware is configured
    And the API is running

  Scenario: Handle validation errors from database constraints
    Given a request is made with invalid data
    When the database validation fails
    Then the system should return a 400 status code
    And the response should contain success as false
    And the response should contain error message "Validation Error"
    And the response should include field-level error details

  Scenario: Return validation error details with field information
    Given a request contains multiple validation errors
    When the database validation fails
    Then the response should include details array
    And each detail should contain the field name
    And each detail should contain the error message

  Scenario: Handle duplicate entry constraint violations
    Given a request attempts to create a duplicate record
    When the database unique constraint is violated
    Then the system should return a 409 status code
    And the response should contain success as false
    And the response should contain error message "Duplicate Entry"
    And the response should contain message "A record with this value already exists"
    And the response should include field-level constraint details

  Scenario: Return duplicate entry error details
    Given a request violates a unique constraint
    When the database constraint error occurs
    Then the response should include details array
    And each detail should contain the conflicting field name
    And each detail should contain the constraint violation message

  Scenario: Handle database errors gracefully
    Given a database error occurs during request processing
    When the database error is not a validation or constraint error
    Then the system should return a 500 status code
    And the response should contain success as false
    And the response should contain error message "Database Error"
    And the response should contain message "An error occurred while processing your request"

  Scenario: Handle custom API errors with specified status codes
    Given a custom API error is thrown with a specific status code
    When the error handler processes the custom error
    Then the system should return the specified status code
    And the response should contain success as false
    And the response should contain the error message from the custom error

  Scenario: Handle custom API errors with various status codes
    Given a custom API error is thrown
    When the error handler processes the error
    Then the system should return the appropriate HTTP status code
    And the response should contain the error details

    Examples:
      | statusCode | message                    |
      | 400        | Bad Request                |
      | 401        | Unauthorized               |
      | 403        | Forbidden                  |
      | 404        | Resource Not Found         |
      | 422        | Unprocessable Entity       |

  Scenario: Handle generic errors with default status code
    Given an error occurs without a specified status code
    When the error handler processes the generic error
    Then the system should return a 500 status code
    And the response should contain success as false
    And the response should contain the error message

  Scenario: Handle errors with missing message
    Given an error occurs without a message property
    When the error handler processes the error
    Then the system should return a 500 status code
    And the response should contain success as false
    And the response should contain default message "Internal Server Error"

  Scenario: Return 404 for undefined routes
    Given a request is made to an undefined route
    When the not found handler is invoked
    Then the system should return a 404 status code
    And the response should contain success as false
    And the response should contain error message "Route not found"
    And the response should include the requested path

  Scenario: Return 404 with correct path information
    Given a request is made to a non-existent endpoint
    When the not found handler processes the request
    Then the response should include the original URL path
    And the path should match the requested endpoint

  Scenario: Log errors for debugging purposes
    Given an error occurs in the application
    When the error handler processes the error
    Then the error should be logged to the console
    And the error details should be available for debugging

  Scenario: Maintain response consistency across error types
    Given various types of errors occur
    When the error handler processes each error
    Then all responses should contain a success field set to false
    And all responses should contain an error field
    And all responses should be in valid JSON format