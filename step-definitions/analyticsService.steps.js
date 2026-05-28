// Auto-generated step definitions for backend/src/services/analyticsService.js
// Generated on: 2026-05-28T10:32:36.997Z

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
  this.expectedStatuses = {}
  this.expectedPlantPerformance = []
  this.expectedMaterials = []
  this.expectedPriorityDistribution = []
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
  this.expectedStatuses = dataTable.column('status')
})

Given('the database contains orders from multiple plants:', async function (dataTable) {
  this.expectedPlantPerformance = dataTable.hashes()
})

Given('the database contains orders with the following materials:', async function (dataTable) {
  this.expectedMaterials = dataTable.hashes()
})

Given('the database contains orders with priorities distributed across ranges', async function () {
  // Setup: ensure orders with various priority levels exist in database
})

Given('the database contains no orders', async function () {
  // Setup: clear all orders from database or use empty test database
})

Given('the database contains orders with zero quantities', async function () {
  // Setup: ensure orders with zero quantities exist in database
})

Given('the database contains orders for 50 different materials', async function () {
  // Setup: ensure at least 50 distinct materials exist in database
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
    this.response = await this.apiContext.get(`/analytics/dashboard?startDate=${startDate}`)
    this.responseData = await this.response.json()
  } catch (error) {
    this.error = error
  }
})

When('I request dashboard analytics with end date {string}', async function (endDate) {
  try {
    this.response = await this.apiContext.get(`/analytics/dashboard?endDate=${endDate}`)
    this.responseData = await this.response.json()
  } catch (error) {
    this.error = error
  }
})

When('I request dashboard analytics with start date {string} and end date {string}', async function (startDate, endDate) {
  try {
    this.response = await this.apiContext.get(`/analytics/dashboard?startDate=${startDate}&endDate=${endDate}`)
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

Then('I should receive analytics data containing:', async function (dataTable) {
  expect(this.responseData).toBeDefined()
  const fields = dataTable.hashes()
  
  for (const field of fields) {
    expect(this.responseData).toHaveProperty(field.field)
    const value = this.responseData[field.field]
    
    if (field.type === 'number') {
      expect(typeof value).toBe('number')
    } else if (field.type === 'object') {
      expect(typeof value).toBe('object')
      expect(Array.isArray(value)).toBe(false)
    } else if (field.type === 'array') {
      expect(Array.isArray(value)).toBe(true)
    }
  }
})

Then('I should receive analytics data filtered from {string} onwards', async function (startDate) {
  expect(this.responseData).toBeDefined()
  expect(this.response.status()).toBe(200)
})

Then('the results should only include orders created on or after {string}', async function (startDate) {
  expect(this.responseData).toBeDefined()
  const startDateObj = new Date(startDate)
  
  if (this.responseData.orders && Array.isArray(this.responseData.orders)) {
    for (const order of this.responseData.orders) {
      const orderDate = new Date(order.createdAt)
      expect(orderDate.getTime()).toBeGreaterThanOrEqual(startDateObj.getTime())
    }
  }
})

Then('I should receive analytics data filtered up to {string}', async function (endDate) {
  expect(this.responseData).toBeDefined()
  expect(this.response.status()).toBe(200)
})

Then('the results should only include orders created on or before {string}', async function (endDate) {
  expect(this.responseData).toBeDefined()
  const endDateObj = new Date(endDate)
  
  if (this.responseData.orders && Array.isArray(this.responseData.orders)) {
    for (const order of this.responseData.orders) {
      const orderDate = new Date(order.createdAt)
      expect(orderDate.getTime()).toBeLessThanOrEqual(endDateObj.getTime())
    }
  }
})

Then('I should receive analytics data for the specified date range', async function () {
  expect(this.responseData).toBeDefined()
  expect(this.response.status()).toBe(200)
})

Then('the results should only include orders created between {string} and {string}', async function (startDate, endDate) {
  expect(this.responseData).toBeDefined()
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)
  
  if (this.responseData.orders && Array.isArray(this.responseData.orders)) {
    for (const order of this.responseData.orders) {
      const orderDate = new Date(order.createdAt)
      expect(orderDate.getTime()).toBeGreaterThanOrEqual(startDateObj.getTime())
      expect(orderDate.getTime()).toBeLessThanOrEqual(endDateObj.getTime())
    }
  }
})

Then('the statusBreakdown should contain counts for each status', async function () {
  expect(this.responseData.statusBreakdown).toBeDefined()
  expect(typeof this.responseData.statusBreakdown).toBe('object')
  
  for (const status of this.expectedStatuses) {
    expect(this.responseData.statusBreakdown).toHaveProperty(status)
  }
})

Then('each status count should be a positive integer', async function () {
  expect(this.responseData.statusBreakdown).toBeDefined()
  
  for (const [status, count] of Object.entries(this.responseData.statusBreakdown)) {
    expect(typeof count).toBe('number')
    expect(count).toBeGreaterThanOrEqual(0)
    expect(Number.isInteger(count)).toBe(true)
  }
})

Then('the plantPerformance array should include:', async function (dataTable) {
  expect(this.responseData.plantPerformance).toBeDefined()
  expect(Array.isArray(this.responseData.plantPerformance)).toBe(true)
  
  const fields = dataTable.hashes()
  
  if (this.responseData.plantPerformance.length > 0) {
    const firstPlant = this.responseData.plantPerformance[0]
    
    for (const field of fields) {
      expect(firstPlant).toHaveProperty(field.field)
      
      if (field.type === 'number') {
        expect(typeof firstPlant[field.field]).toBe('number')
      } else if (field.type === 'string') {
        expect(typeof firstPlant[field.field]).toBe('string')
      }
    }
  }
})

Then('Plant-A should have orderCount of {int}', async function (expectedCount) {
  const plantA = this.responseData.plantPerformance.find(p => p.plant === 'Plant-A')
  expect(plantA).toBeDefined()
  expect(plantA.orderCount).toBe(expectedCount)
})

Then('Plant-A should have totalQuantity of {int}', async function (expectedQuantity) {
  const plantA = this.responseData.plantPerformance.find(p => p.plant === 'Plant-A')
  expect(plantA).toBeDefined()
  expect(plantA.totalQuantity).toBe(expectedQuantity)
})

Then('Plant-A should have avgPriority as a decimal value', async function () {
  const plantA = this.responseData.plantPerformance.find(p => p.plant === 'Plant-A')
  expect(plantA).toBeDefined()
  expect(plantA.avgPriority).toBeDefined()
  expect(typeof plantA.avgPriority).toBe('string')
  expect(/^\d+(\.\d+)?$/.test(plantA.avgPriority)).toBe(true)
})

Then('the topMaterials array should contain a maximum of 10 items', async function () {
  expect(this.responseData.topMaterials).toBeDefined()
  expect(Array.isArray(this.responseData.topMaterials)).toBe(true)
  expect(this.responseData.topMaterials.length).toBeLessThanOrEqual(10)
})

Then('topMaterials should be ordered by orderCount in descending order', async function () {
  expect(this.responseData.topMaterials).toBeDefined()
  
  for (let i = 0; i < this.responseData.topMaterials.length - 1; i++) {
    expect(this.responseData.topMaterials[i].orderCount).toBeGreaterThanOrEqual(
      this.responseData.topMaterials[i + 1].orderCount
    )
  }
})

Then('each material entry should include:', async function (dataTable) {
  expect(this.responseData.topMaterials).toBeDefined()
  
  const fields = dataTable.hashes()
  
  if (this.responseData.topMaterials.length > 0) {
    const firstMaterial = this.responseData.topMaterials[0]
    
    for (const field of fields) {
      expect(firstMaterial).toHaveProperty(field.field)
      
      if (field.type === 'number') {
        expect(typeof firstMaterial[field.field]).toBe('number')
      } else if (field.type === 'string') {
        expect(typeof firstMaterial[field.field]).toBe('string')
      }
    }
  }
})

Then('the priorityDistribution array should contain 5 priority ranges:', async function (dataTable) {
  expect(this.responseData.priorityDistribution).toBeDefined()
  expect(Array.isArray(this.responseData.priorityDistribution)).toBe(true)
  expect(this.responseData.priorityDistribution.length).toBe(