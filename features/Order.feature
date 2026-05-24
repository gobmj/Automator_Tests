# Auto-generated feature file for backend/src/models/Order.js
# Generated on: 2026-05-24T18:44:33.884Z

Feature: Manufacturing Order Management
  As a manufacturing operations manager
  I want to create and manage manufacturing orders
  So that I can track production schedules and order status

  Background:
    Given the order system is initialized
    And the database is ready to store orders

  Scenario: Create a new order with valid details
    When I create an order with the following details:
      | Field                      | Value                |
      | orderId                    | ORD-2024-001         |
      | orderNumber                | PO-12345             |
      | material                   | STEEL-A1             |
      | quantity                   | 100                  |
      | priority                   | 500                  |
      | plant                      | PLANT-01             |
      | scheduledStartDate         | 2024-02-01T08:00:00  |
      | scheduledCompletionDate    | 2024-02-05T17:00:00  |
    Then the order should be created successfully
    And the order status should be "CREATED"
    And the order should have a unique orderId "ORD-2024-001"

  Scenario: Order is assigned default values on creation
    When I create an order with minimal required details:
      | Field                      | Value                |
      | orderId                    | ORD-2024-002         |
      | orderNumber                | PO-12346             |
      | material                   | STEEL-A2             |
      | quantity                   | 50                   |
      | plant                      | PLANT-02             |
      | scheduledStartDate         | 2024-02-10T08:00:00  |
      | scheduledCompletionDate    | 2024-02-12T17:00:00  |
    Then the order priority should default to 500
    And the order status should default to "CREATED"
    And the order should have a creation timestamp

  Scenario: Reject order with duplicate orderId
    Given an order with orderId "ORD-2024-001" already exists
    When I attempt to create another order with orderId "ORD-2024-001"
    Then the order creation should fail
    And an error message should indicate the orderId is not unique

  Scenario: Reject order with invalid quantity
    When I attempt to create an order with quantity 0
    Then the order creation should fail
    And an error message should indicate quantity must be at least 1

  Scenario: Reject order with negative quantity
    When I attempt to create an order with quantity -5
    Then the order creation should fail
    And an error message should indicate quantity must be at least 1

  Scenario: Reject order with priority outside valid range
    When I attempt to create an order with priority 0
    Then the order creation should fail
    And an error message should indicate priority must be between 1 and 1000

  Scenario: Reject order with priority exceeding maximum
    When I attempt to create an order with priority 1001
    Then the order creation should fail
    And an error message should indicate priority must be between 1 and 1000

  Scenario: Reject order when start date is after completion date
    When I attempt to create an order with the following dates:
      | Field                      | Value                |
      | scheduledStartDate         | 2024-02-10T08:00:00  |
      | scheduledCompletionDate    | 2024-02-05T17:00:00  |
    Then the order creation should fail
    And an error message should state "Scheduled start date must be before completion date"

  Scenario: Reject order when start date equals completion date
    When I attempt to create an order with the following dates:
      | Field                      | Value                |
      | scheduledStartDate         | 2024-02-05T08:00:00  |
      | scheduledCompletionDate    | 2024-02-05T08:00:00  |
    Then the order creation should fail
    And an error message should state "Scheduled start date must be before completion date"

  Scenario: Reject order with missing required fields
    When I attempt to create an order without the following fields:
      | Field          |
      | orderId        |
      | orderNumber    |
      | material       |
      | quantity       |
      | plant          |
    Then the order creation should fail
    And an error message should indicate required fields are missing

  Scenario: Order supports all valid status values
    When I create an order with status "CREATED"
    Then the order status should be "CREATED"
    When I update the order status to "RELEASABLE"
    Then the order status should be "RELEASABLE"
    When I update the order status to "RELEASED"
    Then the order status should be "RELEASED"
    When I update the order status to "IN_PROGRESS"
    Then the order status should be "IN_PROGRESS"
    When I update the order status to "COMPLETED"
    Then the order status should be "COMPLETED"

  Scenario: Order maintains audit timestamps
    When I create an order with the following details:
      | Field                      | Value                |
      | orderId                    | ORD-2024-003         |
      | orderNumber                | PO-12347             |
      | material                   | STEEL-A3             |
      | quantity                   | 75                   |
      | plant                      | PLANT-03             |
      | scheduledStartDate         | 2024-02-15T08:00:00  |
      | scheduledCompletionDate    | 2024-02-18T17:00:00  |
    Then the order should have a created_date timestamp
    And the order should have an updated_at timestamp
    When I update the order priority to 600
    Then the updated_at timestamp should be more recent than created_date

  Scenario: Orders can be queried by status
    Given the following orders exist:
      | orderId      | status        | plant     |
      | ORD-2024-004 | CREATED       | PLANT-01  |
      | ORD-2024-005 | IN_PROGRESS   | PLANT-01  |
      | ORD-2024-006 | COMPLETED     | PLANT-02  |
    When I query orders with status "IN_PROGRESS"
    Then I should retrieve 1 order
    And the order orderId should be "ORD-2024-005"

  Scenario: Orders can be queried by plant
    Given the following orders exist:
      | orderId      | status        | plant     |
      | ORD-2024-007 | CREATED       | PLANT-01  |
      | ORD-2024-008 | CREATED       | PLANT-01  |
      | ORD-2024-009 | CREATED       | PLANT-02  |
    When I query orders for plant "PLANT-01"
    Then I should retrieve 2 orders
    And all orders should belong to plant "PLANT-01"

  Scenario: Order fields are properly mapped to database columns
    When I create an order with orderId "ORD-2024-010"
    Then the database column "order_id" should contain "ORD-2024-010"
    And the database column "order_number" should be populated
    And the database column "created_date" should contain the creation timestamp
    And the database column "scheduled_start_date" should be populated
    And the database column "scheduled_completion_date" should be populated