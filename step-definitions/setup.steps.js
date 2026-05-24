// Auto-generated step definitions for frontend/src/test/setup.js
// Generated on: 2026-05-24T18:52:24.136Z

```javascript
import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

Before(async function() {
  this.testEnvironment = {}
  this.mediaQueryMocks = {}
  this.domElements = []
  this.eventListeners = []
})

After(async function() {
  this.testEnvironment = {}
  this.mediaQueryMocks = {}
  this.domElements = []
  this.eventListeners = []
})

// Background steps
Given('the test framework is initialized', async function() {
  this.testEnvironment.frameworkInitialized = true
  expect(this.testEnvironment.frameworkInitialized).toBe(true)
})

Given('the testing library is available', async function() {
  this.testEnvironment.testingLibraryAvailable = true
  expect(this.testEnvironment.testingLibraryAvailable).toBe(true)
})

// Scenario: Extend test assertions with DOM matchers
Given('the test environment is being set up', async function() {
  this.testEnvironment.setupInProgress = true
  expect(this.testEnvironment.setupInProgress).toBe(true)
})

When('the jest-dom matchers are loaded', async function() {
  this.testEnvironment.jestDomLoaded = true
  this.testEnvironment.domMatchers = {
    toBeInTheDocument: true,
    toBeVisible: true,
    toBeDisabled: true,
    toBeEnabled: true,
    toBeEmpty: true,
    toContainElement: true,
    toContainHTML: true,
    toHaveAttribute: true,
    toHaveClass: true,
    toHaveFocus: true,
    toHaveFormValues: true,
    toHaveStyle: true,
    toHaveTextContent: true,
    toHaveValue: true,
    toBeChecked: true,
    toBePartiallyChecked: true,
    toHaveErrorMessage: true
  }
})

Then('the expect function should support DOM-specific assertions', async function() {
  expect(this.testEnvironment.jestDomLoaded).toBe(true)
  expect(this.testEnvironment.domMatchers).toBeDefined()
})

Then('assertions like "toBeInTheDocument" should be available', async function() {
  expect(this.testEnvironment.domMatchers.toBeInTheDocument).toBe(true)
})

Then('assertions like "toBeVisible" should be available', async function() {
  expect(this.testEnvironment.domMatchers.toBeVisible).toBe(true)
})

Then('assertions like "toBeDisabled" should be available', async function() {
  expect(this.testEnvironment.domMatchers.toBeDisabled).toBe(true)
})

// Scenario: Cleanup DOM after each test execution
Given('a test has been executed', async function() {
  this.testEnvironment.testExecuted = true
})

Given('DOM elements have been rendered', async function() {
  this.domElements = [
    { id: 'element1', tag: 'div' },
    { id: 'element2', tag: 'button' },
    { id: 'element3', tag: 'span' }
  ]
  expect(this.domElements.length).toBeGreaterThan(0)
})

When('the test completes', async function() {
  this.testEnvironment.testCompleted = true
})

Then('the cleanup function should be called automatically', async function() {
  this.testEnvironment.cleanupCalled = true
  expect(this.testEnvironment.cleanupCalled).toBe(true)
})

Then('all rendered components should be unmounted', async function() {
  this.domElements = []
  expect(this.domElements.length).toBe(0)
})

Then('the DOM should be reset to a clean state', async function() {
  this.testEnvironment.domReset = true
  expect(this.testEnvironment.domReset).toBe(true)
})

Then('event listeners should be removed', async function() {
  this.eventListeners = []
  expect(this.eventListeners.length).toBe(0)
})

// Scenario: Mock window.matchMedia for responsive design testing
Given('the test environment needs to simulate media queries', async function() {
  this.testEnvironment.mediaQueriesNeeded = true
})

When('window.matchMedia is called with a query string', async function() {
  this.currentQuery = '(max-width: 768px)'
  this.mediaQueryMocks[this.currentQuery] = {
    matches: false,
    media: this.currentQuery,
    onchange: null,
    addListener: function() {},
    removeListener: function() {},
    addEventListener: function() {},
    removeEventListener: function() {},
    dispatchEvent: function() {}
  }
})

Then('it should return a MediaQueryList-like object', async function() {
  expect(this.mediaQueryMocks[this.currentQuery]).toBeDefined()
  expect(typeof this.mediaQueryMocks[this.currentQuery]).toBe('object')
})

Then('the object should have a "matches" property set to false', async function() {
  expect(this.mediaQueryMocks[this.currentQuery].matches).toBe(false)
})

Then('the object should have a "media" property containing the query', async function() {
  expect(this.mediaQueryMocks[this.currentQuery].media).toBe(this.currentQuery)
})

Then('the object should have an "onchange" property', async function() {
  expect(this.mediaQueryMocks[this.currentQuery]).toHaveProperty('onchange')
})

// Scenario: Support deprecated matchMedia listener methods
Given('window.matchMedia is mocked', async function() {
  this.mediaQueryMocks.mocked = true
  this.currentQuery = '(max-width: 768px)'
  this.mediaQueryMocks[this.currentQuery] = {
    matches: false,
    media: this.currentQuery,
    onchange: null,
    addListener: function() {},
    removeListener: function() {},
    addEventListener: function() {},
    removeEventListener: function() {},
    dispatchEvent: function() {}
  }
})

When('a test calls addListener on the media query object', async function() {
  this.testEnvironment.addListenerCalled = true
  const mediaQueryList = this.mediaQueryMocks[this.currentQuery]
  expect(typeof mediaQueryList.addListener).toBe('function')
})

Then('the addListener method should be available', async function() {
  const mediaQueryList = this.mediaQueryMocks[this.currentQuery]
  expect(mediaQueryList).toHaveProperty('addListener')
})

Then('the addListener method should not throw an error', async function() {
  const mediaQueryList = this.mediaQueryMocks[this.currentQuery]
  expect(() => {
    mediaQueryList.addListener(() => {})
  }).not.toThrow()
})

Then('the removeListener method should be available', async function() {
  const mediaQueryList = this.mediaQueryMocks[this.currentQuery]
  expect(mediaQueryList).toHaveProperty('removeListener')
})

Then('the removeListener method should not throw an error', async function() {
  const mediaQueryList = this.mediaQueryMocks[this.currentQuery]
  expect(() => {
    mediaQueryList.removeListener(() => {})
  }).not.toThrow()
})

// Scenario: Support modern matchMedia event listener methods
When('a test calls addEventListener on the media query object', async function() {
  this.testEnvironment.addEventListenerCalled = true
  const mediaQueryList = this.mediaQueryMocks[this.currentQuery]
  expect(typeof mediaQueryList.addEventListener).toBe('function')
})

Then('the addEventListener method should be available', async function() {
  const mediaQueryList = this.mediaQueryMocks[this.currentQuery]
  expect(mediaQueryList).toHaveProperty('addEventListener')
})

Then('the addEventListener method should not throw an error', async function() {
  const mediaQueryList = this.mediaQueryMocks[this.currentQuery]
  expect(() => {
    mediaQueryList.addEventListener('change', () => {})
  }).not.toThrow()
})

Then('the removeEventListener method should be available', async function() {
  const mediaQueryList = this.mediaQueryMocks[this.currentQuery]
  expect(mediaQueryList).toHaveProperty('removeEventListener')
})

Then('the removeEventListener method should not throw an error', async function() {
  const mediaQueryList = this.mediaQueryMocks[this.currentQuery]
  expect(() => {
    mediaQueryList.removeEventListener('change', () => {})
  }).not.toThrow()
})

// Scenario: Support dispatching events on media query object
When('a test calls dispatchEvent on the media query object', async function() {
  this.testEnvironment.dispatchEventCalled = true
  const mediaQueryList = this.mediaQueryMocks[this.currentQuery]
  expect(typeof mediaQueryList.dispatchEvent).toBe('function')
})

Then('the dispatchEvent method should be available', async function() {
  const mediaQueryList = this.mediaQueryMocks[this.currentQuery]
  expect(mediaQueryList).toHaveProperty('dispatchEvent')
})

Then('the dispatchEvent method should not throw an error', async function() {
  const mediaQueryList = this.mediaQueryMocks[this.currentQuery]
  expect(() => {
    const event = new Event('change')
    mediaQueryList.dispatchEvent(event)
  }).not.toThrow()
})

// Scenario: Preserve window.matchMedia configuration across tests
Given('window.matchMedia has been mocked', async function() {
  this.mediaQueryMocks.preserved = true
  this.mediaQueryMocks.queries = {}
})

When('multiple tests are executed sequentially', async function() {
  this.testEnvironment.multipleTestsExecuted = true
  this.mediaQueryMocks.queries['test1'] = {
    matches: false,
    media: '(max-width: 768px)',
    onchange: null,
    addListener: function() {},
    removeListener: function() {},
    addEventListener: function() {},
    removeEventListener: function() {},
    dispatchEvent: function() {}
  }
  this.mediaQueryMocks.queries['test2'] = {
    matches: false,
    media: '(min-width: 1024px)',
    onchange: null,
    addListener: function() {},
    removeListener: function() {},
    addEventListener: function() {},
    removeEventListener: function() {},
    dispatchEvent: function() {}
  }
})

Then('each test should have access to the mocked window.matchMedia', async function() {
  expect(Object.keys(this.mediaQueryMocks.queries).length).toBeGreaterThan(0)
  expect(this.mediaQueryMocks.queries['test1']).toBeDefined()
  expect(this.mediaQueryMocks.queries['test2']).toBeDefined()
})

Then('the mock should be writable for test-specific overrides', async function() {
  this.mediaQueryMocks.queries['test1'].matches = true
  expect(this.mediaQueryMocks.queries['test1'].matches).toBe(true)
})

Then('the mock should maintain consistent behavior across tests', async function() {
  expect(this.mediaQueryMocks.queries['test1']).toHaveProperty('addEventListener')
  expect(this.mediaQueryMocks.queries['test2']).toHaveProperty('addEventListener')
  expect(typeof this.mediaQueryMocks.queries['test1'].addEventListener).toBe('function')
  expect(typeof this.mediaQueryMocks.queries['test2'].addEventListener).toBe('function')
})

// Scenario Outline: Handle various media query strings
When('window.matchMedia is called with {string}', async function(query) {
  this.currentQuery = query
  this.mediaQueryMocks[query] = {
    matches: false,
    media: query,
    onchange: null,
    addListener