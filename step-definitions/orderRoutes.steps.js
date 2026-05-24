// Auto-generated step definitions for backend/src/routes/orderRoutes.js
// Generated on: 2026-05-24T18:49:16.218Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'

Before(async function () {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.response = null
  this.responseData = null
  this.createdOrderId = null
  this.orders = []
  this.bulkUpdateIds = []
  this.searchResults = []
  this.filteredOrders = []
  this.updatePayload = {}
})

After(async function () {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
})

// Background steps
Given('the order API is available', async function () {
  this.apiAvailable = true
})

Given('the system has proper validation middleware configured', async function () {
  this.validationConfigured = true
})

// Retrieve order statistics
When('I request order statistics', async function () {
  this.response = await this.apiContext.get('/orders/statistics')
  this.responseData = await this.response.json()
})

Then('the system should return aggregated order statistics', async function () {
  expect(this.response.status()).toBe(200)
  expect(this.responseData).toBeDefined()
})

Then('the response should contain order counts by status', async function () {
  expect(this.responseData).toHaveProperty('countByStatus')
  expect(typeof this.responseData.countByStatus).toBe('object')
})

Then('the response should include total order value', async function () {
  expect(this.responseData).toHaveProperty('totalOrderValue')
  expect(typeof this.responseData.totalOrderValue).toBe('number')
})

// Bulk update order statuses
Given('there are multiple orders in the system', async function () {
  const response = await this.apiContext.get('/orders?limit=100')
  const data = await response.json()
  this.orders = data.orders || data
  this.bulkUpdateIds = this.orders.slice(0, 3).map(order => order.id || order._id)
})

When('I submit a bulk status update request with order IDs and new status', async function () {
  this.response = await this.apiContext.patch('/orders/bulk-update', {
    data: {
      orderIds: this.bulkUpdateIds,
      status: 'processing'
    }
  })
  this.responseData = await this.response.json()
})

Then('all specified orders should have their status updated', async function () {
  expect(this.response.status()).toBe(200)
  expect(this.responseData).toHaveProperty('updatedCount')
  expect(this.responseData.updatedCount).toBeGreaterThan(0)
})

Then('the system should return confirmation of updated orders', async function () {
  expect(this.responseData).toHaveProperty('updatedOrders')
  expect(Array.isArray(this.responseData.updatedOrders)).toBe(true)
})

Then('the system should log the bulk update action', async function () {
  expect(this.responseData).toHaveProperty('timestamp')
})

// Escalate order priority successfully
Given('an order with ID {string} exists in the system', async function (orderId) {
  this.testOrderId = orderId
  const response = await this.apiContext.get(`/orders/${orderId}`)
  if (response.status() === 404) {
    await this.apiContext.post('/orders', {
      data: {
        id: orderId,
        customerId: 'CUST-001',
        items: 1,
        totalAmount: 100.00,
        shippingAddress: '123 Main St, City, State',
        priority: 'normal'
      }
    })
  }
})

When('I request to escalate the priority for order {string}', async function (orderId) {
  this.response = await this.apiContext.patch(`/orders/${orderId}/escalate`, {
    data: {}
  })
  this.responseData = await this.response.json()
})

Then('the order priority should be increased', async function () {
  expect(this.response.status()).toBe(200)
  expect(this.responseData).toHaveProperty('priority')
})

Then('the system should return the updated order with new priority', async function () {
  expect(this.responseData).toHaveProperty('id')
  expect(this.responseData).toHaveProperty('priority')
})

Then('the order should be marked as escalated', async function () {
  expect(this.responseData).toHaveProperty('escalated')
  expect(this.responseData.escalated).toBe(true)
})

// Escalate order priority with invalid order ID
When('I request to escalate priority for order ID {string}', async function (orderId) {
  this.response = await this.apiContext.patch(`/orders/${orderId}/escalate`, {
    data: {}
  })
  if (this.response.status() !== 204) {
    this.responseData = await this.response.json()
  }
})

Then('the system should return a validation error', async function () {
  expect([400, 404, 422]).toContain(this.response.status())
  expect(this.responseData).toHaveProperty('error')
})

Then('the response status should be 400 Bad Request', async function () {
  expect(this.response.status()).toBe(400)
})

// Search orders with keywords
Given('the system contains multiple orders with various details', async function () {
  const response = await this.apiContext.get('/orders?limit=50')
  this.orders = await response.json()
})

When('I search for orders using keyword {string}', async function (keyword) {
  this.response = await this.apiContext.get(`/orders/search?keyword=${keyword}`)
  this.responseData = await this.response.json()
  this.searchResults = this.responseData.orders || this.responseData
})

Then('the system should return matching orders', async function () {
  expect(this.response.status()).toBe(200)
  expect(Array.isArray(this.searchResults)).toBe(true)
})

Then('the results should contain only orders matching the search criteria', async function () {
  const keyword = 'urgent'
  this.searchResults.forEach(order => {
    const orderString = JSON.stringify(order).toLowerCase()
    expect(orderString).toContain(keyword.toLowerCase())
  })
})

// Get orders filtered by status
Given('the system contains orders with different statuses', async function () {
  const response = await this.apiContext.get('/orders?limit=50')
  this.orders = await response.json()
})

When('I request orders with status {string}', async function (status) {
  this.response = await this.apiContext.get(`/orders?status=${status}`)
  if (this.response.status() !== 204) {
    this.responseData = await this.response.json()
    this.filteredOrders = this.responseData.orders || this.responseData
  }
})

Then('the system should return only orders with {string} status', async function (status) {
  expect(this.response.status()).toBe(200)
  if (Array.isArray(this.filteredOrders)) {
    this.filteredOrders.forEach(order => {
      expect(order.status).toBe(status)
    })
  }
})

Then('the response should include order details for matching orders', async function () {
  expect(Array.isArray(this.filteredOrders)).toBe(true)
  if (this.filteredOrders.length > 0) {
    expect(this.filteredOrders[0]).toHaveProperty('id')
    expect(this.filteredOrders[0]).toHaveProperty('status')
  }
})

// Get orders filtered by status with invalid status
Then('the response status should be 404 Not Found', async function () {
  expect(this.response.status()).toBe(404)
})

// Create new order successfully
When('I submit a valid order creation request with the following details:', async function (dataTable) {
  const orderData = {}
  dataTable.hashes().forEach(row => {
    orderData[row.field] = isNaN(row.value) ? row.value : parseFloat(row.value)
  })
  this.response = await this.apiContext.post('/orders', {
    data: orderData
  })
  this.responseData = await this.response.json()
  this.createdOrderId = this.responseData.id || this.responseData._id
})

Then('the system should create a new order', async function () {
  expect(this.response.status()).toBe(201)
  expect(this.responseData).toBeDefined()
})

Then('the response should contain the order ID', async function () {
  expect(this.responseData).toHaveProperty('id')
  expect(this.createdOrderId).toBeTruthy()
})

Then('the response status should be 201 Created', async function () {
  expect(this.response.status()).toBe(201)
})

// Create order with invalid data
When('I submit an order creation request with missing required fields', async function () {
  this.response = await this.apiContext.post('/orders', {
    data: {
      customerId: 'CUST-001'
    }
  })
  if (this.response.status() !== 204) {
    this.responseData = await this.response.json()
  }
})

// Get all orders with pagination
Given('the system contains multiple orders', async function () {
  const response = await this.apiContext.get('/orders?limit=100')
  this.orders = await response.json()
})

When('I request all orders with page number {int} and limit {int}', async function (page, limit) {
  this.response = await this.apiContext.get(`/orders?page=${page}&limit=${limit}`)
  this.responseData = await this.response.json()
})

Then('the system should return paginated order results', async function () {
  expect(this.response.status()).toBe(200)
  expect(this.responseData).toBeDefined()
})

Then('the response should include pagination metadata', async function () {
  expect(this.responseData).toHaveProperty('pagination')
  expect(this.responseData.pagination).toHaveProperty('page')
  expect(this.responseData.pagination).toHaveProperty('limit')
})

Then('the response should contain up to {int} orders', async function (limit) {
  const orders = this.responseData.orders || this.responseData
  expect(Array.isArray(orders)).toBe(true)
  expect(orders.length).toBeLessThanOrEqual(limit)
})

// Get all orders with filtering
Given('the system contains orders with various attributes', async function () {
  const response = await this.apiContext.get('/orders?limit=100')
  this.orders = await response.json()
})

When('I request all orders with filters applied', async function () {
  this.response = await this.apiContext.get('/orders?status=pending&priority=high')
  this.responseData = await this.response.json()
  this.filteredOrders = this.responseData.orders || this.responseData
})

Then('the system should return filtered order results', async function () {
  expect(this.response.status()).toBe(200)
  expect(Array.isArray(this.filteredOrders)).toBe(true)
})

Then('the results should match the applied filter criteria', async function () {
  this.filteredOrders.forEach(order => {
    expect(order.status).toBe('pending')
    expect(order.priority).toBe('high')
  })
})

// Get order by ID successfully
When('I request the order with ID {string}', async function (orderId) {
  this.response = await this.apiContext.get(`/orders/${orderId}`)
  if (this.response.status() !== 204) {