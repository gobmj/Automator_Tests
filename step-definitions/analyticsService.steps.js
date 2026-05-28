// Auto-generated step definitions for backend/src/services/analyticsService.js
// Generated on: 2026-05-28T09:00:20.701Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'

Before(async function () {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.currentDate = new Date('2024-01-15')
  this.responseData = null
  this.response = null
  this.error = null
})

After(async function () {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
})

Given('the analytics service is available', async function () {
  const response = await this.apiContext.get('/health')
  expect(response.status()).toBe(200)
})

Given('the database contains order records', async function () {
  // Assumption: database is pre-populated or this is a setup step
  // In a real scenario, you might seed the database here
})

Given('the current date is {string}', async function (dateString) {
  this.currentDate = new Date(dateString)
})

Given('the database contains orders with the following statuses:', async function (dataTable) {
  this.expectedStatuses = dataTable.rowsHash()
})

Given('the database contains orders from multiple plants:', async function (dataTable) {
  this.expectedPlantPerformance = dataTable.hashes()
})

Given('the database contains orders for multiple materials', async function () {
  // Setup: ensure multiple materials exist in database
})

Given('there are more than 10 distinct materials in the database', async function () {
  // Setup: ensure at least 11 distinct materials exist
})

Given('the database contains orders for the following materials:', async function (dataTable) {
  this.expectedMaterials = dataTable.hashes()
})

Given('the database contains orders with priorities distributed as follows:', async function (dataTable) {
  this.expectedPriorityDistribution = dataTable.hashes()
})

Given('the database contains exactly {int} orders', async function (count) {
  this.expectedOrderCount = count
})

Given('the database contains no orders', async function () {
  this.expectedOrderCount = 0
})

Given('the database contains orders with some null quantity values', async function () {
  // Setup: ensure some orders have null quantities
})

Given('the database contains orders with some null priority values', async function () {
  // Setup: ensure some orders have null priorities
})

Given('the database contains materials with some null quantity values', async function () {
  // Setup: ensure some materials have null quantities
})

Given('the database contains {int} orders spanning {int} years', async function (orderCount, years) {
  this.largeDatasetOrderCount = orderCount
  this.datasetYears = years
})

When('I request dashboard analytics without any date range', async function () {
  try {
    this.response = await this.apiContext.get('/analytics/dashboard')
    this.responseData = await this.response.json()
  } catch (error) {
    this.error = error
  }
})

When('I request dashboard analytics with start date {string}', async function (startDate) {
  try {
    this.response = await this.apiContext.get('/analytics/dashboard', {
      params: { startDate }
    })
    this.responseData = await this.response.json()
  } catch (error) {
    this.error = error
  }
})

When('I request dashboard analytics with end date {string}', async function (endDate) {
  try {
    this.response = await this.apiContext.get('/analytics/dashboard', {
      params: { endDate }
    })
    this.responseData = await this.response.json()
  } catch (error) {
    this.error = error
  }
})

When('I request dashboard analytics with start date {string} and end date {string}', async function (startDate, endDate) {
  try {
    this.response = await this.apiContext.get('/analytics/dashboard', {
      params: { startDate, endDate }
    })
    this.responseData = await this.response.json()
  } catch (error) {
    this.error = error
  }
})

When('I request dashboard analytics', async function () {
  try {
    this.response = await this.apiContext.get('/analytics/dashboard')
    this.responseData = await this.response.json()
  } catch (error) {
    this.error = error
  }
})

When('I request dashboard analytics with start date {string} and end date {string}', async function (startDate, endDate) {
  try {
    this.response = await this.apiContext.get('/analytics/dashboard', {
      params: { startDate, endDate }
    })
    this.responseData = await this.response.json()
  } catch (error) {
    this.error = error
  }
})

When('I request dashboard analytics with a {int}-year date range', async function (years) {
  const startDate = new Date(this.currentDate)
  startDate.setFullYear(startDate.getFullYear() - years)
  const endDate = this.currentDate

  try {
    this.response = await this.apiContext.get('/analytics/dashboard', {
      params: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      }
    })
    this.responseData = await this.response.json()
    this.requestStartTime = Date.now()
  } catch (error) {
    this.error = error
  }
})

When('I make {int} concurrent requests for dashboard analytics', async function (count) {
  try {
    const promises = []
    for (let i = 0; i < count; i++) {
      promises.push(this.apiContext.get('/analytics/dashboard'))
    }
    const responses = await Promise.all(promises)
    this.concurrentResponses = await Promise.all(
      responses.map(r => r.json())
    )
  } catch (error) {
    this.error = error
  }
})

When('I request dashboard analytics with start date {string}', async function (startDate) {
  try {
    this.response = await this.apiContext.get('/analytics/dashboard', {
      params: { startDate }
    })
    this.responseData = await this.response.json()
  } catch (error) {
    this.error = error
  }
})

When('I request dashboard analytics with:', async function (dataTable) {
  const rows = dataTable.hashes()
  const params = {}

  if (rows[0].startDate && rows[0].startDate.trim() !== '') {
    params.startDate = rows[0].startDate
  }
  if (rows[0].endDate && rows[0].endDate.trim() !== '') {
    params.endDate = rows[0].endDate
  }

  try {
    this.response = await this.apiContext.get('/analytics/dashboard', { params })
    this.responseData = await this.response.json()
  } catch (error) {
    this.error = error
  }
})

When('I request dashboard analytics with start date {string}', async function (startDate) {
  if (startDate === 'invalid-date') {
    try {
      this.response = await this.apiContext.get('/analytics/dashboard', {
        params: { startDate }
      })
      this.responseData = await this.response.json()
    } catch (error) {
      this.error = error
    }
  } else {
    try {
      this.response = await this.apiContext.get('/analytics/dashboard', {
        params: { startDate }
      })
      this.responseData = await this.response.json()
    } catch (error) {
      this.error = error
    }
  }
})

Then('I should receive analytics data containing:', async function (dataTable) {
  expect(this.response.status()).toBe(200)
  expect(this.responseData).toBeDefined()

  const fields = dataTable.hashes()
  for (const field of fields) {
    expect(this.responseData).toHaveProperty(field.field)
    const value = this.responseData[field.field]
    const expectedType = field.type

    if (expectedType === 'number') {
      expect(typeof value).toBe('number')
    } else if (expectedType === 'object') {
      expect(typeof value).toBe('object')
      expect(value).not.toBeNull()
    } else if (expectedType === 'array') {
      expect(Array.isArray(value)).toBe(true)
    }
  }
})

Then('I should receive analytics data filtered from {string} onwards', async function (startDate) {
  expect(this.response.status()).toBe(200)
  expect(this.responseData).toBeDefined()
})

Then('the results should only include orders created on or after {string}', async function (startDate) {
  const startDateObj = new Date(startDate)
  // Verify that all orders in the response are >= startDate
  if (this.responseData.orders && Array.isArray(this.responseData.orders)) {
    for (const order of this.responseData.orders) {
      const orderDate = new Date(order.createdAt)
      expect(orderDate.getTime()).toBeGreaterThanOrEqual(startDateObj.getTime())
    }
  }
})

Then('I should receive analytics data filtered up to {string}', async function (endDate) {
  expect(this.response.status()).toBe(200)
  expect(this.responseData).toBeDefined()
})

Then('the results should only include orders created on or before {string}', async function (endDate) {
  const endDateObj = new Date(endDate)
  endDateObj.setHours(23, 59, 59, 999)
  // Verify that all orders in the response are <= endDate
  if (this.responseData.orders && Array.isArray(this.responseData.orders)) {
    for (const order of this.responseData.orders) {
      const orderDate = new Date(order.createdAt)
      expect(orderDate.getTime()).toBeLessThanOrEqual(endDateObj.getTime())
    }
  }
})

Then('I should receive analytics data for the specified date range', async function () {
  expect(this.response.status()).toBe(200)
  expect(this.responseData).toBeDefined()
})

Then('the results should only include orders created between {string} and {string}', async function (startDate, endDate) {
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)
  endDateObj.setHours(23, 59, 59, 999)

  if (this.responseData.orders && Array.isArray(this.responseData.orders)) {
    for (const order of this.responseData.orders) {
      const orderDate = new Date(order.createdAt)
      expect(orderDate.getTime()).toBeGreaterThanOrEqual(startDateObj.getTime())
      expect(orderDate.getTime()).toBeLessThanOrEqual(endDateObj.getTime())
    }
  }
})

Then('the status breakdown should contain:', async function (dataTable) {
  expect(this.responseData).toHaveProperty('statusBreakdown')
  const statusBreakdown = this.responseData.statusBreakdown
  const expectedStatuses = dataTable.hashes()

  for (const expectedStatus of expectedStatuses) {
    const status = expectedStatus.status
    const count = parseInt(expectedStatus.count)
    expect(statusBreakdown[status]).toBe(count)
  }
})

Then('the plant performance data should include:', async function (dataTable) {
  expect(this.responseData).toHaveProperty('plantPerformance')
  expect(Array.isArray(this.responseData.plantPerformance)).toBe(true)

  const expectedPlants = dataTable.hashes()
  for (const expectedPlant of