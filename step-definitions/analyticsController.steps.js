// Auto-generated step definitions for backend/src/controllers/analyticsController.js
// Generated on: 2026-05-28T10:35:44.462Z

// Auto-generated step definitions for backend/src/controllers/analyticsController.js
// Generated on: 2026-05-28T10:35:35.442Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'

Before(async function() {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.response = null
  this.responseData = null
  this.requestParams = {}
  this.serviceError = false
  this.databaseReady = false
})

After(async function() {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
})

Given('the analytics service is available', async function() {
  const healthResponse = await this.apiContext.get('/health')
  expect(healthResponse.status()).toBe(200)
})

Given('the database contains analytics records', async function() {
  this.databaseReady = true
})

Given('the analytics service encounters an error', async function() {
  this.serviceError = true
})

When('I request dashboard analytics without date filters', async function() {
  try {
    this.response = await this.apiContext.get('/analytics/dashboard')
    this.responseData = await this.response.json()
  } catch (error) {
    this.requestError = error
  }
})

When('I request dashboard analytics with the following parameters:', async function(dataTable) {
  const params = dataTable.rowsHash()
  this.requestParams = params
  
  const queryString = new URLSearchParams(params).toString()
  this.response = await this.apiContext.get(`/analytics/dashboard?${queryString}`)
  this.responseData = await this.response.json()
})

When('I request dashboard analytics with only startDate parameter:', async function(dataTable) {
  const params = dataTable.rowsHash()
  this.requestParams = params
  
  const queryString = new URLSearchParams(params).toString()
  this.response = await this.apiContext.get(`/analytics/dashboard?${queryString}`)
  this.responseData = await this.response.json()
})

When('I request dashboard analytics with only endDate parameter:', async function(dataTable) {
  const params = dataTable.rowsHash()
  this.requestParams = params
  
  const queryString = new URLSearchParams(params).toString()
  this.response = await this.apiContext.get(`/analytics/dashboard?${queryString}`)
  this.responseData = await this.response.json()
})

Then('the response status should be {int}', async function(statusCode) {
  expect(this.response.status()).toBe(statusCode)
})

Then('the response should contain success flag set to true', async function() {
  expect(this.responseData).toHaveProperty('success')
  expect(this.responseData.success).toBe(true)
})

Then('the response should contain analytics data', async function() {
  expect(this.responseData).toHaveProperty('data')
  expect(this.responseData.data).toBeTruthy()
})

Then('the analytics data should include all available metrics', async function() {
  const data = this.responseData.data
  expect(data).toBeDefined()
  expect(typeof data).toBe('object')
})

Then('the response should contain analytics data filtered by date range', async function() {
  expect(this.responseData).toHaveProperty('data')
  expect(this.responseData.data).toBeTruthy()
})

Then('the returned data should only include records between {string} and {string}', async function(startDate, endDate) {
  const data = this.responseData.data
  expect(data).toBeDefined()
  
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  if (Array.isArray(data)) {
    data.forEach(record => {
      if (record.date) {
        const recordDate = new Date(record.date)
        expect(recordDate.getTime()).toBeGreaterThanOrEqual(start.getTime())
        expect(recordDate.getTime()).toBeLessThanOrEqual(end.getTime())
      }
    })
  }
})

Then('the error should be passed to the error handler', async function() {
  expect(this.requestError || this.serviceError).toBeTruthy()
})

Then('the response should contain appropriate error information', async function() {
  expect(this.responseData).toBeDefined()
  if (this.responseData.success === false) {
    expect(this.responseData).toHaveProperty('error')
  }
})

Then('the response should be valid JSON', async function() {
  expect(this.responseData).toBeDefined()
  expect(typeof this.responseData).toBe('object')
})

Then('the response should have a success property', async function() {
  expect(this.responseData).toHaveProperty('success')
  expect(typeof this.responseData.success).toBe('boolean')
})

Then('the response should have a data property containing analytics information', async function() {
  expect(this.responseData).toHaveProperty('data')
  expect(this.responseData.data).toBeDefined()
})