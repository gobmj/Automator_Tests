# Auto-generated feature file for backend/src/services/analyticsService.js
# Generated on: 2026-05-28T10:32:20.612Z

# Auto-generated feature file for backend/src/services/analyticsService.js
# Generated on: 2026-05-28T08:59:26.830Z

Feature: Order Analytics Dashboard
  As a business analyst
  I want to retrieve comprehensive analytics and insights about orders
  So that I can make data-driven decisions about order management and plant performance

  Background:
    Given the analytics service is available
    And the database contains order records

  Scenario: Retrieve dashboard analytics without date filters
    When I request dashboard analytics without any date range
    Then I should receive analytics data containing:
      | field                | type   |
      | totalOrders          | number |
      | statusBreakdown      | object |
      | plantPerformance     | array  |
      | topMaterials         | array  |
      | priorityDistribution | array  |

  Scenario: Retrieve dashboard analytics with start date only
    Given the current date is "2024-01-15"
    When I request dashboard analytics with start date "2024-01-01"
    Then I should receive analytics data filtered from "2024-01-01" onwards
    And the results should only include orders created on or after "2024-01-01"

  Scenario: Retrieve dashboard analytics with end date only
    Given the current date is "2024-01-15"
    When I request dashboard analytics with end date "2024-01-31"
    Then I should receive analytics data filtered up to "2024-01-31"
    And the results should only include orders created on or before "2024-01-31"

  Scenario: Retrieve dashboard analytics with date range
    Given the current date is "2024-01-15"
    When I request dashboard analytics with start date "2024-01-01" and end date "2024-01-31"
    Then I should receive analytics data for the specified date range
    And the results should only include orders created between "2024-01-01" and "2024-01-31"

  Scenario: Status breakdown shows all order statuses
    Given the database contains orders with the following statuses:
      | status      |
      | pending     |
      | processing  |
      | completed   |
      | cancelled   |
      | on-hold     |
    When I request dashboard analytics
    Then the statusBreakdown should contain counts for each status
    And each status count should be a positive integer

  Scenario: Plant performance metrics are calculated correctly
    Given the database contains orders from multiple plants:
      | plant   | quantity | priority |
      | Plant-A | 100      | 250      |
      | Plant-A | 50       | 300      |
      | Plant-B | 200      | 150      |
      | Plant-C | 75       | 500      |
    When I request dashboard analytics
    Then the plantPerformance array should include:
      | field         | type   |
      | plant         | string |
      | orderCount    | number |
      | totalQuantity | number |
      | avgPriority   | string |
    And Plant-A should have orderCount of 2
    And Plant-A should have totalQuantity of 150
    And Plant-A should have avgPriority as a decimal value

  Scenario: Top materials are ranked by order count
    Given the database contains orders with the following materials:
      | material | orderCount |
      | Steel    | 45         |
      | Aluminum | 38         |
      | Copper   | 32         |
      | Brass     | 28         |
      | Titanium | 25         |
      | Iron     | 22         |
      | Nickel   | 18         |
      | Zinc     | 15         |
      | Lead     | 12         |
      | Tin      | 8          |
      | Bronze   | 5          |
    When I request dashboard analytics
    Then the topMaterials array should contain a maximum of 10 items
    And topMaterials should be ordered by orderCount in descending order
    And each material entry should include:
      | field         | type   |
      | material      | string |
      | orderCount    | number |
      | totalQuantity | number |

  Scenario: Priority distribution is calculated across all ranges
    Given the database contains orders with priorities distributed across ranges
    When I request dashboard analytics
    Then the priorityDistribution array should contain 5 priority ranges:
      | label                    |
      | Critical (1-200)         |
      | High (201-400)           |
      | Medium (401-600)         |
      | Low (601-800)            |
      | Very Low (801-1000)      |
    And each priority range should include a count of orders within that range

  Scenario: Dashboard analytics handles empty database gracefully
    Given the database contains no orders
    When I request dashboard analytics
    Then I should receive analytics data with:
      | field                | value |
      | totalOrders          | 0     |
      | statusBreakdown      | {}    |
      | plantPerformance     | []    |
      | topMaterials         | []    |
      | priorityDistribution | []    |

  Scenario: Dashboard analytics with invalid date format
    When I request dashboard analytics with start date "invalid-date"
    Then the system should handle the date parsing error appropriately

  Scenario: Dashboard analytics with end date before start date
    When I request dashboard analytics with start date "2024-01-31" and end date "2024-01-01"
    Then I should receive analytics data with no results
    Or the system should return an error indicating invalid date range

  Scenario Outline: Dashboard analytics with various date range combinations
    Given the current date is "<currentDate>"
    When I request dashboard analytics with start date "<startDate>" and end date "<endDate>"
    Then the results should be filtered according to the date range
    And totalOrders should reflect orders within the specified range

    Examples:
      | currentDate | startDate  | endDate    |
      | 2024-06-15  | 2024-01-01 | 2024-06-15 |
      | 2024-06-15  | 2024-06-01 | 2024-06-15 |
      | 2024-06-15  | 2024-06-15 | 2024-06-15 |
      | 2024-06-15  | 2024-05-01 | 2024-05-31 |

  Scenario: Plant performance includes zero-quantity orders
    Given the database contains orders with zero quantities
    When I request dashboard analytics
    Then totalQuantity for affected plants should correctly sum to zero or positive values
    And orderCount should still reflect all orders regardless of quantity

  Scenario: Material analysis limits results to top 10 materials
    Given the database contains orders for 50 different materials
    When I request dashboard analytics
    Then the topMaterials array should contain exactly 10 items
    And the materials should be the top 10 by order count

  Scenario: Dashboard analytics response structure is consistent
    When I request dashboard analytics
    Then the response should be a valid JSON object
    And all numeric fields should be properly typed as numbers
    And all array fields should be properly typed as arrays
    And all object fields should be properly typed as objects