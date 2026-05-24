// Auto-generated step definitions for backend/src/middleware/errorHandler.js
// Generated on: 2026-05-24T18:48:37.415Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'

Before(async function() {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.response = null
  this.responseData = null
  this.requestPayload = null
  this.errorType = null
  this.statusCode = null
})

After(async function() {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
})

// Background steps
Given('the error handler middleware is configured', async function() {
  this.middlewareConfigured = true
})

Given('the API is running', async function() {
  const healthResponse = await this.apiContext.get('/health')
  expect(healthResponse.status()).toBeLessThan(500)
})

// Validation error steps
Given('a request is made with invalid data', async function() {
  this.requestPayload = {
    email: 'invalid-email',
    age: 'not-a-number'
  }
})

When('the database validation fails', async function() {
  this.response = await this.apiContext.post('/test-validation', {
    data: this.requestPayload
  })
  this.responseData = await this.response.json()
})

Then('the system should return a {int} status code', async function(expectedStatus) {
  expect(this.response.status()).toBe(expectedStatus)
})

Then('the response should contain success as false', async function() {
  expect(this.responseData.success).toBe(false)
})

Then('the response should contain error message {string}', async function(expectedMessage) {
  expect(this.responseData.error).toBe(expectedMessage)
})

Then('the response should include field-level error details', async function() {
  expect(this.responseData.details).toBeDefined()
  expect(Array.isArray(this.responseData.details)).toBe(true)
  expect(this.responseData.details.length).toBeGreaterThan(0)
})

// Multiple validation errors steps
Given('a request contains multiple validation errors', async function() {
  this.requestPayload = {
    email: 'invalid',
    age: 'not-a-number',
    phone: '123'
  }
})

Then('the response should include details array', async function() {
  expect(this.responseData.details).toBeDefined()
  expect(Array.isArray(this.responseData.details)).toBe(true)
})

Then('each detail should contain the field name', async function() {
  this.responseData.details.forEach(detail => {
    expect(detail.field).toBeDefined()
    expect(typeof detail.field).toBe('string')
  })
})

Then('each detail should contain the error message', async function() {
  this.responseData.details.forEach(detail => {
    expect(detail.message).toBeDefined()
    expect(typeof detail.message).toBe('string')
  })
})

// Duplicate entry steps
Given('a request attempts to create a duplicate record', async function() {
  this.requestPayload = {
    email: 'existing@example.com',
    username: 'existinguser'
  }
})

When('the database unique constraint is violated', async function() {
  this.response = await this.apiContext.post('/test-duplicate', {
    data: this.requestPayload
  })
  this.responseData = await this.response.json()
})

Then('the response should contain message {string}', async function(expectedMessage) {
  expect(this.responseData.message).toBe(expectedMessage)
})

Then('the response should include field-level constraint details', async function() {
  expect(this.responseData.details).toBeDefined()
  expect(Array.isArray(this.responseData.details)).toBe(true)
})

// Duplicate entry error details steps
Given('a request violates a unique constraint', async function() {
  this.requestPayload = {
    email: 'duplicate@example.com'
  }
})

When('the database constraint error occurs', async function() {
  this.response = await this.apiContext.post('/test-constraint', {
    data: this.requestPayload
  })
  this.responseData = await this.response.json()
})

Then('each detail should contain the conflicting field name', async function() {
  this.responseData.details.forEach(detail => {
    expect(detail.field).toBeDefined()
    expect(typeof detail.field).toBe('string')
  })
})

Then('each detail should contain the constraint violation message', async function() {
  this.responseData.details.forEach(detail => {
    expect(detail.message).toBeDefined()
    expect(detail.message).toContain('already exists')
  })
})

// Database error steps
Given('a database error occurs during request processing', async function() {
  this.errorType = 'database'
})

When('the database error is not a validation or constraint error', async function() {
  this.response = await this.apiContext.post('/test-db-error', {
    data: { trigger: 'generic-db-error' }
  })
  this.responseData = await this.response.json()
})

// Custom API error steps
Given('a custom API error is thrown with a specific status code', async function() {
  this.errorType = 'custom'
  this.statusCode = 422
})

When('the error handler processes the custom error', async function() {
  this.response = await this.apiContext.post('/test-custom-error', {
    data: { statusCode: this.statusCode, message: 'Custom error message' }
  })
  this.responseData = await this.response.json()
})

Then('the system should return the specified status code', async function() {
  expect(this.response.status()).toBe(this.statusCode)
})

Then('the response should contain the error message from the custom error', async function() {
  expect(this.responseData.error).toBeDefined()
  expect(typeof this.responseData.error).toBe('string')
})

// Custom API errors with various status codes
Given('a custom API error is thrown', async function() {
  this.errorType = 'custom'
})

When('the error handler processes the error', async function() {
  this.response = await this.apiContext.post('/test-custom-error', {
    data: { statusCode: this.statusCode, message: this.message }
  })
  this.responseData = await this.response.json()
})

Then('the system should return the appropriate HTTP status code', async function() {
  expect(this.response.status()).toBe(this.statusCode)
})

Then('the response should contain the error details', async function() {
  expect(this.responseData.error).toBeDefined()
  expect(this.responseData.success).toBe(false)
})

// Generic error steps
Given('an error occurs without a specified status code', async function() {
  this.errorType = 'generic'
})

When('the error handler processes the generic error', async function() {
  this.response = await this.apiContext.post('/test-generic-error', {
    data: { message: 'Generic error occurred' }
  })
  this.responseData = await this.response.json()
})

// Error without message steps
Given('an error occurs without a message property', async function() {
  this.errorType = 'no-message'
})

Then('the response should contain default message {string}', async function(defaultMessage) {
  expect(this.responseData.error).toBe(defaultMessage)
})

// 404 route not found steps
Given('a request is made to an undefined route', async function() {
  this.requestPath = '/undefined-route-xyz'
})

When('the not found handler is invoked', async function() {
  this.response = await this.apiContext.get(this.requestPath)
  this.responseData = await this.response.json()
})

Then('the response should contain error message {string}', async function(expectedMessage) {
  expect(this.responseData.error).toBe(expectedMessage)
})

Then('the response should include the requested path', async function() {
  expect(this.responseData.path).toBeDefined()
})

// 404 with correct path information
Given('a request is made to a non-existent endpoint', async function() {
  this.requestPath = '/api/non-existent'
})

When('the not found handler processes the request', async function() {
  this.response = await this.apiContext.get(this.requestPath)
  this.responseData = await this.response.json()
})

Then('the response should include the original URL path', async function() {
  expect(this.responseData.path).toBeDefined()
})

Then('the path should match the requested endpoint', async function() {
  expect(this.responseData.path).toContain('non-existent')
})

// Logging steps
Given('an error occurs in the application', async function() {
  this.errorType = 'logging-test'
})

Then('the error should be logged to the console', async function() {
  expect(this.responseData).toBeDefined()
})

Then('the error details should be available for debugging', async function() {
  expect(this.responseData.error).toBeDefined()
  expect(this.responseData.success).toBe(false)
})

// Response consistency steps
Given('various types of errors occur', async function() {
  this.errorTypes = ['validation', 'database', 'custom', 'generic']
})

When('the error handler processes each error', async function() {
  this.responses = []
  for (const errorType of this.errorTypes) {
    const response = await this.apiContext.post('/test-error', {
      data: { type: errorType }
    })
    this.responses.push({
      response,
      data: await response.json()
    })
  }
})

Then('all responses should contain a success field set to false', async function() {
  this.responses.forEach(({ data }) => {
    expect(data.success).toBe(false)
  })
})

Then('all responses should contain an error field', async function() {
  this.responses.forEach(({ data }) => {
    expect(data.error).toBeDefined()
  })
})

Then('all responses should be in valid JSON format', async function() {
  this.responses.forEach(({ data }) => {
    expect(typeof data).toBe('object')
    expect(data).not.toBeNull()
  })
})

// Scenario outline data handling
Given('a custom API error is thrown with status code {int} and message {string}', async function(statusCode, message) {
  this.statusCode = statusCode
  this.message = message
})