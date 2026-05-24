# Auto-generated feature file for frontend/src/test/setup.js
# Generated on: 2026-05-24T18:46:25.874Z

Feature: Test Environment Setup and Configuration
  As a test engineer
  I want to ensure the test environment is properly configured
  So that all tests run consistently with proper DOM matchers and cleanup

  Background:
    Given the test framework is initialized
    And the testing library is available

  Scenario: Extend test assertions with DOM matchers
    Given the test environment is being set up
    When the jest-dom matchers are loaded
    Then the expect function should support DOM-specific assertions
    And assertions like "toBeInTheDocument" should be available
    And assertions like "toBeVisible" should be available
    And assertions like "toBeDisabled" should be available

  Scenario: Cleanup DOM after each test execution
    Given a test has been executed
    And DOM elements have been rendered
    When the test completes
    Then the cleanup function should be called automatically
    And all rendered components should be unmounted
    And the DOM should be reset to a clean state
    And event listeners should be removed

  Scenario: Mock window.matchMedia for responsive design testing
    Given the test environment needs to simulate media queries
    When window.matchMedia is called with a query string
    Then it should return a MediaQueryList-like object
    And the object should have a "matches" property set to false
    And the object should have a "media" property containing the query
    And the object should have an "onchange" property

  Scenario: Support deprecated matchMedia listener methods
    Given window.matchMedia is mocked
    When a test calls addListener on the media query object
    Then the addListener method should be available
    And the addListener method should not throw an error
    And the removeListener method should be available
    And the removeListener method should not throw an error

  Scenario: Support modern matchMedia event listener methods
    Given window.matchMedia is mocked
    When a test calls addEventListener on the media query object
    Then the addEventListener method should be available
    And the addEventListener method should not throw an error
    And the removeEventListener method should be available
    And the removeEventListener method should not throw an error

  Scenario: Support dispatching events on media query object
    Given window.matchMedia is mocked
    When a test calls dispatchEvent on the media query object
    Then the dispatchEvent method should be available
    And the dispatchEvent method should not throw an error

  Scenario: Preserve window.matchMedia configuration across tests
    Given window.matchMedia has been mocked
    When multiple tests are executed sequentially
    Then each test should have access to the mocked window.matchMedia
    And the mock should be writable for test-specific overrides
    And the mock should maintain consistent behavior across tests

  Scenario Outline: Handle various media query strings
    Given window.matchMedia is mocked
    When window.matchMedia is called with "<query>"
    Then it should return an object with media property equal to "<query>"
    And the matches property should be false

    Examples:
      | query                                    |
      | (max-width: 768px)                       |
      | (min-width: 1024px)                      |
      | (prefers-color-scheme: dark)             |
      | (orientation: landscape)                 |
      | (max-width: 768px) and (orientation: portrait) |