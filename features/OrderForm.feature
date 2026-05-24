# Auto-generated feature file for frontend/src/components/OrderForm.jsx
# Generated on: 2026-05-24T18:45:57.296Z

Feature: Order Form Management
  As a production planner
  I want to create and edit manufacturing orders
  So that I can manage production schedules and track order status

  Background:
    Given the Order Form application is loaded
    And the order service is available

  Scenario: Display empty order creation form
    Given I am on the order creation page
    When the page loads
    Then I should see an empty order form
    And the form should have the following fields:
      | Field Name                  | Default Value |
      | Order Number                |               |
      | Material                    |               |
      | Quantity                    |               |
      | Priority                    | 500           |
      | Status                      | CREATED       |
      | Plant                       |               |
      | Scheduled Start Date        |               |
      | Scheduled Completion Date   |               |
    And the submit button should be enabled

  Scenario: Load existing order for editing
    Given an order with ID "12345" exists in the system
    When I navigate to the edit order page for order "12345"
    Then a loading spinner should be displayed
    And the order data should be fetched from the service
    And the form should be populated with the following data:
      | Field Name                  | Value          |
      | Order Number                | ORD-2024-001   |
      | Material                    | Steel Sheet    |
      | Quantity                    | 100            |
      | Priority                    | 750            |
      | Status                      | IN_PROGRESS    |
      | Plant                        | Plant A        |
      | Scheduled Start Date        | 2024-01-15     |
      | Scheduled Completion Date   | 2024-01-20     |

  Scenario: Display loading state while fetching order
    Given I am editing an existing order
    When the order data is being fetched
    Then a loading spinner should be visible
    And the text "Loading order..." should be displayed
    And the form should not be interactive

  Scenario: Handle error when fetching order fails
    Given I am on the edit order page for order "99999"
    When the order fetch request fails with error "Order not found"
    Then an error message should be displayed
    And the error message should contain "Failed to fetch order"
    And the form should not be populated

  Scenario: Update form fields with valid input
    Given I am on the order creation page
    When I enter the following order details:
      | Field Name                  | Value          |
      | Order Number                | ORD-2024-002   |
      | Material                    | Aluminum       |
      | Quantity                    | 250            |
      | Priority                    | 600            |
      | Plant                       | Plant B        |
      | Scheduled Start Date        | 2024-02-01     |
      | Scheduled Completion Date   | 2024-02-05     |
    Then the form should reflect all entered values
    And the submit button should remain enabled

  Scenario: Select status from available options
    Given I am on the order creation page
    When I click on the Status dropdown
    Then I should see the following status options:
      | Status        |
      | CREATED       |
      | RELEASABLE    |
      | RELEASED      |
      | IN_PROGRESS   |
      | COMPLETED     |
    When I select "RELEASED"
    Then the Status field should display "RELEASED"

  Scenario: Create new order successfully
    Given I am on the order creation page
    And I have filled in all required fields with valid data
    When I click the submit button
    Then a loading indicator should be displayed
    And the order should be sent to the order service for creation
    And I should be redirected to the orders list page
    And no error message should be displayed

  Scenario: Update existing order successfully
    Given I am editing order "12345"
    And the form is populated with existing order data
    When I modify the Quantity field to "500"
    And I click the submit button
    Then a loading indicator should be displayed
    And the updated order should be sent to the order service
    And I should be redirected to the orders list page
    And no error message should be displayed

  Scenario: Handle validation error on form submission
    Given I am on the order creation page
    And I have filled in the form with invalid data
    When I click the submit button
    Then the form submission should fail
    And an error message should be displayed
    And I should remain on the order form page
    And the form data should be preserved

  Scenario: Handle server error during order creation
    Given I am on the order creation page
    And I have filled in all required fields with valid data
    When I click the submit button
    And the server returns an error response
    Then an error message should be displayed
    And the error message should contain the server error details
    And I should remain on the order form page
    And the loading indicator should disappear

  Scenario: Handle server error during order update
    Given I am editing order "12345"
    And I have modified the order data
    When I click the submit button
    And the server returns an error response
    Then an error message should be displayed
    And I should remain on the order form page
    And the form data should be preserved

  Scenario: Convert numeric strings to proper data types before submission
    Given I am on the order creation page
    And I have entered the following data:
      | Field Name                  | Value          |
      | Quantity                    | 150            |
      | Priority                    | 800            |
      | Scheduled Start Date        | 2024-03-01     |
      | Scheduled Completion Date   | 2024-03-10     |
    When I click the submit button
    Then the quantity should be converted to integer type
    And the priority should be converted to integer type
    And the scheduled dates should be converted to ISO format

  Scenario: Display form with fade-in animation
    Given I am on the order creation page
    When the page loads
    Then the form container should have a fade-in animation applied

  Scenario: Clear error message when user modifies form
    Given an error message is displayed on the form
    When I modify any form field
    Then the error message should be cleared
    And the form should be ready for resubmission

  Scenario: Prevent form submission while loading
    Given I am on the order creation page
    And I have filled in all required fields
    When I click the submit button
    And the form is in a loading state
    Then the submit button should be disabled
    And subsequent clicks should not trigger additional submissions