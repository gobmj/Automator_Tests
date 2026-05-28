# Auto-generated feature file for backend/src/controllers/analyticsController.js
# Generated on: 2026-05-28T10:35:35.442Z

# Auto-generated feature file for backend/src/controllers/analyticsController.js
# Generated on: 2026-05-28T08:59:10.013Z

Feature: Analytics Dashboard API
  As a dashboard user
  I want to retrieve comprehensive analytics data
  So that I can view performance metrics and insights

  Background:
    Given the analytics service is available
    And the database contains analytics records

  Scenario: Successfully retrieve dashboard analytics with default parameters
    When I request dashboard analytics without date filters
    Then the response status should be 200
    And the response should contain success flag set to true
    And the response should contain analytics data
    And the analytics data should include all available metrics

  Scenario: Successfully retrieve dashboard analytics with date range filter
    When I request dashboard analytics with the following parameters:
      | Parameter | Value      |
      | startDate | 2024-01-01 |
      | endDate   | 2024-01-31 |
    Then the response status should be 200
    And the response should contain success flag set to true
    And the response should contain analytics data filtered by date range
    And the returned data should only include records between 2024-01-01 and 2024-01-31

  Scenario Outline: Retrieve dashboard analytics with various date ranges
    When I request dashboard analytics with the following parameters:
      | Parameter | Value         |
      | startDate | <startDate>   |
      | endDate   | <endDate>     |
    Then the response status should be 200
    And the response should contain success flag set to true
    And the response should contain analytics data

    Examples:
      | startDate  | endDate    |
      | 2024-01-01 | 2024-01-31 |
      | 2024-02-01 | 2024-02-29 |
      | 2023-12-01 | 2024-12-31 |
      | 2024-01-15 | 2024-01-20 |

  Scenario: Retrieve dashboard analytics with only start date parameter
    When I request dashboard analytics with only startDate parameter:
      | Parameter | Value      |
      | startDate | 2024-01-01 |
    Then the response status should be 200
    And the response should contain success flag set to true
    And the response should contain analytics data

  Scenario: Retrieve dashboard analytics with only end date parameter
    When I request dashboard analytics with only endDate parameter:
      | Parameter | Value      |
      | endDate   | 2024-01-31 |
    Then the response status should be 200
    And the response should contain success flag set to true
    And the response should contain analytics data

  Scenario: Handle analytics service errors gracefully
    Given the analytics service encounters an error
    When I request dashboard analytics without date filters
    Then the error should be passed to the error handler
    And the response should contain appropriate error information

  Scenario: Return properly formatted JSON response
    When I request dashboard analytics without date filters
    Then the response should be valid JSON
    And the response should have a success property
    And the response should have a data property containing analytics information