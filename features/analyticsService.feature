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
      | status      | count |
      | pending     | 15    |
      | processing  | 25    |
      | completed   | 40    |
      | cancelled   | 5     |
    When I request dashboard analytics
    Then the status breakdown should contain:
      | status      | count |
      | pending     | 15    |
      | processing  | 25    |
      | completed   | 40    |
      | cancelled   | 5     |

  Scenario: Plant performance metrics are calculated correctly
    Given the database contains orders from multiple plants:
      | plant | orderCount | totalQuantity | avgPriority |
      | PlantA| 50         | 1500          | 450.50      |
      | PlantB| 35         | 1200          | 520.75      |
      | PlantC| 20         | 800           | 380.25      |
    When I request dashboard analytics
    Then the plant performance data should include:
      | plant | orderCount | totalQuantity | avgPriority |
      | PlantA| 50         | 1500          | 450.50      |
      | PlantB| 35         | 1200          | 520.75      |
      | PlantC| 20         | 800           | 380.25      |

  Scenario: Top 10 materials are returned in order of frequency
    Given the database contains orders for multiple materials
    And there are more than 10 distinct materials in the database
    When I request dashboard analytics
    Then I should receive the top 10 materials by order count
    And the materials should be sorted in descending order by frequency

  Scenario: Material analysis includes order count and total quantity
    Given the database contains orders for the following materials:
      | material | orderCount | totalQuantity |
      | Steel    | 45         | 2250          |
      | Aluminum | 32         | 1600          |
      | Copper   | 28         | 1400          |
    When I request dashboard analytics
    Then the top materials should include:
      | material | orderCount | totalQuantity |
      | Steel    | 45         | 2250          |
      | Aluminum | 32         | 1600          |
      | Copper   | 28         | 1400          |

  Scenario: Priority distribution is calculated across all priority ranges
    Given the database contains orders with priorities distributed as follows:
      | priority_range         | count |
      | Critical (1-200)       | 50    |
      | High (201-400)         | 75    |
      | Medium (401-600)       | 100   |
      | Low (601-800)          | 60    |
      | Very Low (801-1000)    | 40    |
    When I request dashboard analytics
    Then the priority distribution should show:
      | label                  | count |
      | Critical (1-200)       | 50    |
      | High (201-400)         | 75    |
      | Medium (401-600)       | 100   |
      | Low (601-800)          | 60    |
      | Very Low (801-1000)    | 40    |

  Scenario: Total orders count is accurate
    Given the database contains exactly 325 orders
    When I request dashboard analytics
    Then the total orders count should be 325

  Scenario: Analytics with empty database
    Given the database contains no orders
    When I request dashboard analytics
    Then I should receive analytics data with:
      | field       | value |
      | totalOrders | 0     |
    And status breakdown should be empty
    And plant performance should be empty
    And top materials should be empty

  Scenario: Plant performance handles null quantity values
    Given the database contains orders with some null quantity values
    When I request dashboard analytics
    Then the plant performance total quantity should default null values to 0
    And the calculation should not fail

  Scenario: Plant performance handles null priority values
    Given the database contains orders with some null priority values
    When I request dashboard analytics
    Then the plant performance average priority should default null values to 0
    And the average priority should be formatted to 2 decimal places

  Scenario: Material analysis handles null quantity values
    Given the database contains materials with some null quantity values
    When I request dashboard analytics
    Then the material total quantity should default null values to 0
    And the calculation should not fail

  Scenario: Analytics response includes properly formatted numeric values
    When I request dashboard analytics
    Then all numeric values in the response should be properly formatted:
      | field            | format          |
      | orderCount       | integer         |
      | totalQuantity    | integer         |
      | avgPriority      | 2 decimal places|
      | count            | integer         |

  Scenario: Analytics handles invalid date format gracefully
    When I request dashboard analytics with start date "invalid-date"
    Then the system should either:
      | option                                    |
      | return an error response                  |
      | treat the invalid date as no date filter  |

  Scenario: Analytics with future date range
    Given the current date is "2024-01-15"
    When I request dashboard analytics with start date "2025-01-01" and end date "2025-12-31"
    Then I should receive analytics data with:
      | field       | value |
      | totalOrders | 0     |

  Scenario: Analytics performance with large date range
    Given the database contains 100000 orders spanning 5 years
    When I request dashboard analytics with a 5-year date range
    Then the response should be returned within acceptable time limits
    And all calculations should be accurate

  Scenario: Multiple concurrent analytics requests
    When I make 5 concurrent requests for dashboard analytics
    Then all requests should complete successfully
    And each response should contain consistent data

  Scenario Outline: Analytics with various date combinations
    When I request dashboard analytics with:
      | startDate   | endDate     |
      | <startDate> | <endDate>   |
    Then I should receive valid analytics data
    And the data should be filtered according to the provided dates

    Examples:
      | startDate  | endDate    |
      | 2024-01-01 | 2024-01-31 |
      | 2024-01-01 |            |
      |            | 2024-01-31 |
      |            |            |
      | 2024-06-15 | 2024-12-31 |