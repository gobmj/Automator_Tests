// Auto-generated step definitions for backend/src/middleware/validator.js
// Generated on: 2026-05-24T18:48:49.137Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'

Before(async function () {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.requestPayload = {}
  this.response = null
  this.responseData = null
  this.validStatuses = ['CREATED', 'RELEASABLE', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']
})

After(async function () {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
})

Given('the validation middleware is configured', async function () {
  this.middlewareConfigured = true
})

Given('the system expects ISO 8601 date format', async function () {
  this.dateFormat = 'ISO 8601'
})

Given('I have a valid order creation request with all required fields', async function (dataTable) {
  this.requestPayload = {}
  const rows = dataTable.hashes()
  rows.forEach(row => {
    const key = row.field
    const value = row.value
    if (value === 'true') this.requestPayload[key] = true
    else if (value === 'false') this.requestPayload[key] = false
    else if (!isNaN(value) && value !== '') this.requestPayload[key] = Number(value)
    else this.requestPayload[key] = value
  })
  this.requestType = 'create'
})

Given('I have an order creation request without an order number', async function () {
  this.requestPayload = {
    material: 'Steel Plate',
    quantity: 100,
    priority: 5,
    status: 'CREATED',
    plant: 'Plant A',
    scheduledStartDate: '2024-01-15T08:00:00Z',
    scheduledCompletionDate: '2024-01-20T17:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have an order creation request with order number exceeding 50 characters', async function (dataTable) {
  this.requestPayload = {
    orderNumber: dataTable.hashes()[0].value,
    material: 'Steel Plate',
    quantity: 100,
    priority: 5,
    status: 'CREATED',
    plant: 'Plant A',
    scheduledStartDate: '2024-01-15T08:00:00Z',
    scheduledCompletionDate: '2024-01-20T17:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have an order creation request without material', async function () {
  this.requestPayload = {
    orderNumber: 'ORD-2024-001',
    quantity: 100,
    priority: 5,
    status: 'CREATED',
    plant: 'Plant A',
    scheduledStartDate: '2024-01-15T08:00:00Z',
    scheduledCompletionDate: '2024-01-20T17:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have an order creation request with material exceeding 100 characters', async function () {
  this.requestPayload = {
    orderNumber: 'ORD-2024-001',
    material: 'A'.repeat(101),
    quantity: 100,
    priority: 5,
    status: 'CREATED',
    plant: 'Plant A',
    scheduledStartDate: '2024-01-15T08:00:00Z',
    scheduledCompletionDate: '2024-01-20T17:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have an order creation request with invalid quantity', async function (dataTable) {
  this.requestPayload = {
    orderNumber: 'ORD-2024-001',
    material: 'Steel Plate',
    quantity: Number(dataTable.hashes()[0].value),
    priority: 5,
    status: 'CREATED',
    plant: 'Plant A',
    scheduledStartDate: '2024-01-15T08:00:00Z',
    scheduledCompletionDate: '2024-01-20T17:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have an order creation request with negative quantity', async function (dataTable) {
  this.requestPayload = {
    orderNumber: 'ORD-2024-001',
    material: 'Steel Plate',
    quantity: Number(dataTable.hashes()[0].value),
    priority: 5,
    status: 'CREATED',
    plant: 'Plant A',
    scheduledStartDate: '2024-01-15T08:00:00Z',
    scheduledCompletionDate: '2024-01-20T17:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have an order creation request with non-integer quantity', async function (dataTable) {
  this.requestPayload = {
    orderNumber: 'ORD-2024-001',
    material: 'Steel Plate',
    quantity: Number(dataTable.hashes()[0].value),
    priority: 5,
    status: 'CREATED',
    plant: 'Plant A',
    scheduledStartDate: '2024-01-15T08:00:00Z',
    scheduledCompletionDate: '2024-01-20T17:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have a valid order creation request with priority set to {int}', async function (priority) {
  this.requestPayload = {
    orderNumber: 'ORD-2024-001',
    material: 'Steel Plate',
    quantity: 100,
    priority: priority,
    status: 'CREATED',
    plant: 'Plant A',
    scheduledStartDate: '2024-01-15T08:00:00Z',
    scheduledCompletionDate: '2024-01-20T17:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have an order creation request with priority outside the range 1-1000', async function (dataTable) {
  this.requestPayload = {
    orderNumber: 'ORD-2024-001',
    material: 'Steel Plate',
    quantity: 100,
    priority: Number(dataTable.hashes()[0].value),
    status: 'CREATED',
    plant: 'Plant A',
    scheduledStartDate: '2024-01-15T08:00:00Z',
    scheduledCompletionDate: '2024-01-20T17:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have a valid order creation request with status {string}', async function (status) {
  this.requestPayload = {
    orderNumber: 'ORD-2024-001',
    material: 'Steel Plate',
    quantity: 100,
    priority: 5,
    status: status,
    plant: 'Plant A',
    scheduledStartDate: '2024-01-15T08:00:00Z',
    scheduledCompletionDate: '2024-01-20T17:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have an order creation request with invalid status {string}', async function (status) {
  this.requestPayload = {
    orderNumber: 'ORD-2024-001',
    material: 'Steel Plate',
    quantity: 100,
    priority: 5,
    status: status,
    plant: 'Plant A',
    scheduledStartDate: '2024-01-15T08:00:00Z',
    scheduledCompletionDate: '2024-01-20T17:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have an order creation request without plant', async function () {
  this.requestPayload = {
    orderNumber: 'ORD-2024-001',
    material: 'Steel Plate',
    quantity: 100,
    priority: 5,
    status: 'CREATED',
    scheduledStartDate: '2024-01-15T08:00:00Z',
    scheduledCompletionDate: '2024-01-20T17:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have an order creation request with plant exceeding 50 characters', async function () {
  this.requestPayload = {
    orderNumber: 'ORD-2024-001',
    material: 'Steel Plate',
    quantity: 100,
    priority: 5,
    status: 'CREATED',
    plant: 'P'.repeat(51),
    scheduledStartDate: '2024-01-15T08:00:00Z',
    scheduledCompletionDate: '2024-01-20T17:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have an order creation request without scheduled start date', async function () {
  this.requestPayload = {
    orderNumber: 'ORD-2024-001',
    material: 'Steel Plate',
    quantity: 100,
    priority: 5,
    status: 'CREATED',
    plant: 'Plant A',
    scheduledCompletionDate: '2024-01-20T17:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have an order creation request with invalid scheduled start date format', async function (dataTable) {
  this.requestPayload = {
    orderNumber: 'ORD-2024-001',
    material: 'Steel Plate',
    quantity: 100,
    priority: 5,
    status: 'CREATED',
    plant: 'Plant A',
    scheduledStartDate: dataTable.hashes()[0].value,
    scheduledCompletionDate: '2024-01-20T17:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have an order creation request without scheduled completion date', async function () {
  this.requestPayload = {
    orderNumber: 'ORD-2024-001',
    material: 'Steel Plate',
    quantity: 100,
    priority: 5,
    status: 'CREATED',
    plant: 'Plant A',
    scheduledStartDate: '2024-01-15T08:00:00Z'
  }
  this.requestType = 'create'
})

Given('I have an order creation request with invalid scheduled completion date format', async function (dataTable) {
  this.requestPayload = {
    orderNumber: 'ORD-2024-001',
    material: 'Steel Plate',
    quantity: 100,
    priority: 5,
    status: 'CREATED',
    plant: 'Plant A',
    scheduledStartDate: '2024-01-15T08:00:00Z',
    scheduledCompletionDate: dataTable.hashes()[0].value
  }
  this.requestType = 'create'
})

Given('I have an order creation request with completion date before start date', async function (dataTable) {
  this.requestPayload = {}
  const rows = dataTable.hashes()
  rows.forEach(row => {
    this.requestPayload[row.field] = row.value
  })
  this.requestPayload.orderNumber = 'ORD-2024-001'
  this.requestPayload.material = 'Steel Plate'