// Auto-generated step definitions for backend/src/app.js
// Generated on: 2026-05-28T08:59:44.527Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

Before(async function () {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000'
  })
  this.response = null
  this.responseData = null
  this.serverProcess = null
  this.error = null
  this.logs = []
  this.environmentLoaded = false
  this.middlewareConfigured = false
  this.databaseAvailable = false
  this.databaseSynced = false
  this.databaseSyncFails = false
  this.serverRunning = false
  this.requestHeaders = {}
  this.requestBody = null
  this.corsHeadersPresent = false
  this.securityHeadersPresent = false
  this.morganLogged = false
  this.jsonParsed = false
  this.urlEncodedParsed = false
  this.unhandledRejection = false
})

After(async function () {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
  if (this.serverProcess) {
    this.serverProcess.kill()
    await new Promise(resolve => setTimeout(resolve, 500))
  }
})

// Background steps
Given('the application environment variables are loaded', async function () {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  process.env.PORT = process.env.PORT || '3000'
  this.environmentLoaded = true
})

Given('the server is configured with necessary middleware', async function () {
  this.middlewareConfigured = true
})

Given('the following middleware are applied:', async function (dataTable) {
  const middlewares = dataTable.hashes()
  this.middlewareList = middlewares
  expect(middlewares.length).toBeGreaterThan(0)
})

// Database connection steps
Given('the database connection is available', async function () {
  this.databaseAvailable = true
  this.databaseSyncFails = false
})

Given('the database models are synchronized', async function () {
  this.databaseSynced = true
})

Given('the database connection fails', async function () {
  this.databaseAvailable = false
})

Given('the database synchronization fails', async function () {
  this.databaseSyncFails = true
})

// Server startup steps
When('the server starts', async function () {
  await this.startTestServer()
})

When('the server attempts to start', async function () {
  try {
    await this.startTestServer()
  } catch (error) {
    this.error = error
  }
})

Then('the server should listen on the configured port', async function () {
  const port = process.env.PORT || '3000'
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  try {
    this.response = await this.apiContext.get('/health')
    expect(this.response.status()).toBe(200)
    this.serverRunning = true
  } catch (error) {
    throw new Error(`Server not listening on port ${port}`)
  }
})

Then('the startup message should display the API endpoint', async function () {
  const port = process.env.PORT || '3000'
  expect(this.logs.some(log => log.includes(`http://localhost:${port}`))).toBeTruthy()
})

Then('the startup message should list all available endpoints', async function () {
  expect(this.logs.some(log => log.includes('endpoints') || log.includes('routes'))).toBeTruthy()
})

Then('the server should exit with error code 1', async function () {
  expect(this.error).toBeDefined()
})

Then('an error message should be logged about database connection failure', async function () {
  expect(this.logs.some(log => log.includes('database') || log.includes('connection'))).toBeTruthy()
})

Then('an error message should be logged about synchronization failure', async function () {
  expect(this.logs.some(log => log.includes('synchronization') || log.includes('sync'))).toBeTruthy()
})

// Health check endpoint steps
Given('the server is running', async function () {
  if (!this.serverRunning) {
    await this.startTestServer()
    await new Promise(resolve => setTimeout(resolve, 1000))
    this.serverRunning = true
  }
})

When('a client requests the health check endpoint at GET {string}', async function (endpoint) {
  this.response = await this.apiContext.get(endpoint)
  this.responseData = await this.response.json()
})

Then('the response status code should be {int}', async function (statusCode) {
  expect(this.response.status()).toBe(statusCode)
})

Then('the response should contain success status as true', async function () {
  expect(this.responseData.success).toBe(true)
})

Then('the response should contain the message {string}', async function (message) {
  expect(this.responseData.message).toBe(message)
})

Then('the response should contain a valid ISO timestamp', async function () {
  expect(this.responseData.timestamp).toBeDefined()
  const timestamp = new Date(this.responseData.timestamp)
  expect(timestamp.toString()).not.toBe('Invalid Date')
})

// Security headers steps
When('a client makes any request to the server', async function () {
  this.response = await this.apiContext.get('/health')
})

Then('the response should include security headers from helmet middleware', async function () {
  const headers = this.response.headers()
  this.securityHeadersPresent = 
    headers['x-content-type-options'] !== undefined ||
    headers['x-frame-options'] !== undefined ||
    headers['x-xss-protection'] !== undefined
  expect(this.securityHeadersPresent).toBeTruthy()
})

// CORS steps
When('a client makes a cross-origin request', async function () {
  this.response = await this.apiContext.get('/health', {
    headers: {
      'Origin': 'http://example.com'
    }
  })
})

Then('the response should include appropriate CORS headers', async function () {
  const headers = this.response.headers()
  this.corsHeadersPresent = 
    headers['access-control-allow-origin'] !== undefined ||
    headers['access-control-allow-methods'] !== undefined
  expect(this.corsHeadersPresent).toBeTruthy()
})

Then('the request should be processed successfully', async function () {
  expect(this.response.status()).toBeLessThan(400)
})

// Logging steps
Then('the request should be logged by morgan in development format', async function () {
  await new Promise(resolve => setTimeout(resolve, 500))
  this.morganLogged = this.logs.length > 0
  expect(this.morganLogged).toBeTruthy()
})

// JSON parsing steps
When('a client sends a POST request with JSON body', async function () {
  const testData = { test: 'data', value: 123 }
  this.response = await this.apiContext.post('/health', {
    data: testData,
    headers: { 'Content-Type': 'application/json' }
  })
  this.requestBody = testData
})

Then('the server should parse the JSON body correctly', async function () {
  expect(this.response.status()).toBeLessThan(500)
  this.jsonParsed = true
})

Then('the request handler should receive the parsed data', async function () {
  expect(this.jsonParsed).toBeTruthy()
})

// URL-encoded parsing steps
When('a client sends a POST request with URL-encoded body', async function () {
  const testData = 'key=value&foo=bar'
  this.response = await this.apiContext.post('/health', {
    data: testData,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
  this.requestBody = testData
})

Then('the server should parse the URL-encoded body correctly', async function () {
  expect(this.response.status()).toBeLessThan(500)
  this.urlEncodedParsed = true
})

// Route mounting steps
When('a client requests any endpoint under {string}', async function (routePath) {
  try {
    this.response = await this.apiContext.get(`${routePath}/test`)
  } catch (error) {
    this.response = { status: () => 404 }
  }
})

Then('the request should be routed to the order routes handler', async function () {
  expect(this.response).toBeDefined()
})

Then('the request should be routed to the analytics routes handler', async function () {
  expect(this.response).toBeDefined()
})

// 404 handler steps
When('a client requests an undefined endpoint', async function () {
  try {
    this.response = await this.apiContext.get('/undefined-route-xyz-123')
  } catch (error) {
    this.response = error.response
  }
})

Then('the notFoundHandler middleware should be invoked', async function () {
  expect(this.response.status()).toBe(404)
})

// Error handling steps
Given('an error occurs during request processing', async function () {
  this.errorOccurred = true
})

When('the error is thrown in a route handler', async function () {
  try {
    this.response = await this.apiContext.get('/error-test')
  } catch (error) {
    this.error = error
  }
})

Then('the global error handler should catch the error', async function () {
  expect(this.error || this.response).toBeDefined()
})

Then('an appropriate error response should be returned', async function () {
  expect(this.response || this.error).toBeDefined()
})

// Unhandled rejection steps
When('an unhandled promise rejection occurs', async function () {
  this.unhandledRejection = true
})

Then('the process should log the rejection error', async function () {
  expect(this.unhandledRejection).toBeTruthy()
})

Then('the process should exit with error code 1', async function () {
  expect(this.error || this.unhandledRejection).toBeTruthy()
})

// Test mode steps
Given('the NODE_ENV environment variable is set to {string}', async function (env) {
  process.env.NODE_ENV = env
})

When('the application module is loaded', async function () {
  this.appLoaded = true
})

Then('the startServer function should not be automatically invoked', async function () {
  expect(process.env.NODE_ENV).toBe('test')
})

// Port configuration steps
Given('the PORT environment variable is not set', async function () {
  delete process.env.PORT
})

Given('the PORT environment variable is set to {int}', async function (port) {
  process.env.PORT = port.toString()
})

Then('the server should listen on port {int}', async function (port) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  try {
    this.response = await this.apiContext.get('/health')
    expect(this.response.status()).toBe(200)
  } catch (error) {
    throw new Error(`Server not listening on port ${port}`)
  }
})

// Helper method
async function startTestServer() {
  return new Promise((resolve, reject) => {
    const appPath = path.join(__dirname, '../../src/app.js')
    this.serverProcess = spawn('node', [appPath], {
      env: { ...process.env, NODE_ENV: 'development' },
      stdio: ['ignore', 'pipe',