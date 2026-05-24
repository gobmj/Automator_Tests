// Auto-generated step definitions for frontend/src/services/orderService.js
// Generated on: 2026-05-24T18:52:10.492Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'

Before(async function () {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.orders = []
  this.response = null
  this.responseData = null
  this.currentOrderId = null
  this.orderDataTable = {}
  this.searchResults = []
  this.errorResponse = null
  this.totalOrdersInSystem = 0
  this.ordersWithStatus = {}
  this.existingOrder = null
  this.updateDataTable = {}
  this.apiUnavailable = false
})

After(async function () {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
})

// Background steps
Given('the order service is initialized', async function () {
  expect(this.apiContext).toBeDefined()
})

Given('the API base URL is configured', async function () {
  expect(this.apiContext).toBeDefined()
  const baseURL = this.apiContext._baseURL || process.env.API_BASE_URL || 'http://localhost:3000/api'
  expect(baseURL).toBeTruthy()
})

Given('the axios client is ready with JSON content type headers', async function () {
  expect(this.apiContext).toBeDefined()
})

// Create order steps
Given('I have valid order data', async function (dataTable) {
  this.orderDataTable = dataTable.rowsHash()
})

When('I create a new order', async function () {
  const payload = {
    status: this.orderDataTable.status,
    plant: this.orderDataTable.plant,
    quantity: parseInt(this.orderDataTable.quantity),
    material: this.orderDataTable.material
  }
  
  try {
    this.response = await this.apiContext.post('/orders', {
      data: payload
    })
    
    if (this.response.ok()) {
      this.responseData = await this.response.json()
    }
  } catch (error) {
    this.errorResponse = error
  }
})

Then('the order should be created successfully', async function () {
  expect(this.response.ok()).toBeTruthy()
  expect(this.response.status()).toBe(201)
})

Then('the response should contain the created order details', async function () {
  expect(this.responseData).toBeDefined()
  expect(this.responseData.status).toBe(this.orderDataTable.status)
  expect(this.responseData.plant).toBe(this.orderDataTable.plant)
  expect(this.responseData.quantity).toBe(parseInt(this.orderDataTable.quantity))
  expect(this.responseData.material).toBe(this.orderDataTable.material)
})

Then('the order should have a unique orderId', async function () {
  expect(this.responseData.orderId).toBeDefined()
  expect(typeof this.responseData.orderId).toBe('string')
  this.currentOrderId = this.responseData.orderId
})

// Retrieve all orders steps
Given('there are {int} orders in the system', async function (count) {
  this.totalOrdersInSystem = count
  this.orders = []
  for (let i = 0; i < count; i++) {
    this.orders.push({
      orderId: `ORD-${String(i + 1).padStart(5, '0')}`,
      status: ['RELEASABLE', 'RELEASED', 'PENDING', 'CANCELLED'][i % 4],
      plant: `Plant-${String.fromCharCode(65 + (i % 3))}`,
      quantity: 100 + i * 10,
      material: `MAT-${String(i + 1).padStart(3, '0')}`
    })
  }
})

When('I retrieve all orders without specifying parameters', async function () {
  try {
    this.response = await this.apiContext.get('/orders')
    if (this.response.ok()) {
      this.responseData = await this.response.json()
    }
  } catch (error) {
    this.errorResponse = error
  }
})

Then('I should receive all orders', async function () {
  expect(this.response.ok()).toBeTruthy()
  expect(this.responseData).toBeDefined()
  expect(Array.isArray(this.responseData.data || this.responseData)).toBeTruthy()
})

Then('the response should contain order list data', async function () {
  const orderList = this.responseData.data || this.responseData
  expect(orderList.length).toBeGreaterThan(0)
})

// Retrieve orders with pagination and filters
When('I retrieve all orders with the following parameters', async function (dataTable) {
  const params = dataTable.rowsHash()
  const queryParams = new URLSearchParams()
  
  if (params.page) queryParams.append('page', params.page)
  if (params.limit) queryParams.append('limit', params.limit)
  if (params.status) queryParams.append('status', params.status)
  
  try {
    this.response = await this.apiContext.get(`/orders?${queryParams.toString()}`)
    if (this.response.ok()) {
      this.responseData = await this.response.json()
    }
  } catch (error) {
    this.errorResponse = error
  }
})

Then('I should receive {int} orders', async function (expectedCount) {
  expect(this.response.ok()).toBeTruthy()
  const orderList = this.responseData.data || this.responseData
  expect(orderList.length).toBe(expectedCount)
})

Then('the response should contain paginated order data', async function () {
  expect(this.responseData).toBeDefined()
  const orderList = this.responseData.data || this.responseData
  expect(Array.isArray(orderList)).toBeTruthy()
})

// Retrieve specific order by ID
Given('an order with ID {string} exists in the system', async function (orderId) {
  this.currentOrderId = orderId
  this.existingOrder = {
    orderId: orderId,
    status: 'RELEASABLE',
    plant: 'Plant-A',
    quantity: 100,
    material: 'MAT-001'
  }
})

When('I retrieve the order by its ID', async function () {
  try {
    this.response = await this.apiContext.get(`/orders/${this.currentOrderId}`)
    if (this.response.ok()) {
      this.responseData = await this.response.json()
    }
  } catch (error) {
    this.errorResponse = error
  }
})

Then('the order details should be returned successfully', async function () {
  expect(this.response.ok()).toBeTruthy()
  expect(this.response.status()).toBe(200)
})

Then('the response should contain the correct order information', async function () {
  expect(this.responseData).toBeDefined()
  expect(this.responseData.orderId).toBe(this.currentOrderId)
})

Then('the order ID should match {string}', async function (expectedOrderId) {
  expect(this.responseData.orderId).toBe(expectedOrderId)
})

// Retrieve non-existent order
Given('no order exists with ID {string}', async function (orderId) {
  this.currentOrderId = orderId
})

When('I attempt to retrieve the order by ID {string}', async function (orderId) {
  this.currentOrderId = orderId
  try {
    this.response = await this.apiContext.get(`/orders/${orderId}`)
    if (!this.response.ok()) {
      this.errorResponse = await this.response.json()
    }
  } catch (error) {
    this.errorResponse = error
  }
})

Then('an error should be returned', async function () {
  expect(this.response.ok()).toBeFalsy()
  expect(this.errorResponse).toBeDefined()
})

Then('the error should indicate the order was not found', async function () {
  expect(this.response.status()).toBe(404)
  expect(this.errorResponse.message || this.errorResponse.error).toContain('not found')
})

// Update order steps
Given('the order has the following data', async function (dataTable) {
  this.existingOrder = { ...this.existingOrder, ...dataTable.rowsHash() }
})

When('I update the order with the following data', async function (dataTable) {
  this.updateDataTable = dataTable.rowsHash()
  const payload = {
    status: this.updateDataTable.status,
    quantity: parseInt(this.updateDataTable.quantity)
  }
  
  try {
    this.response = await this.apiContext.put(`/orders/${this.currentOrderId}`, {
      data: payload
    })
    
    if (this.response.ok()) {
      this.responseData = await this.response.json()
    }
  } catch (error) {
    this.errorResponse = error
  }
})

Then('the order should be updated successfully', async function () {
  expect(this.response.ok()).toBeTruthy()
  expect(this.response.status()).toBe(200)
})

Then('the response should contain the updated order details', async function () {
  expect(this.responseData).toBeDefined()
  expect(this.responseData.status).toBe(this.updateDataTable.status)
  expect(this.responseData.quantity).toBe(parseInt(this.updateDataTable.quantity))
})

// Delete order steps
When('I delete the order', async function () {
  try {
    this.response = await this.apiContext.delete(`/orders/${this.currentOrderId}`)
    if (this.response.ok()) {
      this.responseData = await this.response.json()
    }
  } catch (error) {
    this.errorResponse = error
  }
})

Then('the order should be deleted successfully', async function () {
  expect(this.response.ok()).toBeTruthy()
  expect(this.response.status()).toBe(200)
})

Then('the response should confirm the deletion', async function () {
  expect(this.responseData).toBeDefined()
})

// Delete non-existent order
When('I attempt to delete the order with ID {string}', async function (orderId) {
  this.currentOrderId = orderId
  try {
    this.response = await this.apiContext.delete(`/orders/${orderId}`)
    if (!this.response.ok()) {
      this.errorResponse = await this.response.json()
    }
  } catch (error) {
    this.errorResponse = error
  }
})

// Release order steps
Given('the order has status {string}', async function (status) {
  this.existingOrder = { ...this.existingOrder, status: status }
})

When('I release the order', async function () {
  try {
    this.response = await this.apiContext.post(`/orders/${this.currentOrderId}/release`, {
      data: {}
    })
    
    if (this.response.ok()) {
      this.responseData = await this.response.json()
    }
  } catch (error) {
    this.errorResponse = error
  }
})

Then('the order should be released successfully', async function () {
  expect(this.response.ok()).toBeTruthy()
  expect(this.response.status()).toBe(200)
})

Then('the response should contain the released order details', async function () {
  expect(this.responseData).toBeDefined()
  expect(this.responseData.orderId).toBe(this.currentOrderId)
})

Then('the order status should be updated', async function () {
  expect(this.responseData.status).toBe('RELEASED')
})

// Attempt to release already released order
When('I attempt to release the order