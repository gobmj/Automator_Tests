# Auto-generated feature file for frontend/src/services/orderService.js
# Generated on: 2026-05-24T18:46:19.855Z

# Auto-generated feature file for frontend/src/services/orderService.js
# Generated on: 2026-05-24T18:44:50.517Z

Feature: Order Service API Integration
  As a frontend application user
  I want to interact with the order management API
  So that I can manage orders efficiently through the service layer

  Background:
    Given the order service is initialized
    And the API base URL is configured
    And the axios client is ready with JSON content type headers

  Scenario: Create a new order successfully
    Given I have valid order data
      | field        | value              |
      | status       | RELEASABLE         |
      | plant        | Plant-A            |
      | quantity     | 100                |
      | material     | MAT-001            |
    When I create a new order
    Then the order should be created successfully
    And the response should contain the created order details
    And the order should have a unique orderId

  Scenario: Retrieve all orders with default parameters
    Given there are 15 orders in the system
    When I retrieve all orders without specifying parameters
    Then I should receive all orders
    And the response should contain order list data

  Scenario Outline: Retrieve all orders with custom pagination and filters
    Given there are <total_orders> orders in the system
    When I retrieve all orders with the following parameters
      | parameter | value      |
      | page      | <page>     |
      | limit     | <limit>    |
      | status    | <status>   |
    Then I should receive <expected_count> orders
    And the response should contain paginated order data

    Examples:
      | total_orders | page | limit | status     | expected_count |
      | 25           | 1    | 10    | RELEASABLE | 10             |
      | 25           | 2    | 10    | RELEASABLE | 10             |
      | 25           | 3    | 10    | RELEASABLE | 5              |
      | 50           | 1    | 20    | PENDING    | 20             |

  Scenario: Retrieve a specific order by ID
    Given an order with ID "ORD-12345" exists in the system
    When I retrieve the order by its ID
    Then the order details should be returned successfully
    And the response should contain the correct order information
    And the order ID should match "ORD-12345"

  Scenario: Retrieve a non-existent order by ID
    Given no order exists with ID "ORD-99999"
    When I attempt to retrieve the order by ID "ORD-99999"
    Then an error should be returned
    And the error should indicate the order was not found

  Scenario: Update an existing order
    Given an order with ID "ORD-12345" exists in the system
    And the order has the following data
      | field    | value      |
      | status   | RELEASABLE |
      | quantity | 100        |
    When I update the order with the following data
      | field    | value      |
      | status   | RELEASED   |
      | quantity | 150        |
    Then the order should be updated successfully
    And the response should contain the updated order details

  Scenario: Delete an existing order
    Given an order with ID "ORD-12345" exists in the system
    When I delete the order
    Then the order should be deleted successfully
    And the response should confirm the deletion

  Scenario: Delete a non-existent order
    Given no order exists with ID "ORD-99999"
    When I attempt to delete the order with ID "ORD-99999"
    Then an error should be returned
    And the error should indicate the order was not found

  Scenario: Release an order
    Given an order with ID "ORD-12345" exists in the system
    And the order has status "RELEASABLE"
    When I release the order
    Then the order should be released successfully
    And the response should contain the released order details
    And the order status should be updated

  Scenario: Attempt to release an already released order
    Given an order with ID "ORD-12345" exists in the system
    And the order has status "RELEASED"
    When I attempt to release the order
    Then an error should be returned
    And the error should indicate the order cannot be released

  Scenario Outline: Retrieve orders by status
    Given there are <total_orders> orders in the system
    And <count_with_status> orders have status "<status>"
    When I retrieve orders with status "<status>"
    Then I should receive <count_with_status> orders
    And all returned orders should have status "<status>"

    Examples:
      | total_orders | status     | count_with_status |
      | 25           | RELEASABLE | 10                |
      | 25           | RELEASED   | 8                 |
      | 25           | PENDING    | 7                 |
      | 50           | CANCELLED  | 5                 |

  Scenario: Retrieve orders by status with no results
    Given there are 25 orders in the system
    And no orders have status "ARCHIVED"
    When I retrieve orders with status "ARCHIVED"
    Then I should receive an empty list
    And the response should indicate no orders found

  Scenario Outline: Search orders by search term
    Given there are multiple orders in the system
    And an order exists with material "<material>"
    When I search for orders with search term "<search_term>"
    Then the search results should include the order with material "<material>"
    And the response should contain matching order data

    Examples:
      | search_term | material   |
      | MAT-001     | MAT-001    |
      | Plant-A     | MAT-001    |
      | ORD-12345   | MAT-001    |

  Scenario: Search orders with no matching results
    Given there are multiple orders in the system
    When I search for orders with search term "NONEXISTENT-TERM"
    Then I should receive an empty list
    And the response should indicate no orders found

  Scenario: Handle API connection error
    Given the API service is unavailable
    When I attempt to retrieve all orders
    Then an error should be returned
    And the error should indicate a connection failure

  Scenario: Handle invalid order data during creation
    Given I have invalid order data
      | field    | value |
      | quantity | -100  |
    When I attempt to create a new order
    Then an error should be returned
    And the error should indicate validation failure