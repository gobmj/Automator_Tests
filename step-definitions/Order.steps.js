// Auto-generated step definitions for backend/src/models/Order.js
// Generated on: 2026-05-24T18:49:01.842Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'

Before(async function () {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.orders = []
  this.response = null
  this.responseData = null
  this.error = null
  this.createdOrderIds = new Set()
})

After(async function () {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
})

Given('the order system is initialized', async function () {
  this.systemInitialized = true
})

Given('the database is ready to store orders', async function () {
  this.databaseReady = true
})

When('I create an order with the following details:', async function (dataTable) {
  const orderData = {}
  dataTable.hashes().forEach(row => {
    const key = row.Field
    let value = row.Value
    if (key === 'quantity' || key === 'priority') {
      value = parseInt(value, 10)
    }
    orderData[key] = value
  })

  try {
    this.response = await this.apiContext.post('/orders', {
      data: orderData
    })
    this.responseData = await this.response.json()
    this.createdOrderIds.add(orderData.orderId)
    this.lastCreatedOrder = this.responseData
    this.error = null
  } catch (err) {
    this.error = err
  }
})

When('I create an order with minimal required details:', async function (dataTable) {
  const orderData = {}
  dataTable.hashes().forEach(row => {
    const key = row.Field
    let value = row.Value
    if (key === 'quantity' || key === 'priority') {
      value = parseInt(value, 10)
    }
    orderData[key] = value
  })

  try {
    this.response = await this.apiContext.post('/orders', {
      data: orderData
    })
    this.responseData = await this.response.json()
    this.createdOrderIds.add(orderData.orderId)
    this.lastCreatedOrder = this.responseData
    this.error = null
  } catch (err) {
    this.error = err
  }
})

Then('the order should be created successfully', async function () {
  expect(this.response.status()).toBe(201)
  expect(this.responseData).toBeDefined()
  expect(this.responseData.orderId).toBeDefined()
})

Then('the order status should be {string}', async function (expectedStatus) {
  expect(this.responseData.status).toBe(expectedStatus)
})

Then('the order should have a unique orderId {string}', async function (expectedOrderId) {
  expect(this.responseData.orderId).toBe(expectedOrderId)
})

Then('the order priority should default to {int}', async function (expectedPriority) {
  expect(this.responseData.priority).toBe(expectedPriority)
})

Then('the order status should default to {string}', async function (expectedStatus) {
  expect(this.responseData.status).toBe(expectedStatus)
})

Then('the order should have a creation timestamp', async function () {
  expect(this.responseData.created_date).toBeDefined()
})

Given('an order with orderId {string} already exists', async function (orderId) {
  const orderData = {
    orderId: orderId,
    orderNumber: 'PO-EXISTING',
    material: 'STEEL-EXISTING',
    quantity: 100,
    plant: 'PLANT-EXISTING',
    scheduledStartDate: '2024-02-01T08:00:00',
    scheduledCompletionDate: '2024-02-05T17:00:00'
  }

  this.response = await this.apiContext.post('/orders', {
    data: orderData
  })
  this.createdOrderIds.add(orderId)
})

When('I attempt to create another order with orderId {string}', async function (orderId) {
  const orderData = {
    orderId: orderId,
    orderNumber: 'PO-DUPLICATE',
    material: 'STEEL-DUP',
    quantity: 50,
    plant: 'PLANT-DUP',
    scheduledStartDate: '2024-02-10T08:00:00',
    scheduledCompletionDate: '2024-02-12T17:00:00'
  }

  try {
    this.response = await this.apiContext.post('/orders', {
      data: orderData
    })
    this.responseData = await this.response.json()
  } catch (err) {
    this.error = err
  }
})

Then('the order creation should fail', async function () {
  expect(this.response.status()).toBeGreaterThanOrEqual(400)
})

Then('an error message should indicate the orderId is not unique', async function () {
  const responseData = await this.response.json()
  expect(responseData.message || responseData.error).toMatch(/orderId|unique|duplicate/i)
})

When('I attempt to create an order with quantity {int}', async function (quantity) {
  const orderData = {
    orderId: `ORD-TEST-${Date.now()}`,
    orderNumber: `PO-TEST-${Date.now()}`,
    material: 'STEEL-TEST',
    quantity: quantity,
    plant: 'PLANT-TEST',
    scheduledStartDate: '2024-02-01T08:00:00',
    scheduledCompletionDate: '2024-02-05T17:00:00'
  }

  try {
    this.response = await this.apiContext.post('/orders', {
      data: orderData
    })
    this.responseData = await this.response.json()
  } catch (err) {
    this.error = err
  }
})

Then('an error message should indicate quantity must be at least {int}', async function (minQuantity) {
  const responseData = await this.response.json()
  expect(responseData.message || responseData.error).toMatch(/quantity|at least/i)
})

When('I attempt to create an order with priority {int}', async function (priority) {
  const orderData = {
    orderId: `ORD-TEST-${Date.now()}`,
    orderNumber: `PO-TEST-${Date.now()}`,
    material: 'STEEL-TEST',
    quantity: 100,
    priority: priority,
    plant: 'PLANT-TEST',
    scheduledStartDate: '2024-02-01T08:00:00',
    scheduledCompletionDate: '2024-02-05T17:00:00'
  }

  try {
    this.response = await this.apiContext.post('/orders', {
      data: orderData
    })
    this.responseData = await this.response.json()
  } catch (err) {
    this.error = err
  }
})

Then('an error message should indicate priority must be between {int} and {int}', async function (min, max) {
  const responseData = await this.response.json()
  expect(responseData.message || responseData.error).toMatch(/priority|between/i)
})

When('I attempt to create an order with the following dates:', async function (dataTable) {
  const dates = {}
  dataTable.hashes().forEach(row => {
    dates[row.Field] = row.Value
  })

  const orderData = {
    orderId: `ORD-TEST-${Date.now()}`,
    orderNumber: `PO-TEST-${Date.now()}`,
    material: 'STEEL-TEST',
    quantity: 100,
    plant: 'PLANT-TEST',
    scheduledStartDate: dates.scheduledStartDate,
    scheduledCompletionDate: dates.scheduledCompletionDate
  }

  try {
    this.response = await this.apiContext.post('/orders', {
      data: orderData
    })
    this.responseData = await this.response.json()
  } catch (err) {
    this.error = err
  }
})

Then('an error message should state {string}', async function (expectedMessage) {
  const responseData = await this.response.json()
  expect(responseData.message || responseData.error).toContain(expectedMessage)
})

When('I attempt to create an order without the following fields:', async function (dataTable) {
  const fieldsToOmit = dataTable.hashes().map(row => row.Field)
  
  const orderData = {
    orderId: 'ORD-TEST-INCOMPLETE',
    orderNumber: 'PO-TEST-INCOMPLETE',
    material: 'STEEL-TEST',
    quantity: 100,
    plant: 'PLANT-TEST',
    scheduledStartDate: '2024-02-01T08:00:00',
    scheduledCompletionDate: '2024-02-05T17:00:00'
  }

  fieldsToOmit.forEach(field => {
    delete orderData[field]
  })

  try {
    this.response = await this.apiContext.post('/orders', {
      data: orderData
    })
    this.responseData = await this.response.json()
  } catch (err) {
    this.error = err
  }
})

Then('an error message should indicate required fields are missing', async function () {
  const responseData = await this.response.json()
  expect(responseData.message || responseData.error).toMatch(/required|missing/i)
})

When('I create an order with status {string}', async function (status) {
  const orderData = {
    orderId: `ORD-STATUS-${Date.now()}`,
    orderNumber: `PO-STATUS-${Date.now()}`,
    material: 'STEEL-STATUS',
    quantity: 100,
    status: status,
    plant: 'PLANT-STATUS',
    scheduledStartDate: '2024-02-01T08:00:00',
    scheduledCompletionDate: '2024-02-05T17:00:00'
  }

  this.response = await this.apiContext.post('/orders', {
    data: orderData
  })
  this.responseData = await this.response.json()
  this.lastCreatedOrder = this.responseData
  this.createdOrderIds.add(orderData.orderId)
})

When('I update the order status to {string}', async function (newStatus) {
  const orderId = this.lastCreatedOrder.orderId
  this.response = await this.apiContext.patch(`/orders/${orderId}`, {
    data: { status: newStatus }
  })
  this.responseData = await this.response.json()
  this.lastCreatedOrder = this.responseData
})

Then('the order should have a created_date timestamp', async function () {
  expect(this.responseData.created_date).toBeDefined()
  expect(typeof this.responseData.created_date).toBe('string')
})

Then('the order should have an updated_at timestamp', async function () {
  expect(this.responseData.updated_at).toBeDefined()
  expect(typeof this.responseData.updated_at).toBe('string')
})

When('I update the order priority to {int}', async function (newPriority) {
  const orderId = this.lastCreatedOrder.orderId
  this.originalUpdatedAt = this.lastCreatedOrder.updated_at
  
  await new Promise(resolve => setTimeout(resolve, 100))
  
  this.response = await this.apiContext.patch(`/orders/${orderId}`, {
    data: { priority: newPriority }
  })
  this.responseData = await this.response.json()