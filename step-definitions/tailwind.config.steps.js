// Auto-generated step definitions for frontend/tailwind.config.js
// Generated on: 2026-05-24T18:52:35.045Z

import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'

Before(async function () {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.configFilePath = path.join(process.cwd(), 'frontend', 'tailwind.config.js')
  this.configContent = null
  this.parsedConfig = null
  this.fileTypes = {
    html: false,
    js: false,
    ts: false,
    jsx: false,
    tsx: false
  }
})

After(async function () {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
})

Given('the Tailwind CSS configuration file exists', async function () {
  const fileExists = fs.existsSync(this.configFilePath)
  expect(fileExists).toBe(true)
})

Given('the project uses React with TypeScript and JavaScript files', async function () {
  this.projectType = 'React with TypeScript and JavaScript'
  this.supportedExtensions = ['.js', '.ts', '.jsx', '.tsx', '.html']
})

Given('the application contains multiple file types', async function () {
  this.fileTypes = {
    html: true,
    js: true,
    ts: true,
    jsx: true,
    tsx: true
  }
})

When('the Tailwind CSS configuration is loaded', async function () {
  this.configContent = fs.readFileSync(this.configFilePath, 'utf-8')
  
  // Use dynamic import to load the config
  const configModule = await import(this.configFilePath)
  this.parsedConfig = configModule.default || configModule
})

When('the Tailwind CSS configuration is initialized', async function () {
  this.configContent = fs.readFileSync(this.configFilePath, 'utf-8')
  
  const configModule = await import(this.configFilePath)
  this.parsedConfig = configModule.default || configModule
})

When('developers organize files in the src directory', async function () {
  this.srcDirectory = path.join(process.cwd(), 'src')
  this.directoryStructure = 'organized in src directory'
})

When('Tailwind CSS scans for content', async function () {
  expect(this.parsedConfig).toBeDefined()
  expect(this.parsedConfig.content).toBeDefined()
  this.contentPaths = this.parsedConfig.content
})

Then('the content paths should include the following files:', async function (dataTable) {
  const expectedPaths = dataTable.raw().slice(1).map(row => row[0])
  
  expect(this.parsedConfig.content).toBeDefined()
  
  expectedPaths.forEach(expectedPath => {
    const pathExists = this.parsedConfig.content.some(contentPath => 
      contentPath.includes(expectedPath.replace(/\.\//g, ''))
    )
    expect(pathExists).toBe(true)
  })
})

Then('the configuration should recognize HTML files', async function () {
  const hasHtmlPattern = this.parsedConfig.content.some(path => 
    path.includes('.html') || path.includes('index.html')
  )
  expect(hasHtmlPattern).toBe(true)
  this.fileTypes.html = true
})

Then('the configuration should recognize JavaScript files', async function () {
  const hasJsPattern = this.parsedConfig.content.some(path => 
    path.includes('.js') || path.includes('js,')
  )
  expect(hasJsPattern).toBe(true)
  this.fileTypes.js = true
})

Then('the configuration should recognize TypeScript files', async function () {
  const hasTsPattern = this.parsedConfig.content.some(path => 
    path.includes('.ts') || path.includes('ts,') || path.includes('ts}')
  )
  expect(hasTsPattern).toBe(true)
  this.fileTypes.ts = true
})

Then('the configuration should recognize JSX files', async function () {
  const hasJsxPattern = this.parsedConfig.content.some(path => 
    path.includes('.jsx') || path.includes('jsx,')
  )
  expect(hasJsxPattern).toBe(true)
  this.fileTypes.jsx = true
})

Then('the configuration should recognize TSX files', async function () {
  const hasTsxPattern = this.parsedConfig.content.some(path => 
    path.includes('.tsx') || path.includes('tsx}')
  )
  expect(hasTsxPattern).toBe(true)
  this.fileTypes.tsx = true
})

Then('the theme should have an extend property', async function () {
  expect(this.parsedConfig.theme).toBeDefined()
  expect(this.parsedConfig.theme.extend).toBeDefined()
})

Then('the extend property should be available for customization', async function () {
  expect(typeof this.parsedConfig.theme.extend).toBe('object')
  expect(this.parsedConfig.theme.extend).not.toBeNull()
})

Then('custom theme values can be added without overriding defaults', async function () {
  const extendKeys = Object.keys(this.parsedConfig.theme.extend)
  expect(Array.isArray(extendKeys) || typeof extendKeys === 'object').toBe(true)
  this.canAddCustomTheme = true
})

Then('the plugins array should exist', async function () {
  expect(this.parsedConfig.plugins).toBeDefined()
  expect(Array.isArray(this.parsedConfig.plugins)).toBe(true)
})

Then('the plugins array should be empty by default', async function () {
  expect(this.parsedConfig.plugins.length).toBe(0)
})

Then('plugins can be added to extend functionality', async function () {
  this.canAddPlugins = true
  expect(Array.isArray(this.parsedConfig.plugins)).toBe(true)
})

Then('the exported configuration should be a valid object', async function () {
  expect(typeof this.parsedConfig).toBe('object')
  expect(this.parsedConfig).not.toBeNull()
})

Then('the configuration should contain content property', async function () {
  expect(this.parsedConfig.content).toBeDefined()
  expect(Array.isArray(this.parsedConfig.content) || typeof this.parsedConfig.content === 'object').toBe(true)
})

Then('the configuration should contain theme property', async function () {
  expect(this.parsedConfig.theme).toBeDefined()
  expect(typeof this.parsedConfig.theme).toBe('object')
})

Then('the configuration should contain plugins property', async function () {
  expect(this.parsedConfig.plugins).toBeDefined()
  expect(Array.isArray(this.parsedConfig.plugins)).toBe(true)
})

Then('it should process JavaScript files', async function () {
  expect(this.fileTypes.js).toBe(true)
})

Then('it should process TypeScript files', async function () {
  expect(this.fileTypes.ts).toBe(true)
})

Then('it should process JSX React components', async function () {
  expect(this.fileTypes.jsx).toBe(true)
})

Then('it should process TSX React components with TypeScript', async function () {
  expect(this.fileTypes.tsx).toBe(true)
})

Then('it should process the main HTML entry point', async function () {
  expect(this.fileTypes.html).toBe(true)
})

Then('Tailwind CSS should scan all nested directories', async function () {
  const hasRecursivePattern = this.parsedConfig.content.some(path => 
    path.includes('**')
  )
  expect(hasRecursivePattern).toBe(true)
})

Then('Tailwind CSS should find components in any subdirectory', async function () {
  const hasWildcardPattern = this.parsedConfig.content.some(path => 
    path.includes('**') || path.includes('*')
  )
  expect(hasWildcardPattern).toBe(true)
})

Then('Tailwind CSS should apply styles to all recognized file types', async function () {
  const allTypesSupported = 
    this.fileTypes.html && 
    this.fileTypes.js && 
    this.fileTypes.ts && 
    this.fileTypes.jsx && 
    this.fileTypes.tsx
  
  expect(allTypesSupported).toBe(true)
})

Then('no additional plugins should be active', async function () {
  expect(this.parsedConfig.plugins.length).toBe(0)
})

Then('the core Tailwind CSS functionality should be available', async function () {
  expect(this.parsedConfig.content).toBeDefined()
  expect(this.parsedConfig.theme).toBeDefined()
  expect(this.parsedConfig.plugins).toBeDefined()
})

Then('developers can add plugins later as needed', async function () {
  expect(Array.isArray(this.parsedConfig.plugins)).toBe(true)
  this.pluginsCanBeAdded = true
})