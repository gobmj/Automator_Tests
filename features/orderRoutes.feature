# Auto-generated feature file for backend/src/routes/orderRoutes.js
# Generated on: 2026-05-24T18:44:41.136Z

# Auto-generated feature file for backend/src/routes/orderRoutes.js
# Generated on: 2026-04-25T14:53:09.836Z

Feature: Order Management API Routes
  As an order management system user
  I want to manage orders through various API endpoints
  So that I can create, retrieve, update, and delete orders efficiently

  Background:
    Given the order API is available
    And the system has proper validation middleware configured

  Scenario: Retrieve order statistics
    When I request order statistics
    Then the system should return aggregated order statistics
    And the response should contain order counts by status
    And the response should include total order value

  Scenario: Bulk update order statuses
    Given there are multiple orders in the system
    When I submit a bulk status update request with order IDs and new status
    Then all specified orders should have their status updated
    And the system should return confirmation of updated orders
    And the system should log the bulk update action

  Scenario: Escalate order priority successfully
    Given an order with ID "ORD-12345" exists in the system
    When I request to escalate the priority for order "ORD-12345"
    Then the order priority should be increased
    And the system should return the updated order with new priority
    And the order should be marked as escalated

  Scenario: Escalate order priority with invalid order ID
    When I request to escalate priority for order ID "INVALID-ID"
    Then the system should return a validation error
    And the response status should be 400 Bad Request

  Scenario: Search orders with keywords
    Given the system contains multiple orders with various details
    When I search for orders using keyword "urgent"
    Then the system should return matching orders
    And the results should contain only orders matching the search criteria

  Scenario: Get orders filtered by status
    Given the system contains orders with different statuses
    When I request orders with status "pending"
    Then the system should return only orders with "pending" status
    And the response should include order details for matching orders

  Scenario: Get orders filtered by status with invalid status
    When I request orders with status "invalid_status"
    Then the system should return a validation error
    And the response status should be 400 Bad Request

  Scenario: Create new order successfully
    When I submit a valid order creation request with the following details:
      | field          | value                    |
      | customerId     | CUST-001                 |
      | items          | 2                        |
      | totalAmount    | 150.00                   |
      | shippingAddress| 123 Main St, City, State |
    Then the system should create a new order
    And the response should contain the order ID
    And the response status should be 201 Created

  Scenario: Create order with invalid data
    When I submit an order creation request with missing required fields
    Then the system should return a validation error
    And the response status should be 400 Bad Request

  Scenario: Get all orders with pagination
    Given the system contains multiple orders
    When I request all orders with page number 1 and limit 10
    Then the system should return paginated order results
    And the response should include pagination metadata
    And the response should contain up to 10 orders

  Scenario: Get all orders with filtering
    Given the system contains orders with various attributes
    When I request all orders with filters applied
    Then the system should return filtered order results
    And the results should match the applied filter criteria

  Scenario: Get order by ID successfully
    Given an order with ID "ORD-12345" exists in the system
    When I request the order with ID "ORD-12345"
    Then the system should return the order details
    And the response should contain all order information
    And the response status should be 200 OK

  Scenario: Get order by ID with non-existent order
    When I request the order with ID "ORD-99999"
    Then the system should return a not found error
    And the response status should be 404 Not Found

  Scenario: Get order by ID with invalid format
    When I request the order with ID "INVALID"
    Then the system should return a validation error
    And the response status should be 400 Bad Request

  Scenario: Update order successfully
    Given an order with ID "ORD-12345" exists in the system
    When I submit an update request for order "ORD-12345" with the following changes:
      | field  | value   |
      | status | shipped |
    Then the system should update the order
    And the response should contain the updated order details
    And the response status should be 200 OK

  Scenario: Update order with invalid data
    Given an order with ID "ORD-12345" exists in the system
    When I submit an update request for order "ORD-12345" with invalid data
    Then the system should return a validation error
    And the response status should be 400 Bad Request

  Scenario: Delete order successfully
    Given an order with ID "ORD-12345" exists in the system
    When I request to delete the order with ID "ORD-12345"
    Then the system should delete the order
    And the response status should be 204 No Content
    And the order should no longer exist in the system

  Scenario: Delete order with invalid order ID
    When I request to delete the order with ID "INVALID-ID"
    Then the system should return a validation error
    And the response status should be 400 Bad Request

  Scenario: Release order successfully
    Given an order with ID "ORD-12345" exists in the system
    When I request to release the order with ID "ORD-12345"
    Then the system should release the order
    And the order status should be updated to released
    And the response should contain the updated order details

  Scenario: Release order with invalid order ID
    When I request to release the order with ID "INVALID-ID"
    Then the system should return a validation error
    And the response status should be 400 Bad Request