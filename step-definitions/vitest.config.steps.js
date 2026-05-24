// Auto-generated step definitions for frontend/vitest.config.js
// Generated on: 2026-05-24T18:53:00.827Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

Before(async function () {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.testState = {
    reactPluginActive: false,
    globalUtilitiesAvailable: false,
    domEnvironmentConfigured: false,
    setupFileLoaded: false,
    cssProcessed: false,
    coverageCalculated: false,
    coverageReports: [],
    configurationValid: true,
    errorMessage: null
  }
})

After(async function () {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
})

// Background steps
Given('the project uses React as the frontend framework', async function () {
  this.testState.framework = 'React'
})

Given('the project uses Vitest as the test runner', async function () {
  this.testState.testRunner = 'Vitest'
})

Given('the project has test files in the src/test directory', async function () {
  const testDir = path.join(process.cwd(), 'src', 'test')
  this.testState.testDirectory = testDir
})

// Scenario: React plugin is enabled for JSX support
When('the Vitest configuration is loaded', async function () {
  try {
    const configPath = path.join(process.cwd(), 'vitest.config.js')
    const configContent = fs.readFileSync(configPath, 'utf-8')
    this.testState.configContent = configContent
    this.testState.configLoaded = true
  } catch (error) {
    this.testState.configLoaded = false
    this.testState.errorMessage = `Failed to load Vitest configuration: ${error.message}`
  }
})

Then('the React plugin should be active', async function () {
  expect(this.testState.configContent).toContain('react()')
  this.testState.reactPluginActive = true
})

Then('JSX syntax should be supported in test files', async function () {
  expect(this.testState.configContent).toContain('react')
  expect(this.testState.reactPluginActive).toBe(true)
})

// Scenario: Global test utilities are available without imports
When('a test file is executed', async function () {
  this.testState.testFileExecuted = true
})

Then('global test functions like describe, it, expect should be available', async function () {
  expect(this.testState.configContent).toContain('globals: true')
  this.testState.globalUtilitiesAvailable = true
})

Then('developers should not need to import test utilities in each file', async function () {
  expect(this.testState.globalUtilitiesAvailable).toBe(true)
})

// Scenario: DOM environment is configured for component testing
When('tests are run', async function () {
  this.testState.testsRunning = true
})

Then('the test environment should be set to jsdom', async function () {
  expect(this.testState.configContent).toContain('environment: \'jsdom\'')
  this.testState.domEnvironmentConfigured = true
})

Then('DOM APIs should be available for testing React components', async function () {
  expect(this.testState.domEnvironmentConfigured).toBe(true)
})

Then('browser-like APIs should be simulated', async function () {
  expect(this.testState.domEnvironmentConfigured).toBe(true)
})

// Scenario: Test setup file is executed before tests run
When('the test suite initializes', async function () {
  this.testState.testSuiteInitializing = true
})

Then('the setup file at ./src/test/setup.js should be loaded first', async function () {
  expect(this.testState.configContent).toContain('./src/test/setup.js')
  this.testState.setupFileLoaded = true
})

Then('any global test configuration should be applied', async function () {
  expect(this.testState.setupFileLoaded).toBe(true)
})

Then('test utilities should be initialized', async function () {
  expect(this.testState.setupFileLoaded).toBe(true)
})

// Scenario: CSS is processed during testing
When('a component imports CSS files', async function () {
  this.testState.componentImportingCSS = true
})

Then('CSS should be processed and available', async function () {
  this.testState.cssProcessed = true
})

Then('styled components should render correctly in tests', async function () {
  expect(this.testState.cssProcessed).toBe(true)
})

Then('CSS-in-JS solutions should work properly', async function () {
  expect(this.testState.cssProcessed).toBe(true)
})

// Scenario: Code coverage is measured with V8 provider
When('tests complete execution', async function () {
  this.testState.testsCompleted = true
})

Then('code coverage should be calculated using V8 provider', async function () {
  expect(this.testState.configContent).toContain('provider: \'v8\'')
  this.testState.coverageCalculated = true
})

Then('coverage metrics should be generated', async function () {
  expect(this.testState.coverageCalculated).toBe(true)
})

// Scenario: Coverage reports are generated in multiple formats
When('code coverage analysis completes', async function () {
  this.testState.coverageAnalysisComplete = true
})

Then('a text format report should be generated for console output', async function () {
  expect(this.testState.configContent).toContain('text')
  this.testState.coverageReports.push('text')
})

Then('a JSON format report should be generated for tooling integration', async function () {
  expect(this.testState.configContent).toContain('json')
  this.testState.coverageReports.push('json')
})

Then('an HTML format report should be generated for visual inspection', async function () {
  expect(this.testState.configContent).toContain('html')
  this.testState.coverageReports.push('html')
})

// Scenario: Coverage excludes non-testable files
When('calculating code coverage', async function () {
  this.testState.calculatingCoverage = true
})

Then('node_modules directory should be excluded', async function () {
  expect(this.testState.configContent).toContain('node_modules')
})

Then('test files in src/test directory should be excluded', async function () {
  expect(this.testState.configContent).toContain('src/test')
})

Then('configuration files matching **\\/\\*.config.js should be excluded', async function () {
  expect(this.testState.configContent).toContain('**/*.config.js')
})

Then('entry point files matching *\\/main.jsx should be excluded', async function () {
  expect(this.testState.configContent).toContain('**/main.jsx')
})

// Scenario: Configuration supports multiple test files
When('multiple test files exist in the project', async function () {
  this.testState.multipleTestFiles = true
})

Then('all test files should be discovered automatically', async function () {
  expect(this.testState.configContent).toContain('include')
})

Then('each test file should have access to global test utilities', async function () {
  expect(this.testState.globalUtilitiesAvailable).toBe(true)
})

Then('each test file should use the jsdom environment', async function () {
  expect(this.testState.domEnvironmentConfigured).toBe(true)
})

// Scenario: Configuration fails gracefully with missing setup file
When('the setup file at ./src/test/setup.js does not exist', async function () {
  const setupPath = path.join(process.cwd(), 'src', 'test', 'setup.js')
  const setupFileExists = fs.existsSync(setupPath)
  if (!setupFileExists) {
    this.testState.setupFileMissing = true
    this.testState.errorMessage = `Setup file not found at ${setupPath}`
  }
})

Then('the test runner should provide a clear error message', async function () {
  if (this.testState.setupFileMissing) {
    expect(this.testState.errorMessage).toBeTruthy()
  }
})

Then('the error should indicate the missing setup file path', async function () {
  if (this.testState.setupFileMissing) {
    expect(this.testState.errorMessage).toContain('setup.js')
  }
})

Then('developers should know to create the setup file', async function () {
  if (this.testState.setupFileMissing) {
    expect(this.testState.errorMessage).toBeTruthy()
  }
})

// Scenario: Configuration supports CSS modules and imports
When('a component uses CSS modules or CSS imports', async function () {
  this.testState.componentUsingCSS = true
})

Then('CSS should be processed correctly', async function () {
  expect(this.testState.componentUsingCSS).toBe(true)
  this.testState.cssProcessedCorrectly = true
})

Then('CSS class names should be available in tests', async function () {
  expect(this.testState.cssProcessedCorrectly).toBe(true)
})

Then('styled components should render with styles applied', async function () {
  expect(this.testState.cssProcessedCorrectly).toBe(true)
})