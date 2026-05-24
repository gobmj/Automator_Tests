# Auto-generated feature file for frontend/src/components/OrderList.jsx
# Generated on: 2026-05-24T18:46:05.735Z

Feature: Order List Management
  As a user
  I want to view, filter, and manage orders
  So that I can track and control order statuses efficiently

  Background:
    Given the order service is available
    And I am on the Order List page

  Scenario: Display loading state while fetching orders
    When the page loads
    Then I should see a loading spinner
    And I should see the text "Loading orders..."

  Scenario: Successfully load and display orders
    Given there are 5 orders in the system
    When the page finishes loading
    Then I should see all 5 orders displayed in a list
    And the loading spinner should disappear
    And no error message should be displayed

  Scenario: Display error message when order fetch fails
    Given the order service returns an error
    When the page attempts to load orders
    Then I should see an error message
    And the error message should contain the failure reason
    And the loading spinner should disappear

  Scenario: Display empty list when no orders exist
    Given there are no orders in the system
    When the page finishes loading
    Then I should see an empty orders list
    And no error message should be displayed

  Scenario Outline: Filter orders by status
    Given there are orders with the following statuses:
      | status      |
      | CREATED     |
      | RELEASABLE  |
      | RELEASED    |
      | IN_PROGRESS |
      | COMPLETED   |
    When I select the "<status>" status filter
    Then I should see only orders with "<status>" status
    And the page should reset to page 1

    Examples:
      | status      |
      | CREATED     |
      | RELEASABLE  |
      | RELEASED    |
      | IN_PROGRESS |
      | COMPLETED   |

  Scenario: Clear status filter to show all orders
    Given a status filter is currently applied
    When I clear the status filter
    Then I should see all orders regardless of status
    And the page should reset to page 1

  Scenario: Display status badges with correct colors
    Given there are orders with different statuses
    When the orders are displayed
    Then each order should show its status as a colored badge
    And CREATED orders should have a gray badge
    And RELEASABLE orders should have a blue badge
    And RELEASED orders should have a green badge
    And IN_PROGRESS orders should have a yellow badge
    And COMPLETED orders should have an indigo badge

  Scenario: Paginate through orders
    Given there are 25 orders in the system
    And the page limit is 10 orders per page
    When I view the first page
    Then I should see 10 orders
    And pagination information should be displayed
    When I navigate to the next page
    Then I should see the next 10 orders
    And the page number should update to 2

  Scenario: Delete an order with confirmation
    Given there is an order in the list
    When I click the delete button for that order
    Then a confirmation dialog should appear
    And the dialog should ask "Are you sure you want to delete this order?"
    When I confirm the deletion
    Then the order should be deleted
    And the order list should refresh
    And the deleted order should no longer appear in the list

  Scenario: Cancel order deletion
    Given there is an order in the list
    When I click the delete button for that order
    Then a confirmation dialog should appear
    When I cancel the deletion
    Then the order should not be deleted
    And the order list should remain unchanged

  Scenario: Handle delete order failure
    Given there is an order in the list
    When I click the delete button for that order
    And I confirm the deletion
    And the delete operation fails
    Then an error alert should appear
    And the error message should indicate the deletion failed
    And the order should still appear in the list

  Scenario: Release an order
    Given there is an order with RELEASABLE status
    When I click the release button for that order
    Then the order should be released
    And the order list should refresh
    And the order status should update

  Scenario: Handle release order failure
    Given there is an order in the list
    When I click the release button for that order
    And the release operation fails
    Then an error alert should appear
    And the error message should indicate the release failed
    And the order status should remain unchanged

  Scenario: Refresh orders when page changes
    Given I am viewing page 1 of orders
    When I navigate to page 2
    Then the order list should refresh with new data
    And the current page should be set to 2

  Scenario: Refresh orders when status filter changes
    Given I am viewing all orders
    When I apply a status filter
    Then the order list should refresh with filtered data
    And the page should reset to page 1

  Scenario: Display pagination with correct limit
    Given there are orders in the system
    When the orders are loaded
    Then each page should display a maximum of 10 orders
    And pagination metadata should include the limit of 10

  Scenario: Navigate to order details
    Given there is an order in the list
    When I click on an order
    Then I should be navigated to the order details page