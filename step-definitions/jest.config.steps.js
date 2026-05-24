// Auto-generated step definitions for backend/jest.config.js
// Generated on: 2026-05-24T18:47:42.829Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'

Before(async function () {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.jestConfigPath = path.resolve(process.cwd(), 'backend/jest.config.js')
  this.jestConfig = null
  this.testResults = null
  this.coverageData = null
})

After(async function () {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
})

Given('the Jest configuration file is loaded', async function () {
  const configContent = fs.readFileSync(this.jestConfigPath, 'utf-8')
  this.jestConfig = eval(`(${configContent})`)
  expect(this.jestConfig).toBeDefined()
})

Given('the test environment is initialized', async function () {
  expect(this.jestConfig).toBeDefined()
  this.testEnvironment = this.jestConfig.testEnvironment || 'node'
})

When('the Jest configuration is applied', async function () {
  expect(this.jestConfig).toBeDefined()
  this.appliedConfig = { ...this.jestConfig }
})

Then('the test environment should be set to {string}', async function (expectedEnv) {
  expect(this.appliedConfig.testEnvironment).toBe(expectedEnv)
})

Then('tests should execute in a Node.js environment', async function () {
  expect(this.appliedConfig.testEnvironment).toBe('node')
})

When('tests are executed with coverage collection enabled', async function () {
  this.coverageEnabled = this.jestConfig.collectCoverage === true
  expect(this.coverageEnabled).toBe(true)
})

Then('coverage reports should be generated', async function () {
  expect(this.jestConfig.collectCoverage).toBe(true)
})

Then('coverage data should be stored in the {string} directory', async function (directory) {
  expect(this.jestConfig.coverageDirectory).toBe(directory)
})

When('coverage collection is configured', async function () {
  this.coverageConfig = this.jestConfig.collectCoverageFrom || []
})

Then('all JavaScript files in {string} directory should be analyzed', async function (directory) {
  const coveragePatterns = this.jestConfig.collectCoverageFrom || []
  const hasSourcePattern = coveragePatterns.some(pattern => pattern.includes(directory))
  expect(hasSourcePattern).toBe(true)
})

Then('coverage metrics should be collected for included files', async function () {
  expect(this.jestConfig.collectCoverageFrom).toBeDefined()
  expect(Array.isArray(this.jestConfig.collectCoverageFrom)).toBe(true)
})

Then('the following files should be excluded from coverage:', async function (dataTable) {
  const excludedFiles = dataTable.raw().slice(1).map(row => row[0])
  const coverageFrom = this.jestConfig.collectCoverageFrom || []
  
  for (const file of excludedFiles) {
    const isExcluded = coverageFrom.some(pattern => 
      pattern.includes('!') && pattern.includes(file)
    )
    expect(isExcluded || !coverageFrom.some(p => p.includes(file))).toBe(true)
  }
})

Then('no coverage metrics should be collected for excluded files', async function () {
  expect(this.jestConfig.collectCoverageFrom).toBeDefined()
})

When('coverage thresholds are configured', async function () {
  this.coverageThresholds = this.jestConfig.coverageThreshold || {}
})

Then('the following minimum coverage requirements should apply:', async function (dataTable) {
  const thresholds = dataTable.rowsHash()
  const globalThreshold = this.jestConfig.coverageThreshold?.global || {}
  
  for (const [metric, threshold] of Object.entries(thresholds)) {
    const expectedValue = parseInt(threshold)
    expect(globalThreshold[metric]).toBe(expectedValue)
  }
})

Then('tests should pass regardless of coverage percentage', async function () {
  const globalThreshold = this.jestConfig.coverageThreshold?.global || {}
  expect(globalThreshold.branches).toBe(0)
  expect(globalThreshold.functions).toBe(0)
  expect(globalThreshold.lines).toBe(0)
  expect(globalThreshold.statements).toBe(0)
})

When('Jest searches for test files', async function () {
  this.testMatch = this.jestConfig.testMatch || []
})

Then('test files matching the pattern {string} should be discovered', async function (pattern) {
  expect(this.jestConfig.testMatch).toContain(pattern)
})

Then('only files in the {string} directory with {string} extension should be executed', async function (directory, extension) {
  const testPatterns = this.jestConfig.testMatch || []
  const hasPattern = testPatterns.some(pattern => 
    pattern.includes(directory) && pattern.includes(extension)
  )
  expect(hasPattern).toBe(true)
})

When('a module uses relative import paths with .js extension', async function () {
  this.moduleNameMapper = this.jestConfig.moduleNameMapper || {}
})

Then('the module name mapper should strip the .js extension', async function () {
  expect(this.jestConfig.moduleNameMapper).toBeDefined()
  const mapperKeys = Object.keys(this.jestConfig.moduleNameMapper)
  expect(mapperKeys.length).toBeGreaterThan(0)
})

Then('the import should resolve to the correct module', async function () {
  expect(this.jestConfig.moduleNameMapper).toBeDefined()
})

When('tests are executed', async function () {
  this.verbose = this.jestConfig.verbose === true
})

Then('verbose logging should be enabled', async function () {
  expect(this.jestConfig.verbose).toBe(true)
})

Then('detailed test results should be displayed in the console', async function () {
  expect(this.jestConfig.verbose).toBe(true)
})

When('all tests have finished executing', async function () {
  this.forceExit = this.jestConfig.forceExit === true
})

Then('the test process should force exit', async function () {
  expect(this.jestConfig.forceExit).toBe(true)
})

Then('no hanging processes should remain', async function () {
  expect(this.jestConfig.forceExit).toBe(true)
})

When('a test completes execution', async function () {
  this.clearMocks = this.jestConfig.clearMocks === true
  this.resetMocks = this.jestConfig.resetMocks === true
  this.restoreMocks = this.jestConfig.restoreMocks === true
})

Then('all mocks should be cleared', async function () {
  expect(this.jestConfig.clearMocks).toBe(true)
})

Then('mock state should be reset for the next test', async function () {
  expect(this.jestConfig.resetMocks).toBe(true)
})

Then('mock implementations should be restored to original state', async function () {
  expect(this.jestConfig.restoreMocks).toBe(true)
})

When('test files are loaded', async function () {
  this.transform = this.jestConfig.transform || {}
})

Then('no Babel or other code transformers should be applied', async function () {
  const transformKeys = Object.keys(this.jestConfig.transform || {})
  expect(transformKeys.length).toBe(0)
})

Then('test files should be executed as-is', async function () {
  expect(Object.keys(this.jestConfig.transform || {}).length).toBe(0)
})

When('the Jest configuration is validated', async function () {
  expect(this.jestConfig).toBeDefined()
  this.validationErrors = []
  
  const requiredProperties = [
    'testEnvironment',
    'collectCoverage',
    'coverageDirectory',
    'collectCoverageFrom',
    'coverageThreshold',
    'testMatch',
    'verbose',
    'forceExit',
    'clearMocks',
    'resetMocks',
    'restoreMocks'
  ]
  
  for (const prop of requiredProperties) {
    if (!(prop in this.jestConfig)) {
      this.validationErrors.push(`Missing property: ${prop}`)
    }
  }
})

Then('all configuration properties should be recognized', async function () {
  const validProperties = [
    'testEnvironment',
    'collectCoverage',
    'coverageDirectory',
    'collectCoverageFrom',
    'coverageThreshold',
    'testMatch',
    'moduleNameMapper',
    'verbose',
    'forceExit',
    'clearMocks',
    'resetMocks',
    'restoreMocks',
    'transform'
  ]
  
  for (const key of Object.keys(this.jestConfig)) {
    expect(validProperties).toContain(key)
  }
})

Then('the configuration should not contain any syntax errors', async function () {
  expect(this.jestConfig).toBeDefined()
  expect(typeof this.jestConfig).toBe('object')
})

Then('tests should be able to run successfully with this configuration', async function () {
  expect(this.validationErrors.length).toBe(0)
  expect(this.jestConfig.testEnvironment).toBe('node')
  expect(this.jestConfig.collectCoverage).toBe(true)
})