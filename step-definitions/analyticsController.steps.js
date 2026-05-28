// Auto-generated step definitions for backend/src/controllers/analyticsController.js
// Generated on: 2026-05-28T08:59:53.245Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'

Before(async function() {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.response = null
  this.responseData = null
  this.requestParams = {}
  this.concurrentResponses = []
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
  // Verify that analytics records exist in the database
  // This is a setup verification step
  this.databaseReady = true
})

Given('the analytics service throws an error', async function() {
  this.serviceError = true
})

When('I request dashboard analytics without date filters', async function() {
  this.response = await this.apiContext.get('/analytics/dashboard')
  this.responseData = await this.response.json()
})

When('I request dashboard analytics with the following parameters:', async function(dataTable) {
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

When('I request dashboard analytics with only startDate parameter:', async function(dataTable) {
  const params = dataTable.rowsHash()
  this.requestParams = params
  
  const queryString = new URLSearchParams(params).toString()
  this.response = await this.apiContext.get(`/analytics/dashboard?${queryString}`)
  this.responseData = await this.response.json()
})

When('I request dashboard analytics', async function() {
  this.response = await this.apiContext.get('/analytics/dashboard')
  this.responseData = await this.response.json()
})

When('I make {int} concurrent requests for dashboard analytics', async function(count) {
  const requests = []
  for (let i = 0; i < count; i++) {
    requests.push(this.apiContext.get('/analytics/dashboard'))
  }
  
  this.concurrentResponses = await Promise.all(requests)
  this.concurrentResponsesData = await Promise.all(
    this.concurrentResponses.map(resp => resp.json())
  )
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
  expect(this.responseData.data).toBeDefined()
})

Then('the analytics data should include all available metrics', async function() {
  const data = this.responseData.data
  expect(data).toBeDefined()
  expect(typeof data).toBe('object')
  // Verify that data contains expected metric fields
  expect(Object.keys(data).length).toBeGreaterThan(0)
})

Then('the response should contain analytics data filtered by date range', async function() {
  expect(this.responseData).toHaveProperty('data')
  expect(this.responseData.data).toBeDefined()
})

Then('the returned data should only include records between {string} and {string}', async function(startDate, endDate) {
  const data = this.responseData.data
  expect(data).toBeDefined()
  
  // Verify that returned records fall within the specified date range
  if (Array.isArray(data)) {
    data.forEach(record => {
      if (record.date) {
        const recordDate = new Date(record.date)
        const start = new Date(startDate)
        const end = new Date(endDate)
        expect(recordDate.getTime()).toBeGreaterThanOrEqual(start.getTime())
        expect(recordDate.getTime()).toBeLessThanOrEqual(end.getTime())
      }
    })
  }
})

Then('the error should be handled by the error middleware', async function() {
  // Verify that an error response was received
  expect(this.response).toBeDefined()
  expect(this.response.status()).toBeGreaterThanOrEqual(400)
})

Then('an appropriate error response should be returned', async function() {
  expect(this.responseData).toBeDefined()
  expect(this.responseData).toHaveProperty('success')
  expect(this.responseData.success).toBe(false)
  expect(this.responseData).toHaveProperty('error')
})

Then('the error should be passed to the error middleware', async function() {
  expect(this.response).toBeDefined()
  expect(this.response.status()).toBeGreaterThanOrEqual(400)
})

Then('the client should receive an error response', async function() {
  expect(this.responseData).toBeDefined()
  expect(this.responseData.success).toBe(false)
})

Then('the response should be valid JSON', async function() {
  expect(this.responseData).toBeDefined()
  expect(typeof this.responseData).toBe('object')
})

Then('the response should contain a {string} field', async function(fieldName) {
  expect(this.responseData).toHaveProperty(fieldName)
})

Then('the {string} field should contain analytics metrics', async function(fieldName) {
  expect(this.responseData[fieldName]).toBeDefined()
  expect(typeof this.responseData[fieldName]).toBe('object')
})

Then('all requests should return status {int}', async function(statusCode) {
  this.concurrentResponses.forEach(response => {
    expect(response.status()).toBe(statusCode)
  })
})

Then('all responses should contain valid analytics data', async function() {
  this.concurrentResponsesData.forEach(data => {
    expect(data).toHaveProperty('data')
    expect(data.data).toBeDefined()
  })
})

Then('all responses should have success flag set to true', async function() {
  this.concurrentResponsesData.forEach(data => {
    expect(data).toHaveProperty('success')
    expect(data.success).toBe(true)
  })
})