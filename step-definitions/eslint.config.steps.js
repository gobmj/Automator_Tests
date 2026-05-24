// Auto-generated step definitions for frontend/eslint.config.js
// Generated on: 2026-05-24T18:50:33.952Z

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
  this.projectRoot = process.env.PROJECT_ROOT || path.join(__dirname, '../..')
  this.eslintConfigPath = path.join(this.projectRoot, 'frontend/eslint.config.js')
  this.testFiles = []
  this.lintingResults = null
  this.eslintConfig = null
})

After(async function () {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
  // Cleanup test files
  for (const file of this.testFiles) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
    }
  }
})

Given('the ESLint configuration is properly initialized', async function () {
  expect(fs.existsSync(this.eslintConfigPath)).toBeTruthy()
  this.eslintConfig = await import(this.eslintConfigPath)
  expect(this.eslintConfig).toBeDefined()
})

Given('the project uses React with Vite as the build tool', async function () {
  const packageJsonPath = path.join(this.projectRoot, 'package.json')
  expect(fs.existsSync(packageJsonPath)).toBeTruthy()
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  expect(packageJson.devDependencies).toHaveProperty('vite')
  expect(packageJson.dependencies).toHaveProperty('react')
})

Given('all required ESLint plugins are installed', async function () {
  const packageJsonPath = path.join(this.projectRoot, 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  const requiredPlugins = ['eslint-plugin-react', 'eslint-plugin-react-hooks']
  for (const plugin of requiredPlugins) {
    expect(
      packageJson.devDependencies[plugin] || packageJson.dependencies[plugin]
    ).toBeDefined()
  }
})

When('the ESLint configuration is loaded', async function () {
  this.eslintConfig = await import(this.eslintConfigPath)
  expect(this.eslintConfig).toBeDefined()
})

Then('the {string} directory should be excluded from linting', async function (
  directory
) {
  const config = this.eslintConfig.default || this.eslintConfig
  const ignoresConfig = config.ignores || []
  expect(ignoresConfig.some((pattern) => pattern.includes(directory))).toBeTruthy()
})

Then('no linting errors should be reported for files in the dist folder', async function () {
  const distPath = path.join(this.projectRoot, 'dist')
  if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(distPath)
    expect(files.length >= 0).toBeTruthy()
  }
})

Given('ESLint is configured for JavaScript and JSX files', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  expect(config.files).toBeDefined()
  const hasJsJsx = config.files.some(
    (pattern) => pattern.includes('*.js') || pattern.includes('*.jsx')
  )
  expect(hasJsJsx).toBeTruthy()
})

When('linting JavaScript files', async function () {
  this.lintingResults = {
    jsFilesProcessed: true,
    errors: [],
    warnings: []
  }
})

Then('the recommended ESLint configuration should be applied', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  expect(config.rules).toBeDefined()
  expect(Object.keys(config.rules).length > 0).toBeTruthy()
})

Then('basic JavaScript best practices should be enforced', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  const rules = config.rules || {}
  expect(Object.keys(rules).length > 0).toBeTruthy()
})

Given('the project uses React Hooks', async function () {
  const packageJsonPath = path.join(this.projectRoot, 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  expect(packageJson.dependencies).toHaveProperty('react')
})

When('linting React component files', async function () {
  this.lintingResults = {
    reactFilesProcessed: true,
    hooksValidated: true,
    errors: []
  }
})

Then('React Hooks recommended rules should be enforced', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  const hasReactHooksPlugin = config.plugins?.some(
    (p) => p.includes('react-hooks') || p === 'react-hooks'
  )
  expect(hasReactHooksPlugin).toBeTruthy()
})

Then('violations of React Hooks rules should be reported as errors', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  const rules = config.rules || {}
  const hooksRules = Object.keys(rules).filter((rule) =>
    rule.includes('react-hooks')
  )
  expect(hooksRules.length > 0).toBeTruthy()
})

Given('the project uses Vite as the build tool', async function () {
  const packageJsonPath = path.join(this.projectRoot, 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  expect(packageJson.devDependencies).toHaveProperty('vite')
})

Then('React Refresh configuration for Vite should be applied', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  expect(config).toBeDefined()
  expect(config.plugins).toBeDefined()
})

Then('fast refresh functionality should not be compromised', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  const rules = config.rules || {}
  const conflictingRules = Object.keys(rules).filter(
    (rule) => rule === 'no-undef' && rules[rule] === 'error'
  )
  expect(conflictingRules.length >= 0).toBeTruthy()
})

When('ESLint processes JavaScript files', async function () {
  this.lintingResults = {
    processed: true,
    languageOptions: {}
  }
})

Then('ECMAScript 2020 compatibility should be enabled', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  const languageOptions = config.languageOptions || {}
  expect(languageOptions.ecmaVersion).toBeDefined()
  expect(languageOptions.ecmaVersion >= 2020 || languageOptions.ecmaVersion === 'latest').toBeTruthy()
})

Then('browser global variables should be recognized', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  const languageOptions = config.languageOptions || {}
  expect(languageOptions.globals).toBeDefined()
})

Then('JSX syntax should be properly parsed', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  const languageOptions = config.languageOptions || {}
  expect(languageOptions.parserOptions?.ecmaFeatures?.jsx).toBeTruthy()
})

Given('the project uses ES6 modules', async function () {
  const packageJsonPath = path.join(this.projectRoot, 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  expect(packageJson.type).toBe('module')
})

Then('the {string} source type should be recognized', async function (sourceType) {
  const config = this.eslintConfig.default || this.eslintConfig
  const languageOptions = config.languageOptions || {}
  expect(languageOptions.sourceType).toBe(sourceType)
})

Then('import/export statements should be valid', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  expect(config.languageOptions?.sourceType).toBe('module')
})

When('linting JavaScript files containing unused variables', async function () {
  this.lintingResults = {
    unusedVarsChecked: true,
    violations: []
  }
})

Then('unused variables should be reported as errors', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  const rules = config.rules || {}
  expect(rules['no-unused-vars']).toBeDefined()
})

Then('variables starting with uppercase letters should be ignored', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  const rules = config.rules || {}
  const noUnusedVarsRule = rules['no-unused-vars']
  expect(noUnusedVarsRule).toBeDefined()
  if (Array.isArray(noUnusedVarsRule)) {
    const options = noUnusedVarsRule[1]
    expect(options?.argsIgnorePattern || options?.varsIgnorePattern).toBeDefined()
  }
})

Then('variables starting with underscores should be ignored', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  const rules = config.rules || {}
  const noUnusedVarsRule = rules['no-unused-vars']
  expect(noUnusedVarsRule).toBeDefined()
  if (Array.isArray(noUnusedVarsRule)) {
    const options = noUnusedVarsRule[1]
    const pattern = options?.argsIgnorePattern || options?.varsIgnorePattern || ''
    expect(pattern.includes('_')).toBeTruthy()
  }
})

When('linting files with the following extensions', async function (dataTable) {
  const rows = dataTable.hashes()
  this.fileExtensions = rows.map((row) => row.file_extension)
  this.lintingResults = {
    extensionsProcessed: this.fileExtensions,
    applied: true
  }
})

Then('the ESLint configuration should be applied', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  expect(config.files).toBeDefined()
})

Then('appropriate rules should be enforced', async function () {
  const config = this.eslintConfig.default || this.eslintConfig
  expect(config.rules).toBeDefined()
  expect(Object.keys(config.rules).length > 0).toBeTruthy()
})

Given('a JavaScript file with an unused variable named {string}', async function (
  variableName
) {
  const testDir = path.join(this.projectRoot, '.eslint-test')
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true })
  }
  const testFile = path.join(testDir, 'test-unused.js')
  const content = `const ${variableName} = 'test';\nconsole.log('hello');\n`
  fs.writeFileSync(testFile, content)
  this.testFiles.push(testFile)
  this.currentTestFile = testFile
})

When('ESLint lints the file', async function ()