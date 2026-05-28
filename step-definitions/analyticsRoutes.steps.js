// Auto-generated step definitions for backend/src/routes/analyticsRoutes.js
// Generated on: 2026-05-28T09:00:06.254Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'

Before(async function() {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.response = null
  this.responseData = null
  this.isAuthenticated = true
  this.userPermissions = 'full'
  this.requestStartTime = null
})

After(async function() {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
})

Given('the analytics service is available', async function() {
  this.analyticsServiceAvailable = true
})

Given('the database contains analytics data', async function() {
  this.databaseHasData = true
})

Given('the database contains no analytics data', async function() {
  this.databaseHasData = false
})

Given('the analytics service is unavailable', async function() {
  this.analyticsServiceAvailable = false
})

Given('the request contains invalid parameters', async function() {
  this.invalidRequest = true
})

Given('I am not authenticated', async function() {
  this.isAuthenticated = false
})

Given('I am authenticated as a user with limited permissions', async function() {
  this.isAuthenticated = true
  this.userPermissions = 'limited'
})

When('I request the dashboard analytics', async function() {
  this.requestStartTime = Date.now()
  
  const headers = {}
  if (this.isAuthenticated) {
    headers['Authorization'] = 'Bearer test-token'
  }

  try {
    this.response = await this.apiContext.get('/analytics/dashboard', {
      headers
    })
    this.responseData = await this.response.json().catch(() => null)
  } catch (error) {
    this.response = null
    this.responseData = null
  }
})

When('I request the dashboard analytics with invalid data', async function() {
  this.requestStartTime = Date.now()
  
  const headers = {}
  if (this.isAuthenticated) {
    headers['Authorization'] = 'Bearer test-token'
  }

  try {
    this.response = await this.apiContext.get('/analytics/dashboard?invalid=true&malformed=data', {
      headers
    })
    this.responseData = await this.response.json().catch(() => null)
  } catch (error) {
    this.response = null
    this.responseData = null
  }
})

Then('the response status should be {int}', async function(statusCode) {
  expect(this.response).toBeTruthy()
  expect(this.response.status()).toBe(statusCode)
})

Then('the response should contain dashboard metrics', async function() {
  expect(this.responseData).toBeTruthy()
  expect(this.responseData).toHaveProperty('metrics')
})

Then('the response should include the following fields:', async function(dataTable) {
  const fields = dataTable.raw().flat()
  
  expect(this.responseData).toBeTruthy()
  expect(this.responseData.metrics).toBeTruthy()
  
  fields.forEach(field => {
    expect(this.responseData.metrics).toHaveProperty(field)
  })
})

Then('the response should be valid JSON', async function() {
  expect(this.responseData).toBeTruthy()
  expect(typeof this.responseData).toBe('object')
})

Then('the response should contain an object with metrics', async function() {
  expect(this.responseData).toBeTruthy()
  expect(this.responseData.metrics).toBeTruthy()
  expect(typeof this.responseData.metrics).toBe('object')
})

Then('all numeric fields should be numbers', async function() {
  const numericFields = [
    'totalUsers',
    'activeUsers',
    'totalTransactions',
    'revenue',
    'conversionRate'
  ]
  
  expect(this.responseData.metrics).toBeTruthy()
  
  numericFields.forEach(field => {
    if (this.responseData.metrics.hasOwnProperty(field)) {
      expect(typeof this.responseData.metrics[field]).toBe('number')
    }
  })
})

Then('all date fields should be in ISO 8601 format', async function() {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/
  
  expect(this.responseData.metrics).toBeTruthy()
  
  const checkDateFormat = (obj) => {
    Object.values(obj).forEach(value => {
      if (typeof value === 'string' && value.includes('T')) {
        expect(value).toMatch(isoDateRegex)
      } else if (typeof value === 'object' && value !== null) {
        checkDateFormat(value)
      }
    })
  }
  
  checkDateFormat(this.responseData.metrics)
})

Then('the response should include metrics for the following periods:', async function(dataTable) {
  const periods = dataTable.raw().flat()
  
  expect(this.responseData).toBeTruthy()
  expect(this.responseData.metrics).toBeTruthy()
  
  periods.forEach(period => {
    expect(this.responseData.metrics).toHaveProperty(period)
  })
})

Then('the response should contain default empty metrics', async function() {
  expect(this.responseData).toBeTruthy()
  expect(this.responseData.metrics).toBeTruthy()
})

Then('all metric values should be zero or empty arrays', async function() {
  expect(this.responseData.metrics).toBeTruthy()
  
  const checkEmptyValues = (obj) => {
    Object.values(obj).forEach(value => {
      if (typeof value === 'number') {
        expect(value).toBe(0)
      } else if (Array.isArray(value)) {
        expect(value.length).toBe(0)
      } else if (typeof value === 'object' && value !== null) {
        checkEmptyValues(value)
      }
    })
  }
  
  checkEmptyValues(this.responseData.metrics)
})

Then('the response should contain an error message', async function() {
  expect(this.responseData).toBeTruthy()
  expect(this.responseData).toHaveProperty('error')
})

Then('the error message should indicate service unavailability', async function() {
  expect(this.responseData.error).toBeTruthy()
  expect(this.responseData.error.toLowerCase()).toContain('unavailable')
})

Then('the response should contain validation error details', async function() {
  expect(this.responseData).toBeTruthy()
  expect(this.responseData).toHaveProperty('error')
  expect(this.responseData).toHaveProperty('details')
})

Then('the response should include metadata with:', async function(dataTable) {
  const metadataFields = dataTable.raw().flat()
  
  expect(this.responseData).toBeTruthy()
  expect(this.responseData).toHaveProperty('metadata')
  
  metadataFields.forEach(field => {
    expect(this.responseData.metadata).toHaveProperty(field)
  })
})

Then('the response should contain an authentication error message', async function() {
  expect(this.responseData).toBeTruthy()
  expect(this.responseData).toHaveProperty('error')
  expect(this.responseData.error.toLowerCase()).toContain('auth')
})

Then('the response should only include data I have access to', async function() {
  expect(this.responseData).toBeTruthy()
  expect(this.responseData.metrics).toBeTruthy()
})

Then('sensitive metrics should be excluded from the response', async function() {
  const sensitiveFields = ['internalSystemData', 'userPasswords', 'apiKeys']
  
  expect(this.responseData).toBeTruthy()
  
  const checkForSensitiveData = (obj) => {
    Object.keys(obj).forEach(key => {
      sensitiveFields.forEach(sensitiveField => {
        expect(key.toLowerCase()).not.toContain(sensitiveField.toLowerCase())
      })
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        checkForSensitiveData(obj[key])
      }
    })
  }
  
  checkForSensitiveData(this.responseData)
})

Then('the response should be received within {int} milliseconds', async function(milliseconds) {
  const responseTime = Date.now() - this.requestStartTime
  expect(responseTime).toBeLessThan(milliseconds)
})

Then('the response should not timeout', async function() {
  expect(this.response).toBeTruthy()
  expect(this.response.status()).not.toBe(408)
})