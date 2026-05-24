# Auto-generated feature file for frontend/src/components/OrderDetails.jsx
# Generated on: 2026-05-24T18:45:47.433Z

Feature: Order Details Management
  As a user
  I want to view, manage, and interact with order details
  So that I can track and control my orders effectively

  Background:
    Given I am on the Order Details page
    And the order service is available

  Scenario: Successfully load and display order details
    Given an order with ID "ORD-12345" exists
    When I navigate to the order details page for order "ORD-12345"
    Then the loading indicator should be displayed
    And the order details should be loaded and displayed
    And the loading indicator should disappear
    And I should see the order information including:
      | Field           | Value                    |
      | Order ID        | ORD-12345                |
      | Status          | RELEASABLE               |
      | Created Date    | formatted date and time  |
      | Order Items     | list of items            |

  Scenario: Display loading state while fetching order
    Given an order with ID "ORD-12345" exists
    When I navigate to the order details page for order "ORD-12345"
    Then I should see a loading spinner
    And I should see the text "Loading order details..."
    And the page should be centered and properly formatted

  Scenario: Display error message when order fails to load
    Given an order with ID "ORD-99999" does not exist
    When I navigate to the order details page for order "ORD-99999"
    And the order service returns an error
    Then the loading indicator should disappear
    And I should see an error message displayed
    And the error message should be styled with red border and background
    And the error message should contain the error details

  Scenario: Display generic error message when service error lacks details
    Given the order service is unavailable
    When I navigate to the order details page for order "ORD-12345"
    Then I should see the error message "Failed to fetch order"

  Scenario: Display order with CREATED status
    Given an order with ID "ORD-12345" has status "CREATED"
    When I view the order details
    Then the status badge should be displayed with gray styling
    And the status badge should show "CREATED"

  Scenario: Display order with RELEASABLE status
    Given an order with ID "ORD-12345" has status "RELEASABLE"
    When I view the order details
    Then the status badge should be displayed with blue styling
    And the status badge should show "RELEASABLE"
    And the Release button should be available

  Scenario: Display order with RELEASED status
    Given an order with ID "ORD-12345" has status "RELEASED"
    When I view the order details
    Then the status badge should be displayed with green styling
    And the status badge should show "RELEASED"

  Scenario: Display order with IN_PROGRESS status
    Given an order with ID "ORD-12345" has status "IN_PROGRESS"
    When I view the order details
    Then the status badge should be displayed with yellow styling
    And the status badge should show "IN_PROGRESS"

  Scenario: Display order with COMPLETED status
    Given an order with ID "ORD-12345" has status "COMPLETED"
    When I view the order details
    Then the status badge should be displayed with purple styling
    And the status badge should show "COMPLETED"

  Scenario: Successfully release an order
    Given an order with ID "ORD-12345" has status "RELEASABLE"
    And I am viewing the order details
    When I click the Release button
    Then the order should be released via the order service
    And the order details should be refreshed
    And the order status should be updated to "RELEASED"

  Scenario: Handle error when releasing an order
    Given an order with ID "ORD-12345" has status "RELEASABLE"
    And I am viewing the order details
    When I click the Release button
    And the release operation fails with error "Order is locked"
    Then an alert should be displayed with the error message "Order is locked"

  Scenario: Handle generic error when releasing an order
    Given an order with ID "ORD-12345" has status "RELEASABLE"
    And I am viewing the order details
    When I click the Release button
    And the release operation fails without error details
    Then an alert should be displayed with the message "Failed to release order"

  Scenario: Successfully delete an order after confirmation
    Given an order with ID "ORD-12345" exists
    And I am viewing the order details
    When I click the Delete button
    And I confirm the deletion in the confirmation dialog
    Then the order should be deleted via the order service
    And I should be navigated to the orders list page

  Scenario: Cancel order deletion
    Given an order with ID "ORD-12345" exists
    And I am viewing the order details
    When I click the Delete button
    And I cancel the deletion in the confirmation dialog
    Then the order should not be deleted
    And I should remain on the order details page

  Scenario: Display confirmation dialog with correct message
    Given an order with ID "ORD-12345" exists
    And I am viewing the order details
    When I click the Delete button
    Then a confirmation dialog should appear
    And the dialog should ask "Are you sure you want to delete this order?"

  Scenario: Handle error when deleting an order
    Given an order with ID "ORD-12345" exists
    And I am viewing the order details
    When I click the Delete button
    And I confirm the deletion
    And the delete operation fails with error "Order cannot be deleted in current state"
    Then an alert should be displayed with the error message "Order cannot be deleted in current state"
    And I should remain on the order details page

  Scenario: Handle generic error when deleting an order
    Given an order with ID "ORD-12345" exists
    And I am viewing the order details
    When I click the Delete button
    And I confirm the deletion
    And the delete operation fails without error details
    Then an alert should be displayed with the message "Failed to delete order"

  Scenario: Format and display order dates correctly
    Given an order with ID "ORD-12345" exists
    And the order was created on "2024-01-15T14:30:00Z"
    When I view the order details
    Then the created date should be displayed as "January 15, 2024, 02:30 PM"

  Scenario: Reload order details when order ID changes
    Given I am viewing order details for order "ORD-12345"
    When the order ID parameter changes to "ORD-67890"
    Then the order details should be reloaded
    And the new order "ORD-67890" details should be displayed

  Scenario: Display unknown status with default styling
    Given an order with ID "ORD-12345" has an unknown status "CUSTOM_STATUS"
    When I view the order details
    Then the status badge should be displayed with default gray styling