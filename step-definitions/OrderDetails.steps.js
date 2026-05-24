// Auto-generated step definitions for frontend/src/components/OrderDetails.jsx
// Generated on: 2026-05-24T18:51:11.982Z

```javascript
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { request, expect } from '@playwright/test';
import { chromium } from 'playwright';

Before(async function() {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  });
  this.browser = await chromium.launch();
  this.page = await this.browser.newPage();
  this.baseURL = process.env.BASE_URL || 'http://localhost:3000';
  this.orderData = {};
  this.responseData = null;
  this.response = null;
});

After(async function() {
  if (this.apiContext) {
    await this.apiContext.dispose();
  }
  if (this.page) {
    await this.page.close();
  }
  if (this.browser) {
    await this.browser.close();
  }
});

// Background steps
Given('I am on the Order Details page', async function() {
  await this.page.goto(`${this.baseURL}/orders`);
});

Given('the order service is available', async function() {
  const response = await this.apiContext.get('/health');
  expect(response.ok()).toBeTruthy();
});

// Scenario: Successfully load and display order details
Given('an order with ID {string} exists', async function(orderId) {
  this.orderData.orderId = orderId;
  this.orderData.mockOrder = {
    id: orderId,
    status: 'RELEASABLE',
    createdDate: '2024-01-15T14:30:00Z',
    items: [
      { id: 1, name: 'Item 1', quantity: 2 },
      { id: 2, name: 'Item 2', quantity: 1 }
    ]
  };
});

When('I navigate to the order details page for order {string}', async function(orderId) {
  await this.page.goto(`${this.baseURL}/orders/${orderId}`);
});

Then('the loading indicator should be displayed', async function() {
  const loadingIndicator = this.page.locator('[data-testid="loading-spinner"], .loading-spinner, .spinner');
  await expect(loadingIndicator).toBeVisible({ timeout: 5000 });
});

Then('the order details should be loaded and displayed', async function() {
  const orderDetails = this.page.locator('[data-testid="order-details"], .order-details');
  await expect(orderDetails).toBeVisible({ timeout: 10000 });
});

Then('the loading indicator should disappear', async function() {
  const loadingIndicator = this.page.locator('[data-testid="loading-spinner"], .loading-spinner, .spinner');
  await expect(loadingIndicator).toBeHidden({ timeout: 10000 });
});

Then('I should see the order information including:', async function(dataTable) {
  const rows = dataTable.hashes();
  for (const row of rows) {
    const field = row.Field;
    const value = row.Value;
    
    if (field === 'Order ID') {
      const orderId = this.page.locator('[data-testid="order-id"]');
      await expect(orderId).toContainText(value);
    } else if (field === 'Status') {
      const status = this.page.locator('[data-testid="order-status"]');
      await expect(status).toContainText(value);
    } else if (field === 'Created Date') {
      const createdDate = this.page.locator('[data-testid="created-date"]');
      await expect(createdDate).toBeVisible();
    } else if (field === 'Order Items') {
      const items = this.page.locator('[data-testid="order-items"]');
      await expect(items).toBeVisible();
    }
  }
});

// Scenario: Display loading state while fetching order
Then('I should see a loading spinner', async function() {
  const spinner = this.page.locator('[data-testid="loading-spinner"], .spinner, .loading-spinner');
  await expect(spinner).toBeVisible();
});

Then('I should see the text {string}', async function(text) {
  await expect(this.page.locator(`text=${text}`)).toBeVisible();
});

Then('the page should be centered and properly formatted', async function() {
  const container = this.page.locator('[data-testid="order-details-container"], .order-details-container');
  const boundingBox = await container.boundingBox();
  expect(boundingBox).toBeTruthy();
});

// Scenario: Display error message when order fails to load
Given('an order with ID {string} does not exist', async function(orderId) {
  this.orderData.orderId = orderId;
  this.orderData.shouldFail = true;
});

When('the order service returns an error', async function() {
  // Error is simulated by the mock not returning data
  this.orderData.error = 'Order not found';
});

Then('I should see an error message displayed', async function() {
  const errorMessage = this.page.locator('[data-testid="error-message"], .error-message');
  await expect(errorMessage).toBeVisible();
});

Then('the error message should be styled with red border and background', async function() {
  const errorMessage = this.page.locator('[data-testid="error-message"], .error-message');
  const styles = await errorMessage.evaluate(el => {
    const computed = window.getComputedStyle(el);
    return {
      borderColor: computed.borderColor,
      backgroundColor: computed.backgroundColor
    };
  });
  expect(styles.borderColor).toContain('rgb');
  expect(styles.backgroundColor).toContain('rgb');
});

Then('the error message should contain the error details', async function() {
  const errorMessage = this.page.locator('[data-testid="error-message"], .error-message');
  const text = await errorMessage.textContent();
  expect(text).toBeTruthy();
  expect(text.length).toBeGreaterThan(0);
});

// Scenario: Display generic error message when service error lacks details
Given('the order service is unavailable', async function() {
  this.orderData.serviceUnavailable = true;
});

Then('I should see the error message {string}', async function(expectedMessage) {
  const errorMessage = this.page.locator('[data-testid="error-message"], .error-message');
  await expect(errorMessage).toContainText(expectedMessage);
});

// Scenario: Display order with CREATED status
Given('an order with ID {string} has status {string}', async function(orderId, status) {
  this.orderData.orderId = orderId;
  this.orderData.status = status;
  this.orderData.mockOrder = {
    id: orderId,
    status: status,
    createdDate: '2024-01-15T14:30:00Z',
    items: []
  };
});

When('I view the order details', async function() {
  await this.page.goto(`${this.baseURL}/orders/${this.orderData.orderId}`);
  await this.page.waitForLoadState('networkidle');
});

Then('the status badge should be displayed with gray styling', async function() {
  const badge = this.page.locator('[data-testid="status-badge"], .status-badge');
  await expect(badge).toBeVisible();
  const styles = await badge.evaluate(el => window.getComputedStyle(el).backgroundColor);
  expect(styles).toContain('gray') || expect(styles).toContain('rgb(128, 128, 128)');
});

Then('the status badge should show {string}', async function(status) {
  const badge = this.page.locator('[data-testid="status-badge"], .status-badge');
  await expect(badge).toContainText(status);
});

Then('the status badge should be displayed with blue styling', async function() {
  const badge = this.page.locator('[data-testid="status-badge"], .status-badge');
  await expect(badge).toBeVisible();
});

Then('the Release button should be available', async function() {
  const releaseButton = this.page.locator('[data-testid="release-button"], button:has-text("Release")');
  await expect(releaseButton).toBeEnabled();
});

Then('the status badge should be displayed with green styling', async function() {
  const badge = this.page.locator('[data-testid="status-badge"], .status-badge');
  await expect(badge).toBeVisible();
});

Then('the status badge should be displayed with yellow styling', async function() {
  const badge = this.page.locator('[data-testid="status-badge"], .status-badge');
  await expect(badge).toBeVisible();
});

Then('the status badge should be displayed with purple styling', async function() {
  const badge = this.page.locator('[data-testid="status-badge"], .status-badge');
  await expect(badge).toBeVisible();
});

// Scenario: Successfully release an order
Given('I am viewing the order details', async function() {
  await this.page.goto(`${this.baseURL}/orders/${this.orderData.orderId}`);
  await this.page.waitForLoadState('networkidle');
});

When('I click the Release button', async function() {
  const releaseButton = this.page.locator('[data-testid="release-button"], button:has-text("Release")');
  await releaseButton.click();
});

Then('the order should be released via the order service', async function() {
  this.response = await this.apiContext.post(`/orders/${this.orderData.orderId}/release`);
  expect(this.response.ok()).toBeTruthy();
});

Then('the order details should be refreshed', async function() {
  await this.page.waitForLoadState('networkidle');
  const orderDetails = this.page.locator('[data-testid="order-details"], .order-details');
  await expect(orderDetails).toBeVisible();
});

Then('the order status should be updated to {string}', async function(newStatus) {
  const statusBadge = this.page.locator('[data-testid="status-badge"], .status-badge');
  await expect(statusBadge).toContainText(newStatus);
});

// Scenario: Handle error when releasing an order
When('the release operation fails with error {string}', async function(errorMessage) {
  this.orderData.releaseError = errorMessage;
});

Then('an alert should be displayed with the error message {string}', async function(expectedMessage) {
  const alert = this.page.locator('[role="alert"], .alert');
  await expect(alert).toContainText(expectedMessage);
});

// Scenario: Handle generic error when releasing an order
When('the release operation fails without error details', async function() {
  this.orderData.releaseError = 'Failed to release order';
});

Then('an alert should be displayed with the message {string}', async function(expectedMessage) {
  const alert = this.page.locator('[role="alert"], .alert');
  await expect(alert).toContainText(expectedMessage);
});

// Scenario: Successfully delete an order after confirmation
When('I click the Delete button', async function() {
  const deleteButton = this.page.locator('[data-testid="delete-button"], button:has-text("Delete")');
  await deleteButton.click();
});

When('I confirm the deletion in the confirmation dialog', async function() {
  const confirmButton = this.page.locator('[data-testid="confirm-delete"], button:has-text("Confirm"), button:has-text("Yes")');
  await confirmButton.click();
});

Then('the order should be deleted via the order service', async function() {
  this.response = await this.apiContext.delete(`/orders/${this.orderData.