// Auto-generated step definitions for frontend/coverage/block-navigation.js
// Generated on: 2026-05-24T18:49:51.890Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect, chromium } from '@playwright/test'

Before(async function () {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.browser = await chromium.launch()
  this.page = await this.browser.newPage()
  this.highlightedElement = null
  this.coverageElements = []
  this.currentIndex = -1
  this.previousHighlightedElement = null
})

After(async function () {
  if (this.apiContext) await this.apiContext.dispose()
  if (this.page) await this.page.close()
  if (this.browser) await this.browser.close()
})

Given('the coverage report page is loaded', async function () {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  await this.page.goto(`${baseUrl}/coverage`)
  await this.page.waitForLoadState('networkidle')
})

Given('the page contains code coverage elements with missing coverage indicators', async function () {
  const elements = await this.page.locator('[class*="no"]').all()
  expect(elements.length).toBeGreaterThan(0)
})

Given('keyboard event listeners are active', async function () {
  await this.page.evaluate(() => {
    window.keyboardListenersActive = true
  })
})

Given('the following coverage elements exist:', async function (dataTable) {
  const rows = dataTable.hashes()
  this.coverageElements = []
  
  for (const row of rows) {
    const selector = row.Class
    const elements = await this.page.locator(selector).all()
    expect(elements.length).toBe(parseInt(row.Count))
    this.coverageElements.push(...elements)
  }
})

Given('I am viewing a coverage report with multiple uncovered code blocks', async function () {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  await this.page.goto(`${baseUrl}/coverage`)
  await this.page.waitForLoadState('networkidle')
  
  const uncoveredSelectors = ['.cbranch-no', '.cstat-no', '.fstat-no', 'td.pct.low']
  this.coverageElements = []
  
  for (const selector of uncoveredSelectors) {
    const elements = await this.page.locator(selector).all()
    this.coverageElements.push(...elements)
  }
  
  expect(this.coverageElements.length).toBeGreaterThan(1)
})

Given('no uncovered block is currently highlighted', async function () {
  this.highlightedElement = null
  this.currentIndex = -1
  
  const highlightedElements = await this.page.locator('.highlighted, [data-highlighted="true"]').all()
  expect(highlightedElements.length).toBe(0)
})

Given('the first uncovered block is currently highlighted', async function () {
  const uncoveredSelectors = ['.cbranch-no', '.cstat-no', '.fstat-no', 'td.pct.low']
  this.coverageElements = []
  
  for (const selector of uncoveredSelectors) {
    const elements = await this.page.locator(selector).all()
    this.coverageElements.push(...elements)
  }
  
  if (this.coverageElements.length > 0) {
    this.highlightedElement = this.coverageElements[0]
    this.currentIndex = 0
    await this.highlightedElement.evaluate(el => {
      el.classList.add('highlighted')
      el.setAttribute('data-highlighted', 'true')
    })
  }
})

Given('the second uncovered block is currently highlighted', async function () {
  const uncoveredSelectors = ['.cbranch-no', '.cstat-no', '.fstat-no', 'td.pct.low']
  this.coverageElements = []
  
  for (const selector of uncoveredSelectors) {
    const elements = await this.page.locator(selector).all()
    this.coverageElements.push(...elements)
  }
  
  if (this.coverageElements.length > 1) {
    this.highlightedElement = this.coverageElements[1]
    this.currentIndex = 1
    await this.highlightedElement.evaluate(el => {
      el.classList.add('highlighted')
      el.setAttribute('data-highlighted', 'true')
    })
  }
})

Given('the last uncovered block is currently highlighted', async function () {
  const uncoveredSelectors = ['.cbranch-no', '.cstat-no', '.fstat-no', 'td.pct.low']
  this.coverageElements = []
  
  for (const selector of uncoveredSelectors) {
    const elements = await this.page.locator(selector).all()
    this.coverageElements.push(...elements)
  }
  
  if (this.coverageElements.length > 0) {
    this.currentIndex = this.coverageElements.length - 1
    this.highlightedElement = this.coverageElements[this.currentIndex]
    await this.highlightedElement.evaluate(el => {
      el.classList.add('highlighted')
      el.setAttribute('data-highlighted', 'true')
    })
  }
})

Given('the file search input field is focused', async function () {
  const searchInput = await this.page.locator('input[type="search"], input[placeholder*="search" i], #search, .search-input').first()
  await searchInput.focus()
})

Given('I am viewing a coverage report with nested uncovered code blocks', async function () {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  await this.page.goto(`${baseUrl}/coverage`)
  await this.page.waitForLoadState('networkidle')
})

Given('I am viewing a coverage report with file listing view', async function () {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  await this.page.goto(`${baseUrl}/coverage`)
  await this.page.waitForLoadState('networkidle')
  
  const fileListingElements = await this.page.locator('td.pct.low').all()
  expect(fileListingElements.length).toBeGreaterThan(0)
})

Given('the file listing contains low coverage percentage cells', async function () {
  const lowCoverageCells = await this.page.locator('td.pct.low').all()
  expect(lowCoverageCells.length).toBeGreaterThan(0)
})

When('I press the {string} key', async function (key) {
  await this.page.keyboard.press(key)
  await this.page.waitForTimeout(100)
})

When('the page loads', async function () {
  await this.page.waitForLoadState('networkidle')
})

When('I navigate through uncovered blocks', async function () {
  await this.page.keyboard.press('n')
  await this.page.waitForTimeout(100)
})

Then('the first uncovered code block should be highlighted', async function () {
  const uncoveredSelectors = ['.cbranch-no', '.cstat-no', '.fstat-no', 'td.pct.low']
  let firstElement = null
  
  for (const selector of uncoveredSelectors) {
    const elements = await this.page.locator(selector).all()
    if (elements.length > 0) {
      firstElement = elements[0]
      break
    }
  }
  
  expect(firstElement).not.toBeNull()
  
  const isHighlighted = await firstElement.evaluate(el => {
    return el.classList.contains('highlighted') || el.getAttribute('data-highlighted') === 'true'
  })
  
  expect(isHighlighted).toBe(true)
})

Then('the next uncovered code block should be highlighted', async function () {
  const uncoveredSelectors = ['.cbranch-no', '.cstat-no', '.fstat-no', 'td.pct.low']
  let allElements = []
  
  for (const selector of uncoveredSelectors) {
    const elements = await this.page.locator(selector).all()
    allElements.push(...elements)
  }
  
  const expectedIndex = (this.currentIndex + 1) % allElements.length
  const nextElement = allElements[expectedIndex]
  
  expect(nextElement).not.toBeNull()
  
  const isHighlighted = await nextElement.evaluate(el => {
    return el.classList.contains('highlighted') || el.getAttribute('data-highlighted') === 'true'
  })
  
  expect(isHighlighted).toBe(true)
  this.currentIndex = expectedIndex
})

Then('the previous uncovered code block should be highlighted', async function () {
  const uncoveredSelectors = ['.cbranch-no', '.cstat-no', '.fstat-no', 'td.pct.low']
  let allElements = []
  
  for (const selector of uncoveredSelectors) {
    const elements = await this.page.locator(selector).all()
    allElements.push(...elements)
  }
  
  const expectedIndex = (this.currentIndex - 1 + allElements.length) % allElements.length
  const previousElement = allElements[expectedIndex]
  
  expect(previousElement).not.toBeNull()
  
  const isHighlighted = await previousElement.evaluate(el => {
    return el.classList.contains('highlighted') || el.getAttribute('data-highlighted') === 'true'
  })
  
  expect(isHighlighted).toBe(true)
  this.currentIndex = expectedIndex
})

Then('the last uncovered code block should be highlighted', async function () {
  const uncoveredSelectors = ['.cbranch-no', '.cstat-no', '.fstat-no', 'td.pct.low']
  let allElements = []
  
  for (const selector of uncoveredSelectors) {
    const elements = await this.page.locator(selector).all()
    allElements.push(...elements)
  }
  
  const lastElement = allElements[allElements.length - 1]
  
  expect(lastElement).not.toBeNull()
  
  const isHighlighted = await lastElement.evaluate(el => {
    return el.classList.contains('highlighted') || el.getAttribute('data-highlighted') === 'true'
  })
  
  expect(isHighlighted).toBe(true)
})

Then('the page should scroll to center the highlighted block', async function () {
  const highlightedElement = await this.page.locator('.highlighted, [data-highlighted="true"]').first()
  
  const isInViewport = await highlightedElement.evaluate(el => {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  })
  
  expect(isInViewport).toBe(true)
})

Then('the first uncovered code block should remain highlighted', async function () {
  const uncoveredSelectors = ['.cbranch-no', '.cstat-no', '.fstat-no', 'td.pct.low']
  let firstElement = null
  
  for (const selector of uncoveredSelectors) {
    const elements = await this.page.locator(selector).all()
    if (elements.length > 0) {
      firstElement = elements[0]
      break
    }
  }
  
  const isHighl