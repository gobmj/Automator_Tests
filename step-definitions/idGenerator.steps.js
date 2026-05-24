// Auto-generated step definitions for backend/src/utils/idGenerator.js
// Generated on: 2026-05-24T18:49:39.666Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'

Before(async function () {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.generatedIds = []
  this.currentYear = new Date().getFullYear().toString()
})

After(async function () {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
})

Given('the order ID generation system is available', async function () {
  this.response = await this.apiContext.get('/health')
  expect(this.response.status()).toBe(200)
})

When('I request a new order ID', async function () {
  this.response = await this.apiContext.post('/order-id/generate')
  expect(this.response.status()).toBe(200)
  this.responseData = await this.response.json()
  this.generatedIds = [this.responseData.orderId]
})

Then('the order ID should follow the format "ORD-YYYY-NNNN"', async function () {
  const orderId = this.responseData.orderId
  const pattern = /^ORD-\d{4}-\d{4}$/
  expect(orderId).toMatch(pattern)
})

Then('the year in the order ID should be the current year', async function () {
  const orderId = this.responseData.orderId
  const yearMatch = orderId.match(/ORD-(\d{4})-/)
  expect(yearMatch).toBeTruthy()
  expect(yearMatch[1]).toBe(this.currentYear)
})

Then('the numeric suffix should be a 4-digit number', async function () {
  const orderId = this.responseData.orderId
  const suffixMatch = orderId.match(/-(\d{4})$/)
  expect(suffixMatch).toBeTruthy()
  expect(suffixMatch[1]).toHaveLength(4)
})

When('I request {int} new order IDs', async function (count) {
  this.generatedIds = []
  for (let i = 0; i < count; i++) {
    const response = await this.apiContext.post('/order-id/generate')
    expect(response.status()).toBe(200)
    const data = await response.json()
    this.generatedIds.push(data.orderId)
  }
})

Then('all order IDs should have the format "ORD-YYYY-NNNN"', async function () {
  const pattern = /^ORD-\d{4}-\d{4}$/
  for (const orderId of this.generatedIds) {
    expect(orderId).toMatch(pattern)
  }
})

Then('all order IDs should be unique', async function () {
  const uniqueIds = new Set(this.generatedIds)
  expect(uniqueIds.size).toBe(this.generatedIds.length)
})

Then('each order ID should contain the current year', async function () {
  for (const orderId of this.generatedIds) {
    expect(orderId).toContain(this.currentYear)
  }
})

Then('the numeric suffix should always be 4 digits', async function () {
  const orderId = this.responseData.orderId
  const suffixMatch = orderId.match(/-(\d{4})$/)
  expect(suffixMatch).toBeTruthy()
  expect(suffixMatch[1]).toHaveLength(4)
})

Then('the numeric suffix should be zero-padded if less than 4 digits', async function () {
  const orderId = this.responseData.orderId
  const suffixMatch = orderId.match(/-(\d{4})$/)
  expect(suffixMatch).toBeTruthy()
  const suffix = suffixMatch[1]
  expect(suffix).toMatch(/^\d{4}$/)
})

When('I request a new order ID with prefix {string}', async function (prefix) {
  this.response = await this.apiContext.post('/order-id/generate', {
    data: { prefix }
  })
  expect(this.response.status()).toBe(200)
  this.responseData = await this.response.json()
  this.generatedIds = [this.responseData.orderId]
})

Then('the order ID should follow the format "CUST-YYYY-NNNNNN"', async function () {
  const orderId = this.responseData.orderId
  const pattern = /^CUST-\d{4}-\d{6}$/
  expect(orderId).toMatch(pattern)
})

Then('the prefix should be {string}', async function (expectedPrefix) {
  const orderId = this.responseData.orderId
  expect(orderId).toMatch(new RegExp(`^${expectedPrefix}-`))
})

When('I request a new order ID with an empty prefix', async function () {
  this.response = await this.apiContext.post('/order-id/generate', {
    data: { prefix: '' }
  })
  expect(this.response.status()).toBe(200)
  this.responseData = await this.response.json()
  this.generatedIds = [this.responseData.orderId]
})

Then('the order ID should use "ORD" as the default prefix', async function () {
  const orderId = this.responseData.orderId
  expect(orderId).toMatch(/^ORD-/)
})

Then('the order ID should follow the format "ORD-YYYY-NNNNNN"', async function () {
  const orderId = this.responseData.orderId
  const pattern = /^ORD-\d{4}-\d{6}$/
  expect(orderId).toMatch(pattern)
})

Then('the order ID should start with {string}', async function (expectedPrefix) {
  const orderId = this.responseData.orderId
  expect(orderId).toMatch(new RegExp(`^${expectedPrefix}-`))
})

Then('the order ID should contain the current year', async function () {
  const orderId = this.responseData.orderId
  expect(orderId).toContain(this.currentYear)
})

Then('the order ID should be properly formatted', async function () {
  const orderId = this.responseData.orderId
  const pattern = /^[A-Z]+-\d{4}-\d+$/
  expect(orderId).toMatch(pattern)
})

Then('the numeric suffix should be 6 digits derived from timestamp', async function () {
  const orderId = this.responseData.orderId
  const suffixMatch = orderId.match(/-(\d{6})$/)
  expect(suffixMatch).toBeTruthy()
  expect(suffixMatch[1]).toHaveLength(6)
})

When('I request {int} new order IDs with prefix {string}', async function (count, prefix) {
  this.generatedIds = []
  for (let i = 0; i < count; i++) {
    const response = await this.apiContext.post('/order-id/generate', {
      data: { prefix }
    })
    expect(response.status()).toBe(200)
    const data = await response.json()
    this.generatedIds.push(data.orderId)
  }
})

Then('all order IDs should start with {string}', async function (expectedPrefix) {
  for (const orderId of this.generatedIds) {
    expect(orderId).toMatch(new RegExp(`^${expectedPrefix}-`))
  }
})

Then('the year component should be a valid 4-digit year', async function () {
  const orderId = this.responseData.orderId
  const yearMatch = orderId.match(/-(\d{4})-/)
  expect(yearMatch).toBeTruthy()
  expect(yearMatch[1]).toMatch(/^\d{4}$/)
})

Then('the year should be greater than or equal to 2000', async function () {
  const orderId = this.responseData.orderId
  const yearMatch = orderId.match(/-(\d{4})-/)
  expect(yearMatch).toBeTruthy()
  const year = parseInt(yearMatch[1], 10)
  expect(year).toBeGreaterThanOrEqual(2000)
})

Then('the year should be less than or equal to 2099', async function () {
  const orderId = this.responseData.orderId
  const yearMatch = orderId.match(/-(\d{4})-/)
  expect(yearMatch).toBeTruthy()
  const year = parseInt(yearMatch[1], 10)
  expect(year).toBeLessThanOrEqual(2099)
})

Then('the numeric suffix should be between 0000 and 9999', async function () {
  const orderId = this.responseData.orderId
  const suffixMatch = orderId.match(/-(\d{4})$/)
  expect(suffixMatch).toBeTruthy()
  const suffix = parseInt(suffixMatch[1], 10)
  expect(suffix).toBeGreaterThanOrEqual(0)
  expect(suffix).toBeLessThanOrEqual(9999)
})

Then('the numeric suffix should be a valid integer', async function () {
  const orderId = this.responseData.orderId
  const suffixMatch = orderId.match(/-(\d+)$/)
  expect(suffixMatch).toBeTruthy()
  const suffix = parseInt(suffixMatch[1], 10)
  expect(Number.isInteger(suffix)).toBe(true)
})

Then('the numeric suffix should be between 000000 and 999999', async function () {
  const orderId = this.responseData.orderId
  const suffixMatch = orderId.match(/-(\d{6})$/)
  expect(suffixMatch).toBeTruthy()
  const suffix = parseInt(suffixMatch[1], 10)
  expect(suffix).toBeGreaterThanOrEqual(0)
  expect(suffix).toBeLessThanOrEqual(999999)
})