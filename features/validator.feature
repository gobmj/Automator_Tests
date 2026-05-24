# Auto-generated feature file for backend/src/middleware/validator.js
# Generated on: 2026-05-24T18:44:24.693Z

Feature: Order Validation Middleware
  As a system administrator
  I want to ensure all order data is properly validated
  So that only valid orders are processed and stored in the system

  Background:
    Given the validation middleware is configured
    And the system expects ISO 8601 date format

  Scenario: Successfully validate a complete order creation request
    Given I have a valid order creation request with all required fields
      | field                      | value                |
      | orderNumber                | ORD-2024-001         |
      | material                   | Steel Plate          |
      | quantity                   | 100                  |
      | priority                   | 5                    |
      | status                     | CREATED              |
      | plant                      | Plant A              |
      | scheduledStartDate         | 2024-01-15T08:00:00Z |
      | scheduledCompletionDate    | 2024-01-20T17:00:00Z |
    When the order creation validation is executed
    Then the validation should pass
    And the request should proceed to the next middleware

  Scenario: Reject order creation when order number is missing
    Given I have an order creation request without an order number
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Order number is required"

  Scenario: Reject order creation when order number exceeds maximum length
    Given I have an order creation request with order number exceeding 50 characters
      | field       | value                                                  |
      | orderNumber | This is a very long order number that exceeds the limit |
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Order number must not exceed 50 characters"

  Scenario: Reject order creation when material is missing
    Given I have an order creation request without material
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Material is required"

  Scenario: Reject order creation when material exceeds maximum length
    Given I have an order creation request with material exceeding 100 characters
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Material must not exceed 100 characters"

  Scenario: Reject order creation when quantity is not a positive integer
    Given I have an order creation request with invalid quantity
      | field    | value |
      | quantity | 0     |
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Quantity must be a positive integer"

  Scenario: Reject order creation when quantity is negative
    Given I have an order creation request with negative quantity
      | field    | value |
      | quantity | -5    |
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Quantity must be a positive integer"

  Scenario: Reject order creation when quantity is not an integer
    Given I have an order creation request with non-integer quantity
      | field    | value |
      | quantity | 10.5  |
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Quantity must be a positive integer"

  Scenario: Accept order creation with optional priority field provided
    Given I have a valid order creation request with priority set to 500
    When the order creation validation is executed
    Then the validation should pass
    And the request should proceed to the next middleware

  Scenario: Reject order creation when priority is outside valid range
    Given I have an order creation request with priority outside the range 1-1000
      | field    | value |
      | priority | 1001  |
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Priority must be between 1 and 1000"

  Scenario: Accept order creation with optional status field provided
    Given I have a valid order creation request with status "RELEASABLE"
    When the order creation validation is executed
    Then the validation should pass
    And the request should proceed to the next middleware

  Scenario: Reject order creation when status has invalid value
    Given I have an order creation request with invalid status "INVALID_STATUS"
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Invalid status value"

  Scenario: Reject order creation when plant is missing
    Given I have an order creation request without plant
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Plant is required"

  Scenario: Reject order creation when plant exceeds maximum length
    Given I have an order creation request with plant exceeding 50 characters
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Plant must not exceed 50 characters"

  Scenario: Reject order creation when scheduled start date is missing
    Given I have an order creation request without scheduled start date
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Scheduled start date is required"

  Scenario: Reject order creation when scheduled start date is invalid format
    Given I have an order creation request with invalid scheduled start date format
      | field                | value          |
      | scheduledStartDate   | 01/15/2024     |
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Scheduled start date must be a valid ISO 8601 date"

  Scenario: Reject order creation when scheduled completion date is missing
    Given I have an order creation request without scheduled completion date
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Scheduled completion date is required"

  Scenario: Reject order creation when scheduled completion date is invalid format
    Given I have an order creation request with invalid scheduled completion date format
      | field                      | value          |
      | scheduledCompletionDate    | 01/20/2024     |
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Scheduled completion date must be a valid ISO 8601 date"

  Scenario: Reject order creation when completion date is before start date
    Given I have an order creation request with completion date before start date
      | field                      | value                |
      | scheduledStartDate         | 2024-01-20T08:00:00Z |
      | scheduledCompletionDate    | 2024-01-15T17:00:00Z |
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Scheduled completion date must be after start date"

  Scenario: Reject order creation when completion date equals start date
    Given I have an order creation request with completion date equal to start date
      | field                      | value                |
      | scheduledStartDate         | 2024-01-15T08:00:00Z |
      | scheduledCompletionDate    | 2024-01-15T08:00:00Z |
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Scheduled completion date must be after start date"

  Scenario: Successfully validate a complete order update request
    Given I have a valid order update request with all fields
      | field                      | value                |
      | orderId                    | 12345                |
      | orderNumber                | ORD-2024-002         |
      | material                   | Aluminum             |
      | quantity                   | 50                   |
      | priority                   | 10                   |
      | status                     | IN_PROGRESS          |
      | plant                      | Plant B              |
      | scheduledStartDate         | 2024-02-01T08:00:00Z |
      | scheduledCompletionDate    | 2024-02-05T17:00:00Z |
    When the order update validation is executed
    Then the validation should pass
    And the request should proceed to the next middleware

  Scenario: Reject order update when order ID is missing
    Given I have an order update request without order ID
    When the order update validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Order ID is required"

  Scenario: Accept order update with only order ID provided
    Given I have an order update request with only order ID "12345"
    When the order update validation is executed
    Then the validation should pass
    And the request should proceed to the next middleware

  Scenario: Reject order update when optional order number is empty string
    Given I have an order update request with empty order number
      | field       | value |
      | orderId     | 12345 |
      | orderNumber |       |
    When the order update validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Order number cannot be empty"

  Scenario: Reject order update when optional material is empty string
    Given I have an order update request with empty material
      | field   | value |
      | orderId | 12345 |
      | material|       |
    When the order update validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Material cannot be empty"

  Scenario: Accept order update with partial fields
    Given I have an order update request with only order number and quantity
      | field       | value        |
      | orderId     | 12345        |
      | orderNumber | ORD-2024-003 |
      | quantity    | 75           |
    When the order update validation is executed
    Then the validation should pass
    And the request should proceed to the next middleware

  Scenario: Reject order update when optional quantity is invalid
    Given I have an order update request with invalid quantity
      | field   | value |
      | orderId | 12345 |
      | quantity| 0     |
    When the order update validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Quantity must be a positive integer"

  Scenario: Reject order update when optional priority is outside valid range
    Given I have an order update request with priority outside valid range
      | field    | value |
      | orderId  | 12345 |
      | priority | 2000  |
    When the order update validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Priority must be between 1 and 1000"

  Scenario: Reject order update when optional status has invalid value
    Given I have an order update request with invalid status
      | field   | value         |
      | orderId | 12345         |
      | status  | UNKNOWN_STATE |
    When the order update validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error message should indicate "Invalid status value"

  Scenario: Validation error response includes field and message information
    Given I have an order creation request with multiple validation errors
      | field    | value |
      | quantity | -10   |
      | priority | 5000  |
    When the order creation validation is executed
    Then the validation should fail
    And I should receive a 400 status code
    And the error response should contain field names
    And the error response should contain descriptive messages

  Scenario: Whitespace is trimmed from string fields during validation
    Given I have an order creation request with whitespace in string fields
      | field       | value                    |
      | orderNumber |