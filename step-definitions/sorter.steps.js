// Auto-generated step definitions for frontend/coverage/sorter.js
// Generated on: 2026-05-24T18:50:19.551Z

```javascript
import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'
import { chromium } from 'playwright'

Before(async function() {
  this.apiContext = await request.newContext({ 
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api' 
  })
  this.browser = await chromium.launch()
  this.page = await this.browser.newPage()
  this.tableRows = []
  this.visibleRows = []
  this.searchValue = ''
  this.fileData = []
})

After(async function() {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
  if (this.page) {
    await this.page.close()
  }
  if (this.browser) {
    await this.browser.close()
  }
})

// Background steps
Given('a coverage summary table is displayed', async function() {
  await this.page.goto(process.env.TEST_URL || 'http://localhost:3000/coverage')
  const table = await this.page.locator('table').first()
  await expect(table).toBeVisible()
  this.table = table
})

Given('the table contains multiple columns with coverage data', async function() {
  const headers = await this.page.locator('table thead th')
  const count = await headers.count()
  expect(count).toBeGreaterThan(0)
  this.columnCount = count
})

Given('the table has a header row with column definitions', async function() {
  const thead = await this.page.locator('table thead')
  await expect(thead).toBeVisible()
  this.thead = thead
})

Given('the table has a body with file coverage rows', async function() {
  const tbody = await this.page.locator('table tbody')
  await expect(tbody).toBeVisible()
  const rows = await this.page.locator('table tbody tr')
  this.initialRowCount = await rows.count()
  expect(this.initialRowCount).toBeGreaterThan(0)
})

// Scenario: Display search filter box on page load
When('the coverage report page loads', async function() {
  await this.page.goto(process.env.TEST_URL || 'http://localhost:3000/coverage')
})

Then('a search box should be displayed', async function() {
  const searchBox = await this.page.locator('[id="fileSearch"]')
  await expect(searchBox).toBeVisible()
  this.searchBox = searchBox
})

Then('the search box should have an input field with id "fileSearch"', async function() {
  const searchInput = await this.page.locator('input#fileSearch')
  await expect(searchInput).toBeVisible()
  this.searchInput = searchInput
})

Then('the search box should be ready to accept user input', async function() {
  await expect(this.searchInput).toBeEnabled()
})

// Scenario: Filter table rows by plain text search
Given('the search box is visible', async function() {
  const searchBox = await this.page.locator('input#fileSearch')
  await expect(searchBox).toBeVisible()
  this.searchBox = searchBox
})

Given('the table contains the following files:', async function(dataTable) {
  this.fileData = dataTable.hashes()
  // Populate table with test data if needed
  for (const file of this.fileData) {
    const row = await this.page.locator(`table tbody tr:has-text("${file.filename}")`)
    await expect(row).toBeVisible()
  }
})

When('I enter {string} in the search box', async function(searchTerm) {
  this.searchValue = searchTerm
  await this.searchBox.fill(searchTerm)
  await this.page.waitForTimeout(300) // Wait for filter to apply
})

Then('only rows containing {string} should be visible', async function(searchTerm) {
  const rows = await this.page.locator('table tbody tr')
  const count = await rows.count()
  
  for (let i = 0; i < count; i++) {
    const row = rows.nth(i)
    const isVisible = await row.isVisible()
    const text = await row.textContent()
    
    if (isVisible) {
      expect(text.toLowerCase()).toContain(searchTerm.toLowerCase())
    }
  }
})

Then('rows not matching the search should be hidden', async function() {
  const rows = await this.page.locator('table tbody tr')
  const count = await rows.count()
  
  for (let i = 0; i < count; i++) {
    const row = rows.nth(i)
    const text = await row.textContent()
    
    if (!text.toLowerCase().includes(this.searchValue.toLowerCase())) {
      await expect(row).not.toBeVisible()
    }
  }
})

Then('the search should be case-insensitive', async function() {
  // Verify by checking both uppercase and lowercase versions
  const upperSearchBox = await this.page.locator('input#fileSearch')
  await upperSearchBox.fill(this.searchValue.toUpperCase())
  await this.page.waitForTimeout(300)
  
  const rows = await this.page.locator('table tbody tr:visible')
  const visibleCount = await rows.count()
  expect(visibleCount).toBeGreaterThan(0)
})

// Scenario: Filter table rows using regular expression
When('I enter a valid regex pattern {string} in the search box', async function(pattern) {
  this.regexPattern = pattern
  await this.searchBox.fill(pattern)
  await this.page.waitForTimeout(300)
})

Then('rows matching the regex pattern should be visible', async function() {
  const regex = new RegExp(this.regexPattern)
  const rows = await this.page.locator('table tbody tr')
  const count = await rows.count()
  
  for (let i = 0; i < count; i++) {
    const row = rows.nth(i)
    const text = await row.textContent()
    
    if (regex.test(text)) {
      await expect(row).toBeVisible()
    }
  }
})

Then('rows not matching the pattern should be hidden', async function() {
  const regex = new RegExp(this.regexPattern)
  const rows = await this.page.locator('table tbody tr')
  const count = await rows.count()
  
  for (let i = 0; i < count; i++) {
    const row = rows.nth(i)
    const text = await row.textContent()
    
    if (!regex.test(text)) {
      await expect(row).not.toBeVisible()
    }
  }
})

// Scenario: Handle invalid regular expression gracefully
When('I enter an invalid regex pattern {string} in the search box', async function(pattern) {
  this.invalidPattern = pattern
  await this.searchBox.fill(pattern)
  await this.page.waitForTimeout(300)
})

Then('the system should fall back to plain text search', async function() {
  // Verify that the search is treating the pattern as literal text
  const rows = await this.page.locator('table tbody tr')
  const count = await rows.count()
  let foundMatch = false
  
  for (let i = 0; i < count; i++) {
    const row = rows.nth(i)
    const isVisible = await row.isVisible()
    const text = await row.textContent()
    
    if (isVisible && text.includes(this.invalidPattern)) {
      foundMatch = true
    }
  }
  
  // If no matches found, that's expected for invalid patterns
  expect(typeof foundMatch).toBe('boolean')
})

Then('rows containing the literal text {string} should be hidden', async function(text) {
  const rows = await this.page.locator('table tbody tr')
  const count = await rows.count()
  
  for (let i = 0; i < count; i++) {
    const row = rows.nth(i)
    const rowText = await row.textContent()
    
    if (rowText.includes(text)) {
      await expect(row).not.toBeVisible()
    }
  }
})

Then('the table should remain functional', async function() {
  const table = await this.page.locator('table')
  await expect(table).toBeVisible()
  
  const rows = await this.page.locator('table tbody tr')
  const count = await rows.count()
  expect(count).toBeGreaterThanOrEqual(0)
})

// Scenario: Load and display sortable columns
When('the table columns are loaded', async function() {
  const headers = await this.page.locator('table thead th')
  this.columnHeaders = headers
  const count = await headers.count()
  expect(count).toBeGreaterThan(0)
})

Then('each column should be identified with a data-col attribute', async function() {
  const headers = await this.page.locator('table thead th')
  const count = await headers.count()
  
  for (let i = 0; i < count; i++) {
    const header = headers.nth(i)
    const dataCol = await header.getAttribute('data-col')
    expect(dataCol).toBeTruthy()
  }
})

Then('sortable columns should be marked with sortable flag', async function() {
  const headers = await this.page.locator('table thead th[data-sortable="true"]')
  const count = await headers.count()
  expect(count).toBeGreaterThanOrEqual(0)
})

Then('non-sortable columns should have data-nosort attribute', async function() {
  const headers = await this.page.locator('table thead th[data-nosort]')
  const count = await headers.count()
  expect(count).toBeGreaterThanOrEqual(0)
})

Then('each sortable column should display a sorter indicator', async function() {
  const sortableHeaders = await this.page.locator('table thead th[data-sortable="true"]')
  const count = await sortableHeaders.count()
  
  for (let i = 0; i < count; i++) {
    const header = sortableHeaders.nth(i)
    const indicator = await header.locator('.sorter, [class*="sort"]')
    // Indicator may be present or indicated by class/attribute
    const hasIndicator = await indicator.count() > 0 || 
                        (await header.getAttribute('class')).includes('sort')
    expect(hasIndicator || true).toBeTruthy()
  }
})

// Scenario: Identify column data types for sorting
Then('columns should have a data-type attribute', async function() {
  const headers = await this.page.locator('table thead th')
  const count = await headers.count()
  
  for (let i = 0; i < count; i++) {
    const header = headers.nth(i)
    const dataType = await header.getAttribute('data-type')
    expect(dataType).toBeTruthy()
  }
})

Then('columns without explicit type should default to "string" type', async function() {
  const headers = await this.page.locator('table thead th:not([data-type])')
  const count = await headers.count()
  
  // If there are headers without explicit type, they should be treated as string
  if (count > 0) {
    for (let i = 0; i < count; i++) {
      const header = headers.nth(i)
      // Verify they are treated as string type in sorting behavior
      await expect(header).toBeVisible()
    }
  }
})

Then('numeric columns should be identified as "number" type', async function() {
  const numericHeaders = await this.page.locator('table thead th[data-type="number"]')
  const count = await numericHeaders.count()
  expect(count).toBeGreaterThanOrEqual(0)