// Auto-generated step definitions for frontend/src/components/OrderList.jsx
// Generated on: 2026-05-24T18:51:43.748Z

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
  this.orders = [];
  this.currentPage = 1;
  this.statusFilter = null;
  this.pageLimit = 10;
});

After(async function() {
  if (this.page) await this.page.close();
  if (this.browser) await this.browser.close();
  if (this.apiContext) await this.apiContext.dispose();
});

// Background steps
Given('the order service is available', async function() {
  this.response = await this.apiContext.get('/orders/health');
  expect(this.response.ok()).toBeTruthy();
});

Given('I am on the Order List page', async function() {
  await this.page.goto(`${this.baseURL}/orders`);
  await this.page.waitForLoadState('networkidle');
});

// Loading state scenario
When('the page loads', async function() {
  await this.page.goto(`${this.baseURL}/orders`);
});

Then('I should see a loading spinner', async function() {
  const spinner = this.page.locator('[data-testid="loading-spinner"]');
  await expect(spinner).toBeVisible();
});

Then('I should see the text "Loading orders..."', async function() {
  const loadingText = this.page.locator('text=Loading orders...');
  await expect(loadingText).toBeVisible();
});

// Successfully load and display orders
Given('there are {int} orders in the system', async function(count) {
  this.orders = [];
  for (let i = 0; i < count; i++) {
    const orderData = {
      id: `order-${i + 1}`,
      status: 'CREATED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.response = await this.apiContext.post('/orders', {
      data: orderData
    });
    const responseData = await this.response.json();
    this.orders.push(responseData);
  }
});

When('the page finishes loading', async function() {
  await this.page.goto(`${this.baseURL}/orders`);
  await this.page.waitForSelector('[data-testid="order-list"]', { timeout: 10000 });
});

Then('I should see all {int} orders displayed in a list', async function(count) {
  const orderItems = this.page.locator('[data-testid="order-item"]');
  await expect(orderItems).toHaveCount(count);
});

Then('the loading spinner should disappear', async function() {
  const spinner = this.page.locator('[data-testid="loading-spinner"]');
  await expect(spinner).not.toBeVisible();
});

Then('no error message should be displayed', async function() {
  const errorMessage = this.page.locator('[data-testid="error-message"]');
  await expect(errorMessage).not.toBeVisible();
});

// Error handling scenario
Given('the order service returns an error', async function() {
  await this.page.route('**/api/orders*', route => {
    route.abort('failed');
  });
});

When('the page attempts to load orders', async function() {
  await this.page.goto(`${this.baseURL}/orders`);
  await this.page.waitForTimeout(2000);
});

Then('I should see an error message', async function() {
  const errorMessage = this.page.locator('[data-testid="error-message"]');
  await expect(errorMessage).toBeVisible();
});

Then('the error message should contain the failure reason', async function() {
  const errorMessage = this.page.locator('[data-testid="error-message"]');
  const text = await errorMessage.textContent();
  expect(text).toBeTruthy();
  expect(text.length).toBeGreaterThan(0);
});

// Empty list scenario
Given('there are no orders in the system', async function() {
  this.orders = [];
  await this.page.route('**/api/orders*', route => {
    route.continue();
  });
});

Then('I should see an empty orders list', async function() {
  const emptyState = this.page.locator('[data-testid="empty-state"]');
  await expect(emptyState).toBeVisible();
});

// Filter by status scenario
Given('there are orders with the following statuses:', async function(dataTable) {
  const statuses = dataTable.raw().map(row => row[0]);
  this.orders = [];
  for (let i = 0; i < statuses.length; i++) {
    const orderData = {
      id: `order-${i + 1}`,
      status: statuses[i],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.response = await this.apiContext.post('/orders', {
      data: orderData
    });
    const responseData = await this.response.json();
    this.orders.push(responseData);
  }
  await this.page.goto(`${this.baseURL}/orders`);
  await this.page.waitForSelector('[data-testid="order-list"]', { timeout: 10000 });
});

When('I select the {string} status filter', async function(status) {
  this.statusFilter = status;
  const filterButton = this.page.locator(`[data-testid="status-filter-${status}"]`);
  await filterButton.click();
  await this.page.waitForLoadState('networkidle');
});

Then('I should see only orders with {string} status', async function(status) {
  const orderItems = this.page.locator('[data-testid="order-item"]');
  const count = await orderItems.count();
  for (let i = 0; i < count; i++) {
    const statusBadge = orderItems.nth(i).locator('[data-testid="order-status"]');
    const statusText = await statusBadge.textContent();
    expect(statusText).toContain(status);
  }
});

Then('the page should reset to page {int}', async function(pageNum) {
  const currentPageIndicator = this.page.locator('[data-testid="current-page"]');
  const pageText = await currentPageIndicator.textContent();
  expect(pageText).toContain(pageNum.toString());
  this.currentPage = pageNum;
});

// Clear filter scenario
Given('a status filter is currently applied', async function() {
  this.statusFilter = 'CREATED';
  const filterButton = this.page.locator('[data-testid="status-filter-CREATED"]');
  await filterButton.click();
  await this.page.waitForLoadState('networkidle');
});

When('I clear the status filter', async function() {
  const clearButton = this.page.locator('[data-testid="clear-filter-button"]');
  await clearButton.click();
  await this.page.waitForLoadState('networkidle');
  this.statusFilter = null;
});

Then('I should see all orders regardless of status', async function() {
  const orderItems = this.page.locator('[data-testid="order-item"]');
  const count = await orderItems.count();
  expect(count).toBeGreaterThan(0);
});

// Status badges scenario
Given('there are orders with different statuses', async function() {
  const statuses = ['CREATED', 'RELEASABLE', 'RELEASED', 'IN_PROGRESS', 'COMPLETED'];
  this.orders = [];
  for (let i = 0; i < statuses.length; i++) {
    const orderData = {
      id: `order-${i + 1}`,
      status: statuses[i],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.response = await this.apiContext.post('/orders', {
      data: orderData
    });
    const responseData = await this.response.json();
    this.orders.push(responseData);
  }
  await this.page.goto(`${this.baseURL}/orders`);
  await this.page.waitForSelector('[data-testid="order-list"]', { timeout: 10000 });
});

When('the orders are displayed', async function() {
  await this.page.waitForSelector('[data-testid="order-item"]', { timeout: 10000 });
});

Then('each order should show its status as a colored badge', async function() {
  const orderItems = this.page.locator('[data-testid="order-item"]');
  const count = await orderItems.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const badge = orderItems.nth(i).locator('[data-testid="order-status"]');
    await expect(badge).toBeVisible();
  }
});

Then('CREATED orders should have a gray badge', async function() {
  const createdBadge = this.page.locator('[data-testid="status-badge-CREATED"]').first();
  const classes = await createdBadge.getAttribute('class');
  expect(classes).toContain('gray');
});

Then('RELEASABLE orders should have a blue badge', async function() {
  const releasableBadge = this.page.locator('[data-testid="status-badge-RELEASABLE"]').first();
  const classes = await releasableBadge.getAttribute('class');
  expect(classes).toContain('blue');
});

Then('RELEASED orders should have a green badge', async function() {
  const releasedBadge = this.page.locator('[data-testid="status-badge-RELEASED"]').first();
  const classes = await releasedBadge.getAttribute('class');
  expect(classes).toContain('green');
});

Then('IN_PROGRESS orders should have a yellow badge', async function() {
  const inProgressBadge = this.page.locator('[data-testid="status-badge-IN_PROGRESS"]').first();
  const classes = await inProgressBadge.getAttribute('class');
  expect(classes).toContain('yellow');
});

Then('COMPLETED orders should have an indigo badge', async function() {
  const completedBadge = this.page.locator('[data-testid="status-badge-COMPLETED"]').first();
  const classes = await completedBadge.getAttribute('class');
  expect(classes).toContain('indigo');
});

// Pagination scenario
Given('the page limit is {int} orders per page', async function(limit) {
  this.pageLimit = limit;
});

When('I view the first page', async function() {
  await this.page.goto(`${this.baseURL}/orders?page=1`);
  await this.page.waitForSelector('[data-testid="order-list"]', { timeout: 10000 });
  this.currentPage = 1;
});

Then('I should see {int} orders', async function(count) {
  const orderItems = this.page.locator('[data-testid="order-item"]');
  await expect(orderItems).toHaveCount(count);
});

Then('pagination information should be displayed', async function() {
  const pagination = this.page.locator('[data-testid="pagination-info"]');
  await expect(pagination).toBeVisible();