// Auto-generated step definitions for frontend/src/components/OrderForm.jsx
// Generated on: 2026-05-24T18:51:26.020Z

```javascript
import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'
import { chromium } from 'playwright'

Before(async function () {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.browser = await chromium.launch()
  this.page = await this.browser.newPage()
  this.baseURL = process.env.BASE_URL || 'http://localhost:3000'
  this.formData = {}
  this.errorMessage = null
})

After(async function () {
  if (this.page) await this.page.close()
  if (this.browser) await this.browser.close()
  if (this.apiContext) await this.apiContext.dispose()
})

Given('the Order Form application is loaded', async function () {
  await this.page.goto(this.baseURL)
  await this.page.waitForLoadState('networkidle')
})

Given('the order service is available', async function () {
  const response = await this.apiContext.get('/health')
  expect(response.status()).toBe(200)
})

Given('I am on the order creation page', async function () {
  await this.page.goto(`${this.baseURL}/orders/create`)
  await this.page.waitForLoadState('networkidle')
})

When('the page loads', async function () {
  await this.page.waitForLoadState('domcontentloaded')
})

Then('I should see an empty order form', async function () {
  const form = await this.page.locator('form[data-testid="order-form"]')
  await expect(form).toBeVisible()
})

Then('the form should have the following fields:', async function (dataTable) {
  const fields = dataTable.hashes()
  for (const field of fields) {
    const fieldName = field['Field Name']
    const defaultValue = field['Default Value']
    const input = await this.page.locator(`input[name="${this.camelCase(fieldName)}"], select[name="${this.camelCase(fieldName)}"]`)
    await expect(input).toBeVisible()
    if (defaultValue) {
      await expect(input).toHaveValue(defaultValue)
    }
  }
})

Then('the submit button should be enabled', async function () {
  const submitButton = await this.page.locator('button[type="submit"]')
  await expect(submitButton).toBeEnabled()
})

Given('an order with ID {string} exists in the system', async function (orderId) {
  this.orderId = orderId
  const orderData = {
    id: orderId,
    orderNumber: 'ORD-2024-001',
    material: 'Steel Sheet',
    quantity: 100,
    priority: 750,
    status: 'IN_PROGRESS',
    plant: 'Plant A',
    scheduledStartDate: '2024-01-15',
    scheduledCompletionDate: '2024-01-20'
  }
  this.mockOrderData = orderData
})

When('I navigate to the edit order page for order {string}', async function (orderId) {
  await this.page.goto(`${this.baseURL}/orders/${orderId}/edit`)
  await this.page.waitForLoadState('networkidle')
})

Then('a loading spinner should be displayed', async function () {
  const spinner = await this.page.locator('[data-testid="loading-spinner"]')
  await expect(spinner).toBeVisible()
})

Then('the order data should be fetched from the service', async function () {
  this.response = await this.apiContext.get(`/orders/${this.orderId}`)
  expect(this.response.status()).toBe(200)
  this.responseData = await this.response.json()
})

Then('the form should be populated with the following data:', async function (dataTable) {
  const fields = dataTable.hashes()
  for (const field of fields) {
    const fieldName = field['Field Name']
    const value = field['Value']
    const input = await this.page.locator(`input[name="${this.camelCase(fieldName)}"], select[name="${this.camelCase(fieldName)}"]`)
    await expect(input).toHaveValue(value)
  }
})

Given('I am editing an existing order', async function () {
  this.orderId = '12345'
  await this.page.goto(`${this.baseURL}/orders/${this.orderId}/edit`)
})

When('the order data is being fetched', async function () {
  await this.page.waitForLoadState('domcontentloaded')
})

Then('a loading spinner should be visible', async function () {
  const spinner = await this.page.locator('[data-testid="loading-spinner"]')
  await expect(spinner).toBeVisible()
})

Then('the text {string} should be displayed', async function (text) {
  const element = await this.page.locator(`text="${text}"`)
  await expect(element).toBeVisible()
})

Then('the form should not be interactive', async function () {
  const form = await this.page.locator('form[data-testid="order-form"]')
  await expect(form).toHaveAttribute('aria-busy', 'true')
})

Given('I am on the edit order page for order {string}', async function (orderId) {
  this.orderId = orderId
  await this.page.goto(`${this.baseURL}/orders/${orderId}/edit`)
})

When('the order fetch request fails with error {string}', async function (errorMessage) {
  this.errorMessage = errorMessage
  await this.page.waitForLoadState('networkidle')
})

Then('an error message should be displayed', async function () {
  const errorElement = await this.page.locator('[data-testid="error-message"]')
  await expect(errorElement).toBeVisible()
})

Then('the error message should contain {string}', async function (expectedText) {
  const errorElement = await this.page.locator('[data-testid="error-message"]')
  await expect(errorElement).toContainText(expectedText)
})

Then('the form should not be populated', async function () {
  const inputs = await this.page.locator('input[type="text"]')
  const count = await inputs.count()
  for (let i = 0; i < count; i++) {
    const value = await inputs.nth(i).inputValue()
    expect(value).toBe('')
  }
})

When('I enter the following order details:', async function (dataTable) {
  const fields = dataTable.hashes()
  for (const field of fields) {
    const fieldName = field['Field Name']
    const value = field['Value']
    const fieldKey = this.camelCase(fieldName)
    this.formData[fieldKey] = value
    const input = await this.page.locator(`input[name="${fieldKey}"], select[name="${fieldKey}"]`)
    await input.fill(value)
  }
})

Then('the form should reflect all entered values', async function () {
  for (const [fieldName, value] of Object.entries(this.formData)) {
    const input = await this.page.locator(`input[name="${fieldName}"], select[name="${fieldName}"]`)
    await expect(input).toHaveValue(value)
  }
})

Then('the submit button should remain enabled', async function () {
  const submitButton = await this.page.locator('button[type="submit"]')
  await expect(submitButton).toBeEnabled()
})

When('I click on the Status dropdown', async function () {
  const statusSelect = await this.page.locator('select[name="status"]')
  await statusSelect.click()
})

Then('I should see the following status options:', async function (dataTable) {
  const statuses = dataTable.hashes()
  for (const status of statuses) {
    const option = await this.page.locator(`option[value="${status.Status}"]`)
    await expect(option).toBeVisible()
  }
})

When('I select {string}', async function (statusValue) {
  const statusSelect = await this.page.locator('select[name="status"]')
  await statusSelect.selectOption(statusValue)
})

Then('the Status field should display {string}', async function (expectedStatus) {
  const statusSelect = await this.page.locator('select[name="status"]')
  await expect(statusSelect).toHaveValue(expectedStatus)
})

Given('I have filled in all required fields with valid data', async function () {
  await this.page.locator('input[name="orderNumber"]').fill('ORD-2024-002')
  await this.page.locator('input[name="material"]').fill('Steel')
  await this.page.locator('input[name="quantity"]').fill('100')
  await this.page.locator('input[name="plant"]').fill('Plant A')
  this.formData = {
    orderNumber: 'ORD-2024-002',
    material: 'Steel',
    quantity: '100',
    plant: 'Plant A'
  }
})

When('I click the submit button', async function () {
  const submitButton = await this.page.locator('button[type="submit"]')
  await submitButton.click()
})

Then('a loading indicator should be displayed', async function () {
  const loadingIndicator = await this.page.locator('[data-testid="loading-indicator"]')
  await expect(loadingIndicator).toBeVisible()
})

Then('the order should be sent to the order service for creation', async function () {
  this.response = await this.apiContext.post('/orders', {
    data: this.formData
  })
})

Then('I should be redirected to the orders list page', async function () {
  await this.page.waitForURL('**/orders')
  expect(this.page.url()).toContain('/orders')
})

Then('no error message should be displayed', async function () {
  const errorElement = await this.page.locator('[data-testid="error-message"]')
  await expect(errorElement).not.toBeVisible()
})

Given('I am editing order {string}', async function (orderId) {
  this.orderId = orderId
  await this.page.goto(`${this.baseURL}/orders/${orderId}/edit`)
  await this.page.waitForLoadState('networkidle')
})

Given('the form is populated with existing order data', async function () {
  await this.page.waitForSelector('input[name="orderNumber"]')
})

When('I modify the Quantity field to {string}', async function (newQuantity) {
  const quantityInput = await this.page.locator('input[name="quantity"]')
  await quantityInput.clear()
  await quantityInput.fill(newQuantity)
  this.formData.quantity = newQuantity
})

Then('the updated order should be sent to the order service', async function () {
  this.response = await this.apiContext.put(`/orders/${this.orderId}`, {
    data: this.formData
  })
})

Given('I have filled in the form with invalid data', async function () {
  await this.page.locator('input[name="quantity"]').fill('invalid')
  this.formData = { quantity: 'invalid' }
})

Then('the form submission should fail', async function () {
  const errorElement = await this.page.locator('[data-testid="error-message"]')
  await expect(errorElement).toBeVisible()
})

Then('I should remain on the order form page', async function () {
  expect(this.page.url()).toContain('/orders')
  expect(this.page.url()).toMatch(/create|edit/)
})

Then('the form data should be preserved', async function () {
  for (const [fieldName, value] of Object.entries(this.formData)) {
    const input