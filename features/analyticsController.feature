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

  Scenario: Handle missing start date parameter gracefully
    When I request dashboard analytics with only endDate parameter:
      | Parameter | Value      |
      | endDate   | 2024-01-31 |
    Then the response status should be 200
    And the response should contain success flag set to true
    And the response should contain analytics data

  Scenario: Handle missing end date parameter gracefully
    When I request dashboard analytics with only startDate parameter:
      | Parameter | Value      |
      | startDate | 2024-01-01 |
    Then the response status should be 200
    And the response should contain success flag set to true
    And the response should contain analytics data

  Scenario: Handle invalid start date format
    When I request dashboard analytics with the following parameters:
      | Parameter | Value           |
      | startDate | invalid-date    |
      | endDate   | 2024-01-31      |
    Then the error should be handled by the error middleware
    And an appropriate error response should be returned

  Scenario: Handle invalid end date format
    When I request dashboard analytics with the following parameters:
      | Parameter | Value           |
      | startDate | 2024-01-01      |
      | endDate   | not-a-date      |
    Then the error should be handled by the error middleware
    And an appropriate error response should be returned

  Scenario: Handle service layer errors gracefully
    Given the analytics service throws an error
    When I request dashboard analytics
    Then the error should be passed to the error middleware
    And the client should receive an error response

  Scenario: Verify response structure for dashboard analytics
    When I request dashboard analytics
    Then the response should be valid JSON
    And the response should contain a "success" field
    And the response should contain a "data" field
    And the "data" field should contain analytics metrics

  Scenario: Handle concurrent requests for dashboard analytics
    When I make 5 concurrent requests for dashboard analytics
    Then all requests should return status 200
    And all responses should contain valid analytics data
    And all responses should have success flag set to true