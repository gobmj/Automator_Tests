# Auto-generated feature file for frontend/coverage/block-navigation.js
# Generated on: 2026-05-24T18:45:03.265Z

# Auto-generated feature file for frontend/coverage/block-navigation.js
# Generated on: 2026-05-24T18:43:19.632Z

Feature: Code Coverage Block Navigation
  As a developer reviewing code coverage reports
  I want to navigate between uncovered code blocks using keyboard shortcuts
  So that I can efficiently identify and review areas lacking test coverage

  Background:
    Given the coverage report page is loaded
    And the page contains code coverage elements with missing coverage indicators
    And keyboard event listeners are active
    And the following coverage elements exist:
      | Type | Class | Count |
      | Branch | .cbranch-no | 3 |
      | Statement | .cstat-no | 2 |
      | Function | .fstat-no | 1 |
      | File Listing | td.pct.low | 2 |

  Scenario: Navigate to next uncovered block using 'n' key
    Given I am viewing a coverage report with multiple uncovered code blocks
    And no uncovered block is currently highlighted
    When I press the 'n' key
    Then the first uncovered code block should be highlighted
    And the page should scroll to center the highlighted block

  Scenario: Navigate to next uncovered block using 'n' key when one is already highlighted
    Given I am viewing a coverage report with multiple uncovered code blocks
    And the first uncovered block is currently highlighted
    When I press the 'n' key
    Then the next uncovered code block should be highlighted
    And the page should scroll to center the highlighted block

  Scenario: Navigate to next uncovered block using 'j' key
    Given I am viewing a coverage report with multiple uncovered code blocks
    And no uncovered block is currently highlighted
    When I press the 'j' key
    Then the first uncovered code block should be highlighted
    And the page should scroll to center the highlighted block

  Scenario: Navigate to next uncovered block using 'j' key when one is already highlighted
    Given I am viewing a coverage report with multiple uncovered code blocks
    And the first uncovered block is currently highlighted
    When I press the 'j' key
    Then the next uncovered code block should be highlighted
    And the page should scroll to center the highlighted block

  Scenario: Navigate to last uncovered block when pressing next at the end
    Given I am viewing a coverage report with multiple uncovered code blocks
    And the last uncovered block is currently highlighted
    When I press the 'n' key
    Then the first uncovered code block should be highlighted
    And the page should scroll to center the highlighted block

  Scenario: Navigate to previous uncovered block using 'b' key
    Given I am viewing a coverage report with multiple uncovered code blocks
    And no uncovered block is currently highlighted
    When I press the 'b' key
    Then the last uncovered code block should be highlighted
    And the page should scroll to center the highlighted block

  Scenario: Navigate to previous uncovered block using 'b' key when one is already highlighted
    Given I am viewing a coverage report with multiple uncovered code blocks
    And the second uncovered block is currently highlighted
    When I press the 'b' key
    Then the previous uncovered code block should be highlighted
    And the page should scroll to center the highlighted block

  Scenario: Navigate to previous uncovered block using 'k' key
    Given I am viewing a coverage report with multiple uncovered code blocks
    And no uncovered block is currently highlighted
    When I press the 'k' key
    Then the last uncovered code block should be highlighted
    And the page should scroll to center the highlighted block

  Scenario: Navigate to previous uncovered block using 'k' key when one is already highlighted
    Given I am viewing a coverage report with multiple uncovered code blocks
    And the second uncovered block is currently highlighted
    When I press the 'k' key
    Then the previous uncovered code block should be highlighted
    And the page should scroll to center the highlighted block

  Scenario: Navigate to previous uncovered block using 'p' key
    Given I am viewing a coverage report with multiple uncovered code blocks
    And the second uncovered block is currently highlighted
    When I press the 'p' key
    Then the previous uncovered code block should be highlighted
    And the page should scroll to center the highlighted block

  Scenario: Navigate to first uncovered block when pressing previous at the beginning
    Given I am viewing a coverage report with multiple uncovered code blocks
    And the first uncovered block is currently highlighted
    When I press the 'b' key
    Then the last uncovered code block should be highlighted
    And the page should scroll to center the highlighted block

  Scenario: Ignore navigation keys when search input is focused
    Given I am viewing a coverage report with multiple uncovered code blocks
    And the file search input field is focused
    And the first uncovered block is currently highlighted
    When I press the 'n' key
    Then the first uncovered code block should remain highlighted
    And no navigation should occur

  Scenario: Ignore navigation keys when search input is focused with previous key
    Given I am viewing a coverage report with multiple uncovered code blocks
    And the file search input field is focused
    And the first uncovered block is currently highlighted
    When I press the 'b' key
    Then the first uncovered code block should remain highlighted
    And no navigation should occur

  Scenario: Highlight only non-nested uncovered elements
    Given I am viewing a coverage report with nested uncovered code blocks
    When the page loads
    Then only uncovered elements that are not direct descendants of other uncovered elements should be selectable
    And nested uncovered elements should not be highlighted during navigation

  Scenario: Include file listing elements in navigation
    Given I am viewing a coverage report with file listing view
    And the file listing contains low coverage percentage cells
    When I navigate through uncovered blocks
    Then the low coverage percentage cells should be included in the navigation sequence