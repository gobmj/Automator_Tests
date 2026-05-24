# Auto-generated feature file for backend/src/controllers/orderController.js
# Generated on: 2026-05-24T18:44:04.388Z

# Auto-generated feature file for backend/src/controllers/orderController.js
# Generated on: 2026-04-25T14:53:00.588Z

Feature: Order Management API
  As an order management system user
  I want to manage orders through API endpoints
  So that I can create, retrieve, update, and delete orders efficiently

  Background:
    Given the Order API is available
    And the system is ready to process requests

  Scenario: Create a new order successfully
    Given I have valid order data
      | field          | value                    |
      | customerId     | CUST-001                 |
      | plantId        | PLANT-A                  |
      | quantity       | 100                      |
      | status         | pending                  |
    When I send a POST request to "/api/orders" with the order data
    Then the response status code should be 201
    And the response should contain success flag as true
    And the response should contain message "Order created successfully"
    And the response should contain the created order data
    And the order should have an assigned order ID

  Scenario: Create order with invalid data
    Given I have invalid order data
      | field          | value                    |
      | customerId     |                          |
      | quantity       | -50                      |
    When I send a POST request to "/api/orders" with the order data
    Then the response status code should be 400
    And the response should contain an error message

  Scenario: Retrieve all orders without filters
    Given there are existing orders in the system
      | orderId    | customerId | status    | plant    |
      | ORD-001    | CUST-001   | pending   | PLANT-A  |
      | ORD-002    | CUST-002   | completed | PLANT-B  |
      | ORD-003    | CUST-001   | pending   | PLANT-A  |
    When I send a GET request to "/api/orders"
    Then the response status code should be 200
    And the response should contain success flag as true
    And the response should contain a list of orders
    And the response should contain pagination information

  Scenario Outline: Retrieve orders with pagination
    Given there are 50 existing orders in the system
    When I send a GET request to "/api/orders" with query parameters
      | parameter | value   |
      | page      | <page>  |
      | limit     | <limit> |
    Then the response status code should be 200
    And the response should contain success flag as true
    And the response should contain <limit> orders or fewer
    And the pagination should show page <page>

    Examples:
      | page | limit |
      | 1    | 10    |
      | 2    | 10    |
      | 1    | 25    |

  Scenario Outline: Retrieve orders with status filter
    Given there are existing orders with different statuses in the system
      | status    |
      | pending   |
      | completed |
      | cancelled |
    When I send a GET request to "/api/orders" with query parameters
      | parameter | value     |
      | status    | <status>  |
    Then the response status code should be 200
    And the response should contain only orders with status "<status>"

    Examples:
      | status    |
      | pending   |
      | completed |
      | cancelled |

  Scenario: Retrieve orders filtered by plant
    Given there are existing orders from multiple plants in the system
      | orderId | plant   |
      | ORD-001 | PLANT-A |
      | ORD-002 | PLANT-B |
      | ORD-003 | PLANT-A |
    When I send a GET request to "/api/orders" with query parameters
      | parameter | value   |
      | plant     | PLANT-A |
    Then the response status code should be 200
    And the response should contain only orders from plant "PLANT-A"

  Scenario Outline: Retrieve orders with sorting
    Given there are existing orders in the system
    When I send a GET request to "/api/orders" with query parameters
      | parameter  | value        |
      | sortBy     | <sortBy>     |
      | sortOrder  | <sortOrder>  |
    Then the response status code should be 200
    And the orders should be sorted by "<sortBy>" in "<sortOrder>" order

    Examples:
      | sortBy     | sortOrder |
      | createdAt  | asc       |
      | createdAt  | desc      |
      | status     | asc       |

  Scenario: Retrieve a specific order by ID successfully
    Given there is an existing order with ID "ORD-001"
    When I send a GET request to "/api/orders/ORD-001"
    Then the response status code should be 200
    And the response should contain success flag as true
    And the response should contain the order data with ID "ORD-001"

  Scenario: Retrieve a non-existent order by ID
    Given there is no order with ID "ORD-999"
    When I send a GET request to "/api/orders/ORD-999"
    Then the response status code should be 404
    And the response should contain success flag as false
    And the response should contain error message "Order not found"

  Scenario: Update an existing order successfully
    Given there is an existing order with ID "ORD-001"
    And the order has the following data
      | field      | value      |
      | status     | pending    |
      | quantity   | 100        |
    When I send a PUT request to "/api/orders/ORD-001" with updated data
      | field      | value      |
      | status     | processing |
      | quantity   | 95         |
    Then the response status code should be 200
    And the response should contain success flag as true
    And the response should contain message "Order updated successfully"
    And the response should contain the updated order data
    And the order status should be "processing"
    And the order quantity should be 95

  Scenario: Update a non-existent order
    Given there is no order with ID "ORD-999"
    When I send a PUT request to "/api/orders/ORD-999" with updated data
      | field  | value      |
      | status | processing |
    Then the response status code should be 404
    And the response should contain success flag as false
    And the response should contain error message "Order not found"

  Scenario: Update order with invalid data
    Given there is an existing order with ID "ORD-001"
    When I send a PUT request to "/api/orders/ORD-001" with invalid data
      | field    | value |
      | quantity | -50   |
    Then the response status code should be 400
    And the response should contain an error message

  Scenario: Delete an existing order successfully
    Given there is an existing order with ID "ORD-001"
    When I send a DELETE request to "/api/orders/ORD-001"
    Then the response status code should be 200
    And the response should contain success flag as true
    And the response should contain message "Order deleted successfully"
    And the order with ID "ORD-001" should no longer exist

  Scenario: Delete a non-existent order
    Given there is no order with ID "ORD-999"
    When I send a DELETE request to "/api/orders/ORD-999"
    Then the response status code should be 404
    And the response should contain success flag as false
    And the response should contain error message "Order not found"

  Scenario: Release an existing order successfully
    Given there is an existing order with ID "ORD-001"
    And the order has status "pending"
    When I send a POST request to "/api/orders/ORD-001/release"
    Then the response status code should be 200
    And the response should contain success flag as true
    And the response should contain message "Order released successfully"
    And the response should contain the released order data
    And the order status should be updated to reflect the release

  Scenario: Release a non-existent order
    Given there is no order with ID "ORD-999"
    When I send a POST request to "/api/orders/ORD-999/release"
    Then the response status code should be 404
    And the response should contain success flag as false
    And the response should contain error message "Order not found"

  Scenario: Handle server errors gracefully
    Given the order service encounters an unexpected error
    When I send a GET request to "/api/orders"
    Then the response status code should be 500
    And the response should contain an error message