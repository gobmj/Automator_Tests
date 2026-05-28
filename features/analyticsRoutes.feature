# Auto-generated feature file for backend/src/routes/analyticsRoutes.js
# Generated on: 2026-05-28T08:59:15.191Z

Feature: Analytics Dashboard
  As a user
  I want to access analytics dashboard data
  So that I can view key metrics and insights about system performance

  Background:
    Given the analytics service is available
    And the database contains analytics data

  Scenario: Successfully retrieve dashboard analytics
    When I request the dashboard analytics
    Then the response status should be 200
    And the response should contain dashboard metrics
    And the response should include the following fields:
      | field              |
      | totalUsers         |
      | activeUsers        |
      | totalTransactions  |
      | revenue            |
      | conversionRate     |
      | topProducts        |
      | userGrowth         |
      | systemHealth       |

  Scenario: Dashboard analytics returns properly formatted data
    When I request the dashboard analytics
    Then the response should be valid JSON
    And the response should contain an object with metrics
    And all numeric fields should be numbers
    And all date fields should be in ISO 8601 format

  Scenario: Dashboard analytics includes time-based metrics
    When I request the dashboard analytics
    Then the response should include metrics for the following periods:
      | period      |
      | today       |
      | thisWeek    |
      | thisMonth   |
      | thisYear    |
      | allTime     |

  Scenario: Dashboard analytics handles empty data gracefully
    Given the database contains no analytics data
    When I request the dashboard analytics
    Then the response status should be 200
    And the response should contain default empty metrics
    And all metric values should be zero or empty arrays

  Scenario: Dashboard endpoint returns error when service is unavailable
    Given the analytics service is unavailable
    When I request the dashboard analytics
    Then the response status should be 503
    And the response should contain an error message
    And the error message should indicate service unavailability

  Scenario: Dashboard endpoint returns error with invalid request
    Given the request contains invalid parameters
    When I request the dashboard analytics with invalid data
    Then the response status should be 400
    And the response should contain validation error details

  Scenario: Dashboard analytics response includes metadata
    When I request the dashboard analytics
    Then the response should include metadata with:
      | metadata_field |
      | timestamp      |
      | version        |
      | dataSource     |

  Scenario: Dashboard endpoint requires authentication
    Given I am not authenticated
    When I request the dashboard analytics
    Then the response status should be 401
    And the response should contain an authentication error message

  Scenario: Dashboard endpoint respects user permissions
    Given I am authenticated as a user with limited permissions
    When I request the dashboard analytics
    Then the response should only include data I have access to
    And sensitive metrics should be excluded from the response

  Scenario: Dashboard analytics response time is acceptable
    When I request the dashboard analytics
    Then the response should be received within 2000 milliseconds
    And the response should not timeout