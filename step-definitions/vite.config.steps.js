// Auto-generated step definitions for frontend/vite.config.js
// Generated on: 2026-05-24T18:52:48.191Z

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
  this.configPath = path.join(__dirname, '../../frontend/vite.config.js')
  this.configContent = null
  this.parsedConfig = null
  this.buildOutput = null
  this.serverStarted = false
  this.errors = []
})

After(async function () {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
  this.configContent = null
  this.parsedConfig = null
  this.buildOutput = null
  this.errors = []
})

Given('the Vite configuration file exists', async function () {
  const fileExists = fs.existsSync(this.configPath)
  expect(fileExists).toBe(true)
  this.configContent = fs.readFileSync(this.configPath, 'utf-8')
  expect(this.configContent).toBeTruthy()
})

Given('the React plugin is available', async function () {
  expect(this.configContent).toContain('react')
  expect(this.configContent).toContain('plugin')
})

When('the Vite configuration is loaded', async function () {
  try {
    const module = await import(this.configPath)
    this.parsedConfig = module.default
    expect(this.parsedConfig).toBeDefined()
  } catch (error) {
    this.errors.push(error.message)
    throw error
  }
})

Then('the React plugin should be registered', async function () {
  expect(this.parsedConfig).toBeDefined()
  expect(this.parsedConfig.plugins).toBeDefined()
  expect(Array.isArray(this.parsedConfig.plugins)).toBe(true)
  const hasReactPlugin = this.parsedConfig.plugins.some(
    plugin => plugin && (plugin.name === 'vite:react' || plugin.name?.includes('react'))
  )
  expect(hasReactPlugin).toBe(true)
})

Then('the application should support JSX syntax', async function () {
  expect(this.configContent).toContain('jsx')
  expect(this.configContent).toContain('react')
})

Then('React components should be properly transformed', async function () {
  expect(this.parsedConfig.plugins).toBeDefined()
  expect(this.parsedConfig.plugins.length).toBeGreaterThan(0)
})

Given('the Vite configuration includes React plugin', async function () {
  const module = await import(this.configPath)
  this.parsedConfig = module.default
  expect(this.parsedConfig.plugins).toBeDefined()
  const hasReactPlugin = this.parsedConfig.plugins.some(
    plugin => plugin && (plugin.name === 'vite:react' || plugin.name?.includes('react'))
  )
  expect(hasReactPlugin).toBe(true)
})

When('the build process is executed', async function () {
  try {
    this.response = await this.apiContext.post('/build', {
      data: { config: this.parsedConfig }
    })
    this.responseData = await this.response.json()
    this.buildOutput = this.responseData
  } catch (error) {
    this.errors.push(error.message)
    this.buildOutput = { success: false, error: error.message }
  }
})

Then('the build should complete without errors', async function () {
  expect(this.buildOutput).toBeDefined()
  expect(this.buildOutput.success || this.buildOutput.status === 'success').toBe(true)
  expect(this.errors.length).toBe(0)
})

Then('React components should be bundled correctly', async function () {
  expect(this.buildOutput).toBeDefined()
  expect(this.buildOutput.bundled).toBe(true)
})

Then('the output should be optimized for production', async function () {
  expect(this.buildOutput).toBeDefined()
  expect(this.buildOutput.optimized).toBe(true)
})

Given('the Vite configuration is properly set up', async function () {
  const module = await import(this.configPath)
  this.parsedConfig = module.default
  expect(this.parsedConfig).toBeDefined()
  expect(this.parsedConfig.plugins).toBeDefined()
})

When('the development server is started', async function () {
  try {
    this.response = await this.apiContext.post('/dev-server/start', {
      data: { config: this.parsedConfig }
    })
    this.responseData = await this.response.json()
    this.serverStarted = this.responseData.started === true
  } catch (error) {
    this.errors.push(error.message)
    this.serverStarted = false
  }
})

Then('the server should initialize successfully', async function () {
  expect(this.serverStarted).toBe(true)
  expect(this.responseData.started).toBe(true)
})

Then('React hot module replacement should be enabled', async function () {
  expect(this.responseData).toBeDefined()
  expect(this.responseData.hmr).toBe(true)
})

Then('changes to React components should reflect immediately', async function () {
  expect(this.responseData.hmr).toBe(true)
  expect(this.responseData.fastRefresh).toBe(true)
})

When('the Vite configuration file is parsed', async function () {
  try {
    const module = await import(this.configPath)
    this.parsedConfig = module.default
    expect(this.parsedConfig).toBeDefined()
  } catch (error) {
    this.errors.push(error.message)
    throw error
  }
})

Then('it should export a valid configuration object', async function () {
  expect(this.parsedConfig).toBeDefined()
  expect(typeof this.parsedConfig).toBe('object')
})

Then('the configuration should contain a plugins array', async function () {
  expect(this.parsedConfig.plugins).toBeDefined()
  expect(Array.isArray(this.parsedConfig.plugins)).toBe(true)
})

Then('the plugins array should include the React plugin', async function () {
  expect(this.parsedConfig.plugins.length).toBeGreaterThan(0)
  const hasReactPlugin = this.parsedConfig.plugins.some(
    plugin => plugin && (plugin.name === 'vite:react' || plugin.name?.includes('react'))
  )
  expect(hasReactPlugin).toBe(true)
})

Given('the React plugin is configured', async function () {
  const module = await import(this.configPath)
  this.parsedConfig = module.default
  expect(this.parsedConfig.plugins).toBeDefined()
  const reactPlugin = this.parsedConfig.plugins.find(
    plugin => plugin && (plugin.name === 'vite:react' || plugin.name?.includes('react'))
  )
  expect(reactPlugin).toBeDefined()
})

When('a developer modifies a React component file', async function () {
  try {
    this.response = await this.apiContext.post('/component/modify', {
      data: { 
        config: this.parsedConfig,
        componentPath: 'src/App.jsx'
      }
    })
    this.responseData = await this.response.json()
  } catch (error) {
    this.errors.push(error.message)
  }
})

Then('the component should update without losing component state', async function () {
  expect(this.responseData).toBeDefined()
  expect(this.responseData.statePreserved).toBe(true)
})

Then('the browser should not perform a full page reload', async function () {
  expect(this.responseData.fullReload).toBe(false)
})

Then('the development experience should be seamless', async function () {
  expect(this.responseData.statePreserved).toBe(true)
  expect(this.responseData.fullReload).toBe(false)
  expect(this.responseData.updateTime).toBeLessThan(1000)
})

Given('a project with multiple React component files', async function () {
  try {
    this.response = await this.apiContext.post('/project/components', {
      data: { 
        projectPath: path.join(__dirname, '../../frontend')
      }
    })
    this.responseData = await this.response.json()
    this.componentFiles = this.responseData.components || []
  } catch (error) {
    this.errors.push(error.message)
    this.componentFiles = []
  }
})

When('the application is built', async function () {
  try {
    this.response = await this.apiContext.post('/build', {
      data: { 
        config: this.parsedConfig,
        components: this.componentFiles
      }
    })
    this.responseData = await this.response.json()
    this.buildOutput = this.responseData
  } catch (error) {
    this.errors.push(error.message)
    this.buildOutput = { success: false }
  }
})

Then('all React components should be processed', async function () {
  expect(this.buildOutput).toBeDefined()
  expect(this.buildOutput.processedComponents).toBeGreaterThan(0)
})

Then('component dependencies should be resolved', async function () {
  expect(this.buildOutput.dependenciesResolved).toBe(true)
})

Then('the final bundle should include all components', async function () {
  expect(this.buildOutput.bundleComplete).toBe(true)
  expect(this.buildOutput.processedComponents).toEqual(this.componentFiles.length)
})

When('the Vite configuration is loaded with various project structures', async function () {
  try {
    const projectStructures = [
      { structure: 'monorepo' },
      { structure: 'single-spa' },
      { structure: 'standard' }
    ]
    
    this.response = await this.apiContext.post('/config/test-structures', {
      data: { 
        config: this.parsedConfig,
        structures: projectStructures
      }
    })
    this.responseData = await this.response.json()
    this.structureTests = this.responseData
  } catch (error) {
    this.errors.push(error.message)
    this.structureTests = { success: false }
  }
})

Then('the React plugin should adapt to different file organizations', async function () {
  expect(this.structureTests).toBeDefined()
  expect(this.structureTests.adaptable).toBe(true)
})

Then('the configuration should remain stable', async function () {
  expect(this.structureTests.stable).toBe(true)
})

Then('no warnings should be generated for standard React projects', async function () {
  expect(this.structureTests.warnings).toBeDefined()
  expect(this.structureTests.warnings.length).toBe(0)
})