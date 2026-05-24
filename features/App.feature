# Auto-generated feature file for frontend/src/App.jsx
# Generated on: 2026-05-24T18:45:38.130Z

Feature: Order Manager Application Navigation and Layout
  As a manufacturing order manager
  I want to navigate through the order management system
  So that I can efficiently manage orders and access all features

  Background:
    Given the Order Manager application is loaded
    And the navigation bar is visible
    And the footer is visible

  Scenario: User sees the Order Manager branding in the navbar
    When the user views the navigation bar
    Then the Order Manager logo should be displayed
    And the application title "Order Manager" should be visible
    And the subtitle "Order Management Platform for Manufacturing" should be displayed
    And the logo should have a blue gradient background

  Scenario: System status indicator shows active state
    When the user views the navigation bar on a desktop device
    Then the "System Active" status indicator should be visible
    And the status indicator should show a green pulse animation
    And the status message should display "System Active"

  Scenario: User navigates to orders list from home page
    Given the user is on the home page
    When the user accesses the root path "/"
    Then the user should be redirected to "/orders"
    And the OrderList component should be displayed

  Scenario: User clicks on Order Manager branding to go to orders list
    Given the user is on any page in the application
    When the user clicks on the Order Manager logo or title
    Then the user should be navigated to "/orders"
    And the OrderList component should be displayed

  Scenario: User navigates to create new order form
    Given the user is viewing the orders list
    When the user navigates to "/orders/new"
    Then the OrderForm component should be displayed
    And the form should be in "create" mode

  Scenario: User views order details
    Given the user is viewing the orders list
    When the user navigates to "/orders/12345"
    Then the OrderDetails component should be displayed
    And the order with ID "12345" should be loaded

  Scenario: User edits an existing order
    Given the user is viewing order details for order "12345"
    When the user navigates to "/orders/12345/edit"
    Then the OrderForm component should be displayed
    And the form should be in "edit" mode
    And the order data should be pre-populated

  Scenario: Application displays footer with copyright information
    When the user scrolls to the bottom of the page
    Then the footer should be visible
    And the copyright text should display "© 2026 Order Management System - BITS Dissertation Project"

  Scenario: Navigation bar remains sticky at top while scrolling
    Given the user is on any page with scrollable content
    When the user scrolls down the page
    Then the navigation bar should remain visible at the top
    And the navigation bar should maintain its position above all other content

  Scenario: Logo has hover effect on desktop
    Given the user is on a desktop device
    When the user hovers over the Order Manager logo
    Then the logo should scale up slightly
    And the scaling animation should complete smoothly

  Scenario: Application layout is responsive on mobile devices
    Given the user is accessing the application on a mobile device
    When the page is rendered
    Then the navigation bar should be properly formatted for mobile
    And the status indicator should be hidden on mobile devices
    And the main content should be full width
    And the footer should be properly formatted for mobile

  Scenario: Application layout is responsive on tablet devices
    Given the user is accessing the application on a tablet device
    When the page is rendered
    Then the navigation bar should be properly formatted for tablet
    And the status indicator should be visible
    And the main content should be properly sized
    And the footer should be properly formatted for tablet

  Scenario: Main content area has proper spacing
    When the user views the main content area
    Then the content should have vertical padding of 8 units
    And the content should have minimum height of viewport minus navbar height
    And the content should be centered with proper container margins

  Scenario: Navigation links are accessible via keyboard
    Given the user is using keyboard navigation
    When the user presses Tab to navigate through the page
    Then the Order Manager logo link should be focusable
    And the focus indicator should be visible on the link

  Scenario: Application handles invalid routes gracefully
    Given the user is on a valid page
    When the user navigates to an invalid route like "/invalid-page"
    Then the user should be redirected to "/orders"
    And the OrderList component should be displayed

  Scenario Outline: User can navigate between different order pages
    Given the user is on the orders page
    When the user navigates to "<route>"
    Then the "<component>" component should be displayed

    Examples:
      | route              | component      |
      | /orders            | OrderList      |
      | /orders/new        | OrderForm      |
      | /orders/123        | OrderDetails   |
      | /orders/123/edit   | OrderForm      |