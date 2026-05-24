# Auto-generated feature file for backend/src/utils/idGenerator.js
# Generated on: 2026-05-24T18:44:55.620Z

Feature: Order ID Generation
  As a system administrator
  I want to generate unique order identifiers
  So that each order can be tracked and identified uniquely

  Background:
    Given the order ID generation system is available

  Scenario: Generate a standard order ID with default format
    When I request a new order ID
    Then the order ID should follow the format "ORD-YYYY-NNNN"
    And the year in the order ID should be the current year
    And the numeric suffix should be a 4-digit number

  Scenario: Generate multiple standard order IDs with unique values
    When I request 5 new order IDs
    Then all order IDs should have the format "ORD-YYYY-NNNN"
    And all order IDs should be unique
    And each order ID should contain the current year

  Scenario: Standard order ID numeric suffix is properly padded
    When I request a new order ID
    Then the numeric suffix should always be 4 digits
    And the numeric suffix should be zero-padded if less than 4 digits

  Scenario: Generate order ID with custom prefix
    When I request a new order ID with prefix "CUST"
    Then the order ID should follow the format "CUST-YYYY-NNNNNN"
    And the prefix should be "CUST"
    And the year in the order ID should be the current year

  Scenario: Generate order ID with default prefix when none specified
    When I request a new order ID with an empty prefix
    Then the order ID should use "ORD" as the default prefix
    And the order ID should follow the format "ORD-YYYY-NNNNNN"

  Scenario Outline: Generate order IDs with various custom prefixes
    When I request a new order ID with prefix "<prefix>"
    Then the order ID should start with "<prefix>"
    And the order ID should contain the current year
    And the order ID should be properly formatted

    Examples:
      | prefix |
      | CUST   |
      | INV    |
      | PO     |
      | TEMP   |

  Scenario: Custom prefix order ID uses timestamp-based suffix
    When I request a new order ID with prefix "TEST"
    Then the order ID should follow the format "TEST-YYYY-NNNNNN"
    And the numeric suffix should be 6 digits derived from timestamp

  Scenario: Multiple custom prefix order IDs are unique
    When I request 10 new order IDs with prefix "BULK"
    Then all order IDs should be unique
    And all order IDs should start with "BULK"
    And all order IDs should contain the current year

  Scenario: Order ID contains valid year value
    When I request a new order ID
    Then the year component should be a valid 4-digit year
    And the year should be greater than or equal to 2000
    And the year should be less than or equal to 2099

  Scenario: Standard order ID numeric range is valid
    When I request a new order ID
    Then the numeric suffix should be between 0000 and 9999
    And the numeric suffix should be a valid integer

  Scenario: Custom prefix order ID numeric range is valid
    When I request a new order ID with prefix "ORD"
    Then the numeric suffix should be between 000000 and 999999
    And the numeric suffix should be a valid integer