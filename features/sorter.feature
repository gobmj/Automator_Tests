# Auto-generated feature file for frontend/coverage/sorter.js
# Generated on: 2026-05-24T18:45:19.293Z

# Auto-generated feature file for frontend/coverage/sorter.js
# Generated on: 2026-05-24T18:43:34.976Z

Feature: Coverage Report Sorting and Filtering
  As a developer reviewing code coverage reports
  I want to sort and filter coverage data
  So that I can easily find and analyze specific files and metrics

  Background:
    Given a coverage summary table is displayed
    And the table contains multiple columns with coverage data
    And the table has a header row with column definitions
    And the table has a body with file coverage rows

  Scenario: Display search filter box on page load
    When the coverage report page loads
    Then a search box should be displayed
    And the search box should have an input field with id "fileSearch"
    And the search box should be ready to accept user input

  Scenario: Filter table rows by plain text search
    Given the search box is visible
    And the table contains the following files:
      | filename           | coverage |
      | utils.js           | 85%      |
      | helpers.js         | 92%      |
      | validators.js      | 78%      |
    When I enter "utils" in the search box
    Then only rows containing "utils" should be visible
    And rows not matching the search should be hidden
    And the search should be case-insensitive

  Scenario: Filter table rows using regular expression
    Given the search box is visible
    And the table contains the following files:
      | filename           | coverage |
      | utils.js           | 85%      |
      | helpers.js         | 92%      |
      | validators.js      | 78%      |
    When I enter a valid regex pattern "^[a-z]+\.js$" in the search box
    Then rows matching the regex pattern should be visible
    And rows not matching the pattern should be hidden

  Scenario: Handle invalid regular expression gracefully
    Given the search box is visible
    And the table contains the following files:
      | filename           | coverage |
      | utils.js           | 85%      |
      | helpers.js         | 92%      |
    When I enter an invalid regex pattern "[invalid" in the search box
    Then the system should fall back to plain text search
    And rows containing the literal text "[invalid" should be hidden
    And the table should remain functional

  Scenario: Load and display sortable columns
    Given the coverage summary table is displayed
    When the table columns are loaded
    Then each column should be identified with a data-col attribute
    And sortable columns should be marked with sortable flag
    And non-sortable columns should have data-nosort attribute
    And each sortable column should display a sorter indicator

  Scenario: Identify column data types for sorting
    Given the coverage summary table is displayed
    When the table columns are loaded
    Then columns should have a data-type attribute
    And columns without explicit type should default to "string" type
    And numeric columns should be identified as "number" type
    And number type columns should default to descending sort

  Scenario: Search with empty input shows all rows
    Given the search box is visible
    And the table contains multiple file rows
    When I clear the search box
    Then all table rows should be visible
    And no rows should be filtered out

  Scenario: Search updates results in real-time
    Given the search box is visible
    And the table contains the following files:
      | filename           | coverage |
      | utils.js           | 85%      |
      | helpers.js         | 92%      |
      | validators.js      | 78%      |
    When I type "help" in the search box
    Then only the "helpers.js" row should be visible
    When I add "ers" to make the search "helpers"
    Then only the "helpers.js" row should remain visible
    When I clear the search box
    Then all rows should be visible again

  Scenario: Case-insensitive plain text search
    Given the search box is visible
    And the table contains the following files:
      | filename           | coverage |
      | Utils.js           | 85%      |
      | HELPERS.js         | 92%      |
      | validators.js      | 78%      |
    When I enter "UTILS" in the search box
    Then the row with "Utils.js" should be visible
    When I enter "helpers" in the search box
    Then the row with "HELPERS.js" should be visible