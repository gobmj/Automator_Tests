// Auto-generated step definitions for backend/src/config/database.js
// Generated on: 2026-05-24T18:48:10.858Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'

Before(async function () {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.environmentVariables = {}
  this.connectionResult = null
  this.errorMessage = null
  this.databaseConfig = {}
  this.isConnected = false
})

After(async function () {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
})

// Background steps
Given('the application environment is configured', async function () {
  this.environmentConfigured = true
})

Given('environment variables are loaded from configuration', async function () {
  this.environmentVariablesLoaded = true
})

// Scenario: Successfully establish database connection with default configuration
Given('the database configuration uses default values', async function () {
  this.databaseConfig = {
    name: 'ordermanagement',
    user: 'orderuser',
    password: 'orderpass',
    host: 'localhost',
    port: 5433
  }
})

When('the system attempts to test the database connection', async function () {
  try {
    this.response = await this.apiContext.get('/database/test-connection')
    this.responseData = await this.response.json()
    this.isConnected = this.response.ok()
    this.connectionResult = this.responseData
  } catch (error) {
    this.errorMessage = error.message
    this.isConnected = false
  }
})

Then('the connection should be established successfully', async function () {
  expect(this.isConnected).toBe(true)
  expect(this.response.status()).toBe(200)
})

Then('a success message should be logged', async function () {
  expect(this.responseData).toHaveProperty('message')
  expect(this.responseData.message).toContain('success')
})

// Scenario: Successfully establish database connection with custom environment variables
Given('the following environment variables are set:', async function (dataTable) {
  const rows = dataTable.hashes()
  rows.forEach(row => {
    this.environmentVariables[row.Variable] = row.Value
  })
})

Then('the database should use the custom configuration', async function () {
  expect(this.responseData).toHaveProperty('config')
  expect(this.responseData.config.database).toBe(this.environmentVariables.DB_NAME)
  expect(this.responseData.config.username).toBe(this.environmentVariables.DB_USER)
  expect(this.responseData.config.host).toBe(this.environmentVariables.DB_HOST)
  expect(this.responseData.config.port).toBe(parseInt(this.environmentVariables.DB_PORT))
})

// Scenario: Handle database connection failure gracefully
Given('the database host is unreachable', async function () {
  this.databaseConfig = {
    host: 'unreachable.invalid.host',
    port: 5433
  }
})

Then('the connection should fail', async function () {
  expect(this.isConnected).toBe(false)
})

Then('an error message should be logged', async function () {
  expect(this.errorMessage || this.responseData?.error).toBeTruthy()
})

Then('the system should return false', async function () {
  expect(this.connectionResult?.success || this.isConnected).toBe(false)
})

// Scenario: Use default database credentials when environment variables are not set
Given('no custom environment variables are configured', async function () {
  this.environmentVariables = {}
})

When('the system initializes the database connection', async function () {
  try {
    this.response = await this.apiContext.get('/database/config')
    this.responseData = await this.response.json()
  } catch (error) {
    this.errorMessage = error.message
  }
})

Then('the system should use the default database name {string}', async function (dbName) {
  expect(this.responseData.config.database).toBe(dbName)
})

Then('the system should use the default database user {string}', async function (user) {
  expect(this.responseData.config.username).toBe(user)
})

Then('the system should use the default database password {string}', async function (password) {
  expect(this.responseData.config.password).toBe(password)
})

Then('the system should use the default host {string}', async function (host) {
  expect(this.responseData.config.host).toBe(host)
})

Then('the system should use the default port {int}', async function (port) {
  expect(this.responseData.config.port).toBe(port)
})

// Scenario: Configure connection pool with appropriate settings
Given('the database connection is initialized', async function () {
  try {
    this.response = await this.apiContext.get('/database/initialize')
    this.responseData = await this.response.json()
    this.isConnected = this.response.ok()
  } catch (error) {
    this.errorMessage = error.message
  }
})

When('the system establishes a connection pool', async function () {
  try {
    this.response = await this.apiContext.get('/database/pool-config')
    this.responseData = await this.response.json()
  } catch (error) {
    this.errorMessage = error.message
  }
})

Then('the maximum pool size should be {int} connections', async function (maxSize) {
  expect(this.responseData.pool.max).toBe(maxSize)
})

Then('the minimum pool size should be {int} connections', async function (minSize) {
  expect(this.responseData.pool.min).toBe(minSize)
})

Then('the connection acquisition timeout should be {int} milliseconds', async function (timeout) {
  expect(this.responseData.pool.acquire).toBe(timeout)
})

Then('the idle connection timeout should be {int} milliseconds', async function (idleTimeout) {
  expect(this.responseData.pool.idle).toBe(idleTimeout)
})

// Scenario: Enable logging in development environment
Given('the application is running in development mode', async function () {
  process.env.NODE_ENV = 'development'
})

When('the database connection is established', async function () {
  try {
    this.response = await this.apiContext.get('/database/initialize')
    this.responseData = await this.response.json()
  } catch (error) {
    this.errorMessage = error.message
  }
})

Then('database query logging should be enabled', async function () {
  expect(this.responseData.logging).toBe(true)
})

Then('SQL queries should be logged to console', async function () {
  expect(this.responseData.logTarget).toBe('console')
})

// Scenario: Disable logging in production environment
Given('the application is running in production mode', async function () {
  process.env.NODE_ENV = 'production'
})

Then('database query logging should be disabled', async function () {
  expect(this.responseData.logging).toBe(false)
})

Then('SQL queries should not be logged', async function () {
  expect(this.responseData.logTarget).toBeUndefined()
})

// Scenario: Successfully synchronize database models without forcing reset
Given('existing database schema exists', async function () {
  this.schemaExists = true
})

When('the system synchronizes the database models', async function () {
  try {
    this.response = await this.apiContext.post('/database/sync', {
      data: { force: false }
    })
    this.responseData = await this.response.json()
  } catch (error) {
    this.errorMessage = error.message
  }
})

Then('the database schema should be updated without data loss', async function () {
  expect(this.response.ok()).toBe(true)
  expect(this.responseData.dataPreserved).toBe(true)
})

// Scenario: Handle database synchronization errors
Given('the database schema has conflicts', async function () {
  this.schemaConflicts = true
})

When('the system attempts to synchronize the database models', async function () {
  try {
    this.response = await this.apiContext.post('/database/sync', {
      data: { force: false }
    })
    this.responseData = await this.response.json()
  } catch (error) {
    this.errorMessage = error.message
    this.syncFailed = true
  }
})

Then('the synchronization should fail', async function () {
  expect(this.response.ok() || this.syncFailed).toBe(true)
})

Then('the error should be thrown to the caller', async function () {
  expect(this.responseData?.error || this.errorMessage).toBeTruthy()
})

// Scenario: Use PostgreSQL dialect for database operations
Given('the database configuration is loaded', async function () {
  try {
    this.response = await this.apiContext.get('/database/config')
    this.responseData = await this.response.json()
  } catch (error) {
    this.errorMessage = error.message
  }
})

Then('the database dialect should be set to PostgreSQL', async function () {
  expect(this.responseData.config.dialect).toBe('postgres')
})

Then('all database operations should use PostgreSQL syntax', async function () {
  expect(this.responseData.config.dialect).toBe('postgres')
  expect(this.responseData.postgresqlEnabled).toBe(true)
})

// Scenario: Export sequelize instance for application use
Given('the database module is imported', async function () {
  this.moduleImported = true
})

When('the application accesses the default export', async function () {
  try {
    this.response = await this.apiContext.get('/database/sequelize-instance')
    this.responseData = await this.response.json()
  } catch (error) {
    this.errorMessage = error.message
  }
})

Then('the sequelize instance should be available', async function () {
  expect(this.responseData).toHaveProperty('sequelizeAvailable')
  expect(this.responseData.sequelizeAvailable).toBe(true)
})

Then('the application should be able to use it for model definitions', async function () {
  expect(this.responseData).toHaveProperty('modelDefinitionCapable')
  expect(this.responseData.modelDefinitionCapable).toBe(true)
})