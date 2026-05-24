// Auto-generated step definitions for frontend/src/App.jsx
// Generated on: 2026-05-24T18:50:58.069Z

```javascript
import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { chromium, expect, request } from '@playwright/test'

Before(async function() {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.browser = await chromium.launch()
  this.context = await this.browser.newContext()
  this.page = await this.context.newPage()
  this.baseURL = process.env.BASE_URL || 'http://localhost:3000'
})

After(async function() {
  if (this.page) await this.page.close()
  if (this.context) await this.context.close()
  if (this.browser) await this.browser.close()
  if (this.apiContext) await this.apiContext.dispose()
})

// Background steps
Given('the Order Manager application is loaded', async function() {
  await this.page.goto(this.baseURL)
  await this.page.waitForLoadState('networkidle')
})

Given('the navigation bar is visible', async function() {
  const navbar = this.page.locator('nav')
  await expect(navbar).toBeVisible()
})

Given('the footer is visible', async function() {
  const footer = this.page.locator('footer')
  await expect(footer).toBeVisible()
})

// Scenario: User sees the Order Manager branding in the navbar
When('the user views the navigation bar', async function() {
  this.navbar = this.page.locator('nav')
  await expect(this.navbar).toBeVisible()
})

Then('the Order Manager logo should be displayed', async function() {
  const logo = this.page.locator('nav [data-testid="logo"], nav img[alt*="Order Manager"], nav .logo')
  await expect(logo).toBeVisible()
})

Then('the application title "Order Manager" should be visible', async function() {
  const title = this.page.locator('nav text:has-text("Order Manager"), nav h1:has-text("Order Manager"), nav span:has-text("Order Manager")')
  await expect(title).toBeVisible()
})

Then('the subtitle "Order Management Platform for Manufacturing" should be displayed', async function() {
  const subtitle = this.page.locator('text=Order Management Platform for Manufacturing')
  await expect(subtitle).toBeVisible()
})

Then('the logo should have a blue gradient background', async function() {
  const logo = this.page.locator('nav [data-testid="logo"], nav .logo')
  const style = await logo.evaluate(el => window.getComputedStyle(el).background)
  this.logoStyle = style
  expect(style).toContain('blue')
})

// Scenario: System status indicator shows active state
When('the user views the navigation bar on a desktop device', async function() {
  await this.page.setViewportSize({ width: 1920, height: 1080 })
  this.navbar = this.page.locator('nav')
  await expect(this.navbar).toBeVisible()
})

Then('the "System Active" status indicator should be visible', async function() {
  const statusIndicator = this.page.locator('[data-testid="status-indicator"], .status-indicator, text=System Active')
  await expect(statusIndicator).toBeVisible()
})

Then('the status indicator should show a green pulse animation', async function() {
  const statusIndicator = this.page.locator('[data-testid="status-indicator"], .status-indicator')
  const style = await statusIndicator.evaluate(el => window.getComputedStyle(el).color || window.getComputedStyle(el).backgroundColor)
  this.statusStyle = style
  expect(style.toLowerCase()).toContain('green')
})

Then('the status message should display "System Active"', async function() {
  const statusMessage = this.page.locator('text=System Active')
  await expect(statusMessage).toBeVisible()
})

// Scenario: User navigates to orders list from home page
Given('the user is on the home page', async function() {
  await this.page.goto(`${this.baseURL}/`)
  await this.page.waitForLoadState('networkidle')
})

When('the user accesses the root path "/"', async function() {
  await this.page.goto(`${this.baseURL}/`)
  await this.page.waitForLoadState('networkidle')
})

Then('the user should be redirected to "/orders"', async function() {
  await this.page.waitForURL('**/orders')
  expect(this.page.url()).toContain('/orders')
})

Then('the OrderList component should be displayed', async function() {
  const orderList = this.page.locator('[data-testid="order-list"], .order-list, table')
  await expect(orderList).toBeVisible()
})

// Scenario: User clicks on Order Manager branding to go to orders list
Given('the user is on any page in the application', async function() {
  await this.page.goto(`${this.baseURL}/orders`)
  await this.page.waitForLoadState('networkidle')
})

When('the user clicks on the Order Manager logo or title', async function() {
  const logo = this.page.locator('nav a:has-text("Order Manager"), nav [data-testid="logo"], nav .logo')
  await logo.click()
  await this.page.waitForLoadState('networkidle')
})

// Scenario: User navigates to create new order form
Given('the user is viewing the orders list', async function() {
  await this.page.goto(`${this.baseURL}/orders`)
  await this.page.waitForLoadState('networkidle')
})

When('the user navigates to "/orders/new"', async function() {
  await this.page.goto(`${this.baseURL}/orders/new`)
  await this.page.waitForLoadState('networkidle')
})

Then('the OrderForm component should be displayed', async function() {
  const form = this.page.locator('[data-testid="order-form"], form, .order-form')
  await expect(form).toBeVisible()
})

Then('the form should be in "create" mode', async function() {
  const createIndicator = this.page.locator('text=Create Order, text=New Order, [data-testid="form-mode"][data-mode="create"]')
  await expect(createIndicator.first()).toBeVisible()
})

// Scenario: User views order details
When('the user navigates to "/orders/12345"', async function() {
  await this.page.goto(`${this.baseURL}/orders/12345`)
  await this.page.waitForLoadState('networkidle')
})

Then('the OrderDetails component should be displayed', async function() {
  const orderDetails = this.page.locator('[data-testid="order-details"], .order-details, [data-testid="order-view"]')
  await expect(orderDetails).toBeVisible()
})

Then('the order with ID "12345" should be loaded', async function() {
  const orderId = this.page.locator('text=12345, [data-testid="order-id"]:has-text("12345")')
  await expect(orderId.first()).toBeVisible()
})

// Scenario: User edits an existing order
Given('the user is viewing order details for order "12345"', async function() {
  await this.page.goto(`${this.baseURL}/orders/12345`)
  await this.page.waitForLoadState('networkidle')
})

When('the user navigates to "/orders/12345/edit"', async function() {
  await this.page.goto(`${this.baseURL}/orders/12345/edit`)
  await this.page.waitForLoadState('networkidle')
})

Then('the form should be in "edit" mode', async function() {
  const editIndicator = this.page.locator('text=Edit Order, [data-testid="form-mode"][data-mode="edit"]')
  await expect(editIndicator.first()).toBeVisible()
})

Then('the order data should be pre-populated', async function() {
  const formInputs = this.page.locator('input, textarea, select')
  const inputCount = await formInputs.count()
  expect(inputCount).toBeGreaterThan(0)
  
  const firstInput = formInputs.first()
  const value = await firstInput.inputValue()
  expect(value).toBeTruthy()
})

// Scenario: Application displays footer with copyright information
When('the user scrolls to the bottom of the page', async function() {
  await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
})

Then('the footer should be visible', async function() {
  const footer = this.page.locator('footer')
  await expect(footer).toBeVisible()
})

Then('the copyright text should display "© 2026 Order Management System - BITS Dissertation Project"', async function() {
  const copyright = this.page.locator('text=© 2026 Order Management System - BITS Dissertation Project')
  await expect(copyright).toBeVisible()
})

// Scenario: Navigation bar remains sticky at top while scrolling
Given('the user is on any page with scrollable content', async function() {
  await this.page.goto(`${this.baseURL}/orders`)
  await this.page.waitForLoadState('networkidle')
})

When('the user scrolls down the page', async function() {
  await this.page.evaluate(() => window.scrollBy(0, 500))
  await this.page.waitForTimeout(500)
})

Then('the navigation bar should remain visible at the top', async function() {
  const navbar = this.page.locator('nav')
  await expect(navbar).toBeVisible()
  
  const boundingBox = await navbar.boundingBox()
  expect(boundingBox.y).toBeLessThanOrEqual(100)
})

Then('the navigation bar should maintain its position above all other content', async function() {
  const navbar = this.page.locator('nav')
  const zIndex = await navbar.evaluate(el => window.getComputedStyle(el).zIndex)
  this.navbarZIndex = zIndex
  expect(parseInt(zIndex) || 0).toBeGreaterThanOrEqual(0)
})

// Scenario: Logo has hover effect on desktop
Given('the user is on a desktop device', async function() {
  await this.page.setViewportSize({ width: 1920, height: 1080 })
  await this.page.goto(`${this.baseURL}`)
  await this.page.waitForLoadState('networkidle')
})

When('the user hovers over the Order Manager logo', async function() {
  const logo = this.page.locator('nav [data-testid="logo"], nav .logo, nav img[alt*="Order Manager"]')
  await logo.hover()
  await this.page.waitForTimeout(300)
})

Then('the logo should scale up slightly', async function() {
  const logo = this.page.locator('nav [data-testid="logo"], nav .logo, nav img[alt*="Order Manager"]')
  const transform = await logo.evaluate(el => window.getComputedStyle(el).transform)
  this.logoTransform = transform
  expect(transform).not.toBe('none')
})

Then('the scaling animation should complete smoothly', async function() {
  await this.page.waitForTimeout(500)
  const logo = this.page.locator('nav [data-testid="logo"], nav .logo, nav img[alt*="Order Manager"]')
  const transform = await logo.evaluate(el => window.getComputedStyle(el).transform)
  expect(transform).toBeTruthy()
})

// Scenario: Application layout is responsive on mobile devices
Given('the user is accessing the application on a mobile device', async function() {
  await this.page.setViewportSize({ width: 375, height: 667 })
  await this.page.goto(`${