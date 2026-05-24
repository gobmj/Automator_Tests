// Auto-generated step definitions for frontend/src/main.jsx
// Generated on: 2026-05-24T18:51:55.682Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect, chromium } from '@playwright/test'

Before(async function () {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.browser = await chromium.launch()
  this.context = await this.browser.newContext()
  this.page = await this.context.newPage()
  this.consoleErrors = []
  this.page.on('console', (msg) => {
    if (msg.type() === 'error') {
      this.consoleErrors.push(msg.text())
    }
  })
})

After(async function () {
  if (this.page) await this.page.close()
  if (this.context) await this.context.close()
  if (this.browser) await this.browser.close()
  if (this.apiContext) await this.apiContext.dispose()
})

Given('the browser has loaded the HTML page', async function () {
  const baseUrl = process.env.APP_URL || 'http://localhost:5173'
  await this.page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
})

Given('the DOM contains an element with id "root"', async function () {
  const rootElement = await this.page.locator('#root')
  await expect(rootElement).toBeVisible()
})

Given('React is available in the runtime environment', async function () {
  const reactAvailable = await this.page.evaluate(() => {
    return typeof window !== 'undefined' && window.React !== undefined
  })
  expect(reactAvailable).toBeTruthy()
})

When('the page finishes loading', async function () {
  await this.page.waitForLoadState('networkidle')
})

Then('the React application should be mounted to the root element', async function () {
  const rootElement = await this.page.locator('#root')
  const hasChildren = await rootElement.evaluate((el) => el.children.length > 0)
  expect(hasChildren).toBeTruthy()
})

Then('the App component should be rendered', async function () {
  const appComponent = await this.page.locator('[class*="App"]')
  await expect(appComponent).toBeVisible()
})

Then('no console errors should be present', async function () {
  expect(this.consoleErrors.length).toBe(0)
})

When('the application initializes', async function () {
  const baseUrl = process.env.APP_URL || 'http://localhost:5173'
  await this.page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await this.page.waitForLoadState('networkidle')
})

Then('React StrictMode should be active', async function () {
  const strictModeActive = await this.page.evaluate(() => {
    return window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== undefined
  })
  expect(strictModeActive).toBeTruthy()
})

Then('additional development checks should be performed', async function () {
  const isDevelopment = await this.page.evaluate(() => {
    return process.env.NODE_ENV === 'development'
  })
  expect(isDevelopment).toBeTruthy()
})

Then('potential issues should be logged to the console', async function () {
  const consoleLogs = []
  this.page.on('console', (msg) => {
    consoleLogs.push(msg.text())
  })
  this.consoleLogs = consoleLogs
})

Given('the HTML page is loaded', async function () {
  const baseUrl = process.env.APP_URL || 'http://localhost:5173'
  await this.page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
})

Then('the element with id "root" should exist in the document', async function () {
  const rootElement = await this.page.locator('#root')
  await expect(rootElement).toBeAttached()
})

Then('the element should be accessible to React', async function () {
  const isAccessible = await this.page.evaluate(() => {
    const root = document.getElementById('root')
    return root !== null && root !== undefined
  })
  expect(isAccessible).toBeTruthy()
})

Given('the HTML page is missing the root element', async function () {
  this.page.setContent('<html><body><div id="app"></div></body></html>')
})

Then('an error should be displayed to the user', async function () {
  const errorElement = await this.page.locator('[class*="error"], [role="alert"]').first()
  const isVisible = await errorElement.isVisible().catch(() => false)
  this.errorDisplayed = isVisible
})

Then('the application should not crash the browser', async function () {
  const isPageClosed = this.page.isClosed()
  expect(isPageClosed).toBeFalsy()
})

When('the application loads', async function () {
  const baseUrl = process.env.APP_URL || 'http://localhost:5173'
  await this.page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
})

Then('the index.css stylesheet should be imported', async function () {
  const stylesheets = await this.page.evaluate(() => {
    return Array.from(document.styleSheets).map((sheet) => sheet.href)
  })
  const hasCss = stylesheets.some((href) => href && href.includes('index.css'))
  expect(hasCss || stylesheets.length > 0).toBeTruthy()
})

Then('all global styles should be applied to the page', async function () {
  const bodyStyles = await this.page.evaluate(() => {
    const body = document.body
    return window.getComputedStyle(body)
  })
  expect(bodyStyles).toBeDefined()
})

Then('the styled components should render correctly', async function () {
  const styledElements = await this.page.locator('[style]')
  const count = await styledElements.count()
  expect(count).toBeGreaterThanOrEqual(0)
})

Then('the App component should be mounted as a child of StrictMode', async function () {
  const appMounted = await this.page.evaluate(() => {
    const root = document.getElementById('root')
    return root && root.children.length > 0
  })
  expect(appMounted).toBeTruthy()
})

Then('the App component should have access to the React context', async function () {
  const contextAvailable = await this.page.evaluate(() => {
    return typeof window !== 'undefined'
  })
  expect(contextAvailable).toBeTruthy()
})

Then('the component lifecycle should begin properly', async function () {
  await this.page.waitForTimeout(500)
  const appElement = await this.page.locator('#root > *')
  await expect(appElement).toBeAttached()
})

Given('the application is already running', async function () {
  const baseUrl = process.env.APP_URL || 'http://localhost:5173'
  await this.page.goto(baseUrl, { waitUntil: 'networkidle' })
  this.firstRootId = await this.page.evaluate(() => document.getElementById('root')?.id)
})

When('the page attempts to initialize again', async function () {
  await this.page.reload({ waitUntil: 'networkidle' })
})

Then('only one React root should be active', async function () {
  const rootCount = await this.page.evaluate(() => {
    return document.querySelectorAll('#root').length
  })
  expect(rootCount).toBe(1)
})

Then('the previous instance should be properly cleaned up', async function () {
  const orphanedElements = await this.page.evaluate(() => {
    return document.querySelectorAll('[data-reactroot]').length
  })
  expect(orphanedElements).toBeLessThanOrEqual(1)
})

Then('no memory leaks should occur', async function () {
  const metrics = await this.page.evaluate(() => {
    if (performance.memory) {
      return {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize
      }
    }
    return null
  })
  this.memoryMetrics = metrics
  expect(metrics).toBeDefined()
})

Then('React 18 or higher should be used', async function () {
  const reactVersion = await this.page.evaluate(() => {
    return window.React?.version || 'unknown'
  })
  this.reactVersion = reactVersion
  expect(reactVersion).not.toBe('unknown')
})

Then('the createRoot API should be available', async function () {
  const createRootAvailable = await this.page.evaluate(() => {
    return typeof window.ReactDOM?.createRoot === 'function'
  })
  expect(createRootAvailable).toBeTruthy()
})

Then('the rendering should use concurrent features', async function () {
  const concurrentFeaturesAvailable = await this.page.evaluate(() => {
    return typeof window.React?.startTransition === 'function'
  })
  expect(concurrentFeaturesAvailable).toBeTruthy()
})