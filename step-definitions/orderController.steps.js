// Auto-generated step definitions for backend/src/controllers/orderController.js
// Generated on: 2026-05-24T18:48:24.097Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { request, expect } from '@playwright/test';

Before(async function() {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  });
  this.orderData = {};
  this.response = null;
  this.responseData = null;
  this.existingOrders = [];
  this.currentOrderId = null;
  this.updatedData = {};
  this.queryParams = {};
});

After(async function() {
  if (this.apiContext) {
    await this.apiContext.dispose();
  }
});

// Background steps
Given('the Order API is available', async function() {
  const response = await this.apiContext.get('/orders');
  expect(response.status()).toBeLessThan(500);
});

Given('the system is ready to process requests', async function() {
  expect(this.apiContext).toBeDefined();
});

// Create order steps
Given('I have valid order data', async function(dataTable) {
  const data = dataTable.rowsHash();
  this.orderData = {
    customerId: data.customerId,
    plantId: data.plantId,
    quantity: parseInt(data.quantity),
    status: data.status
  };
});

Given('I have invalid order data', async function(dataTable) {
  const data = dataTable.rowsHash();
  this.orderData = {
    customerId: data.customerId || undefined,
    quantity: parseInt(data.quantity) || -50
  };
});

When('I send a POST request to {string} with the order data', async function(endpoint) {
  this.response = await this.apiContext.post(endpoint, {
    data: this.orderData
  });
  this.responseData = await this.response.json();
});

Then('the response status code should be {int}', async function(statusCode) {
  expect(this.response.status()).toBe(statusCode);
});

Then('the response should contain success flag as true', async function() {
  expect(this.responseData.success).toBe(true);
});

Then('the response should contain success flag as false', async function() {
  expect(this.responseData.success).toBe(false);
});

Then('the response should contain message {string}', async function(message) {
  expect(this.responseData.message).toBe(message);
});

Then('the response should contain the created order data', async function() {
  expect(this.responseData.data).toBeDefined();
  expect(this.responseData.data).toHaveProperty('customerId');
  expect(this.responseData.data).toHaveProperty('plantId');
  expect(this.responseData.data).toHaveProperty('quantity');
  expect(this.responseData.data).toHaveProperty('status');
});

Then('the order should have an assigned order ID', async function() {
  expect(this.responseData.data.orderId).toBeDefined();
  expect(this.responseData.data.orderId).not.toBeNull();
  this.currentOrderId = this.responseData.data.orderId;
});

Then('the response should contain an error message', async function() {
  expect(this.responseData.message).toBeDefined();
  expect(this.responseData.message).not.toBeNull();
});

// Retrieve all orders steps
Given('there are existing orders in the system', async function(dataTable) {
  const orders = dataTable.hashes();
  this.existingOrders = orders;
  // In a real scenario, these would be seeded into the database
});

When('I send a GET request to {string}', async function(endpoint) {
  this.response = await this.apiContext.get(endpoint);
  this.responseData = await this.response.json();
});

Then('the response should contain a list of orders', async function() {
  expect(this.responseData.data).toBeDefined();
  expect(Array.isArray(this.responseData.data)).toBe(true);
});

Then('the response should contain pagination information', async function() {
  expect(this.responseData.pagination).toBeDefined();
  expect(this.responseData.pagination).toHaveProperty('page');
  expect(this.responseData.pagination).toHaveProperty('limit');
  expect(this.responseData.pagination).toHaveProperty('total');
});

// Pagination steps
Given('there are {int} existing orders in the system', async function(count) {
  this.existingOrdersCount = count;
  // In a real scenario, these would be seeded into the database
});

When('I send a GET request to {string} with query parameters', async function(endpoint, dataTable) {
  const params = dataTable.rowsHash();
  this.queryParams = params;
  
  const queryString = new URLSearchParams(params).toString();
  const fullEndpoint = queryString ? `${endpoint}?${queryString}` : endpoint;
  
  this.response = await this.apiContext.get(fullEndpoint);
  this.responseData = await this.response.json();
});

Then('the response should contain {int} orders or fewer', async function(limit) {
  expect(this.responseData.data.length).toBeLessThanOrEqual(parseInt(limit));
});

Then('the pagination should show page {int}', async function(page) {
  expect(this.responseData.pagination.page).toBe(page);
});

// Status filter steps
Given('there are existing orders with different statuses in the system', async function(dataTable) {
  const statuses = dataTable.raw().flat();
  this.existingStatuses = statuses;
});

Then('the response should contain only orders with status {string}', async function(status) {
  expect(this.responseData.data).toBeDefined();
  expect(Array.isArray(this.responseData.data)).toBe(true);
  this.responseData.data.forEach(order => {
    expect(order.status).toBe(status);
  });
});

// Plant filter steps
Given('there are existing orders from multiple plants in the system', async function(dataTable) {
  const orders = dataTable.hashes();
  this.existingOrders = orders;
});

Then('the response should contain only orders from plant {string}', async function(plant) {
  expect(this.responseData.data).toBeDefined();
  expect(Array.isArray(this.responseData.data)).toBe(true);
  this.responseData.data.forEach(order => {
    expect(order.plant).toBe(plant);
  });
});

// Sorting steps
Then('the orders should be sorted by {string} in {string} order', async function(sortBy, sortOrder) {
  expect(this.responseData.data).toBeDefined();
  expect(Array.isArray(this.responseData.data)).toBe(true);
  
  const orders = this.responseData.data;
  if (orders.length > 1) {
    for (let i = 0; i < orders.length - 1; i++) {
      const current = orders[i][sortBy];
      const next = orders[i + 1][sortBy];
      
      if (sortOrder === 'asc') {
        expect(current <= next).toBe(true);
      } else if (sortOrder === 'desc') {
        expect(current >= next).toBe(true);
      }
    }
  }
});

// Retrieve specific order steps
Given('there is an existing order with ID {string}', async function(orderId) {
  this.currentOrderId = orderId;
  // In a real scenario, verify the order exists in the database
});

Then('the response should contain the order data with ID {string}', async function(orderId) {
  expect(this.responseData.data).toBeDefined();
  expect(this.responseData.data.orderId).toBe(orderId);
});

// Non-existent order steps
Given('there is no order with ID {string}', async function(orderId) {
  this.currentOrderId = orderId;
  // In a real scenario, verify the order does not exist in the database
});

Then('the response should contain error message {string}', async function(errorMessage) {
  expect(this.responseData.message).toBe(errorMessage);
});

// Update order steps
Given('the order has the following data', async function(dataTable) {
  const data = dataTable.rowsHash();
  this.orderCurrentData = {
    status: data.status,
    quantity: parseInt(data.quantity)
  };
});

When('I send a PUT request to {string} with updated data', async function(endpoint, dataTable) {
  const data = dataTable.rowsHash();
  this.updatedData = {};
  
  Object.keys(data).forEach(key => {
    if (key === 'quantity') {
      this.updatedData[key] = parseInt(data[key]);
    } else {
      this.updatedData[key] = data[key];
    }
  });
  
  this.response = await this.apiContext.put(endpoint, {
    data: this.updatedData
  });
  this.responseData = await this.response.json();
});

Then('the response should contain the updated order data', async function() {
  expect(this.responseData.data).toBeDefined();
  expect(this.responseData.data).toHaveProperty('orderId');
});

Then('the order status should be {string}', async function(status) {
  expect(this.responseData.data.status).toBe(status);
});

Then('the order quantity should be {int}', async function(quantity) {
  expect(this.responseData.data.quantity).toBe(quantity);
});

// Update with invalid data steps
When('I send a PUT request to {string} with invalid data', async function(endpoint, dataTable) {
  const data = dataTable.rowsHash();
  this.updatedData = {};
  
  Object.keys(data).forEach(key => {
    if (key === 'quantity') {
      this.updatedData[key] = parseInt(data[key]);
    } else {
      this.updatedData[key] = data[key];
    }
  });
  
  this.response = await this.apiContext.put(endpoint, {
    data: this.updatedData
  });
  this.responseData = await this.response.json();
});

// Delete order steps
When('I send a DELETE request to {string}', async function(endpoint) {
  this.response = await this.apiContext.delete(endpoint);
  this.responseData = await this.response.json();
});

Then('the order with ID {string} should no longer exist', async function(orderId) {
  const response = await this.apiContext.get(`/orders/${orderId}`);
  expect(response.status()).toBe(404);
});

// Release order steps
Then('the order has status {string}', async function(status) {
  // Verify the order status in the current context
  expect(this.orderCurrentData?.status || this.responseData.data?.status).toBe(status);
});

Then('the response should contain the released order data', async function() {
  expect(this.responseData.data).toBeDefined();
  expect(this.responseData.data).toHaveProperty('orderId');
});

Then('the order status should be updated to reflect the release', async function() {
  expect(this.responseData.data.status).toBeDefined();
  expect(this.responseData.data.status).not.toBeNull();
});

// Server error handling steps
Given('the order service encounters an unexpected error', async function() {
  // This would typically involve mocking or stubbing the service to throw an error
  // For now, we'll just set a flag
  this.serviceError = true;
});