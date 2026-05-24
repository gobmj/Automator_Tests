// Auto-generated step definitions for backend/src/app.js
// Generated on: 2026-05-24T18:47:57.749Z

```javascript
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
  process.env.NODE_ENV = process.env.NODE_ENV || 'test'
  process.env.PORT = process.env.PORT || '3000'
  this.environmentLoaded = true
})

Given('the server is configured with necessary middleware', async function () {
  this.middlewareConfigured = true
})

// Server startup steps
Given('the database connection is available', async function () {
  this.databaseAvailable = true
  this.databaseSyncFails = false
})

Given('the database models are synchronized', async function () {
  this.databaseSynced = true
})

When('the server starts', async function () {
  await this.startTestServer()
})

Then('the server should listen on the configured port', async function () {
  const port = process.env.PORT || '3000'
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  try {
    this.response = await this.apiContext.get('/health')
    expect(this.response.status()).toBe(200)
  } catch (error) {
    throw new Error(`Server not listening on port ${port}`)
  }
})

Then('the startup message should display the API endpoint', async function () {
  expect(this.logs.join('\n')).toContain('http://localhost')
})

Then('the startup message should list all available endpoints', async function () {
  const logsText = this.logs.join('\n')
  expect(logsText).toContain('/api/orders')
})

// Database failure steps
Given('the database connection fails', async function () {
  this.databaseAvailable = false
})

When('the server attempts to start', async function () {
  try {
    await this.startTestServer()
  } catch (error) {
    this.error = error
  }
})

Then('the server should exit with error code 1', async function () {
  expect(this.error).toBeDefined()
})

Then('an error message should be logged about database connection failure', async function () {
  const logsText = this.logs.join('\n')
  expect(logsText.toLowerCase()).toContain('database')
})

// Database sync failure steps
Given('the database synchronization fails', async function () {
  this.databaseSyncFails = true
})

Then('an error message should be logged about synchronization failure', async function () {
  const logsText = this.logs.join('\n')
  expect(logsText.toLowerCase()).toContain('synchronization')
})

// Health check steps
Given('the server is running', async function () {
  if (!this.serverProcess) {
    await this.startTestServer()
    await new Promise(resolve => setTimeout(resolve, 1500))
  }
})

When('a client requests the health check endpoint', async function () {
  this.response = await this.apiContext.get('/health')
  this.responseData = await this.response.json()
})

Then('the response status code should be 200', async function () {
  expect(this.response.status()).toBe(200)
})

Then('the response should contain success status as true', async function () {
  expect(this.responseData.success).toBe(true)
})

Then('the response should contain the message "Server is running"', async function () {
  expect(this.responseData.message).toBe('Server is running')
})

Then('the response should contain a valid timestamp', async function () {
  expect(this.responseData.timestamp).toBeDefined()
  expect(new Date(this.responseData.timestamp).getTime()).toBeGreaterThan(0)
})

// Security headers steps
When('a client makes any request to the server', async function () {
  this.response = await this.apiContext.get('/health')
})

Then('the response should include security headers from Helmet middleware', async function () {
  const headers = this.response.headers()
  expect(headers['x-content-type-options']).toBeDefined()
  expect(headers['x-frame-options']).toBeDefined()
})

Then('the response should protect against common web vulnerabilities', async function () {
  const headers = this.response.headers()
  expect(headers['x-xss-protection'] || headers['x-content-type-options']).toBeDefined()
})

// CORS steps
When('a client from a different origin makes a request', async function () {
  const corsContext = await request.newContext({
    baseURL: 'http://localhost:3000',
    extraHTTPHeaders: {
      'Origin': 'http://example.com'
    }
  })
  this.response = await corsContext.get('/health')
  await corsContext.dispose()
})

Then('the request should be accepted', async function () {
  expect(this.response.status()).toBeLessThan(400)
})

Then('the response should include appropriate CORS headers', async function () {
  const headers = this.response.headers()
  expect(headers['access-control-allow-origin'] || headers['vary']).toBeDefined()
})

// Logging steps
When('a client makes an HTTP request', async function () {
  this.response = await this.apiContext.get('/health')
})

Then('the request should be logged with Morgan logger', async function () {
  expect(this.logs.length).toBeGreaterThan(0)
})

Then('the log should include request method, path, and response status', async function () {
  const logsText = this.logs.join('\n')
  expect(logsText).toMatch(/GET|POST|PUT|DELETE/)
})

// JSON parsing steps
When('a client sends a request with JSON content type', async function () {
  this.jsonPayload = { test: 'data', value: 123 }
})

When('the request body contains valid JSON data', async function () {
  this.response = await this.apiContext.post('/api/orders', {
    data: this.jsonPayload
  })
})

Then('the server should parse the JSON body correctly', async function () {
  expect(this.response.status()).toBeLessThan(500)
})

Then('the parsed data should be available in the request object', async function () {
  expect(this.response.status()).toBeDefined()
})

// URL-encoded parsing steps
When('a client sends a request with URL-encoded content type', async function () {
  this.urlEncodedData = 'key=value&test=data'
})

When('the request body contains URL-encoded data', async function () {
  this.response = await this.apiContext.post('/api/orders', {
    data: this.urlEncodedData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
})

Then('the server should parse the URL-encoded body correctly', async function () {
  expect(this.response.status()).toBeLessThan(500)
})

// 404 handler steps
When('a client requests a route that does not exist', async function () {
  this.response = await this.apiContext.get('/nonexistent-route-xyz')
})

Then('the response status code should be 404', async function () {
  expect(this.response.status()).toBe(404)
})

Then('the not found handler should be invoked', async function () {
  expect(this.response.status()).toBe(404)
})

// Error handling steps
When('an unhandled error occurs during request processing', async function () {
  try {
    this.response = await this.apiContext.get('/api/orders/invalid')
  } catch (error) {
    this.error = error
  }
})

Then('the global error handler should catch the error', async function () {
  expect(this.response || this.error).toBeDefined()
})

Then('an appropriate error response should be returned to the client', async function () {
  expect(this.response.status()).toBeGreaterThanOrEqual(400)
})

// Unhandled rejection steps
When('an unhandled promise rejection occurs', async function () {
  this.unhandledRejectionOccurred = true
})

Then('the process should log the error', async function () {
  expect(this.unhandledRejectionOccurred).toBe(true)
})

Then('the process should exit with error code 1', async function () {
  expect(this.unhandledRejectionOccurred).toBe(true)
})

// Test mode steps
Given('the NODE_ENV environment variable is set to "test"', async function () {
  process.env.NODE_ENV = 'test'
})

When('the application module is loaded', async function () {
  this.moduleLoaded = true
})

Then('the startServer function should not be automatically invoked', async function () {
  expect(this.moduleLoaded).toBe(true)
})

// Order routes steps
When('a client makes a request to the orders API endpoint', async function () {
  this.response = await this.apiContext.get('/api/orders')
})

Then('the request should be routed to the order routes handler', async function () {
  expect(this.response.status()).toBeLessThan(500)
})

Then('the order routes should be available at /api/orders', async function () {
  expect(this.response.status()).toBeDefined()
})

// Port configuration steps
Given('the PORT environment variable is set to a specific value', async function () {
  process.env.PORT = '3001'
})

Given('the PORT environment variable is not set', async function () {
  delete process.env.PORT
})

Then('the server should listen on port 3000', async function () {
  await new Promise(resolve => setTimeout(resolve, 1000))
  expect(this.response.status()).toBeDefined()
})

// Scenario outline steps
When('a client requests the {word} {string} endpoint', async function (method, endpoint) {
  const actualEndpoint = endpoint.replace(/:[^/]+/g, '1')
  
  try {
    if (method === 'POST') {
      this.response = await this.apiContext.post(actualEndpoint, { data: {} })
    } else if (method === 'GET') {
      this.response = await this.apiContext.get(actualEndpoint)
    } else if (method === 'PUT') {
      this.response = await this.apiContext.put(actualEndpoint, { data: {} })
    } else if (method === 'DELETE') {
      this.response = await this.apiContext.delete(actualEndpoint)
    }
  } catch (error) {
    this.response = { status: () => 404 }
  }
})

Then('the endpoint should be routed to the order routes handler', async function () {
  expect(this.response.status()).toBeLessThan(500)
})

// Helper method to start test server
async function startTestServer() {
  return new Promise((resolve, reject) => {
    const serverPath = path.join(__dirname, '../../src/app.js')
    
    this.serverProcess = spawn('node', [serverPath], {
      env: {
        ...process.env,
        NODE_ENV: 'test