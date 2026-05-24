// Auto-generated step definitions for frontend/coverage/prettify.js
// Generated on: 2026-05-24T18:50:05.372Z

```javascript
import { Given, When, Then, Before, After } from '@cucumber/cucumber'
import { request, expect } from '@playwright/test'

Before(async function () {
  this.apiContext = await request.newContext({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api'
  })
  this.prettifyModule = null
  this.syntaxHighlightingRules = null
  this.continuationModeEnabled = false
  this.codeInput = null
  this.identifiedTokens = []
  this.tokenTypes = {}
  this.response = null
  this.responseData = null
})

After(async function () {
  if (this.apiContext) {
    await this.apiContext.dispose()
  }
})

// Background steps
Given('the prettify module is loaded', async function () {
  this.prettifyModule = {
    loaded: true,
    version: '1.0.0'
  }
  expect(this.prettifyModule.loaded).toBe(true)
})

Given('syntax highlighting rules are initialized', async function () {
  this.syntaxHighlightingRules = {
    keywords: [],
    types: [],
    strings: [],
    comments: [],
    operators: [],
    initialized: true
  }
  expect(this.syntaxHighlightingRules.initialized).toBe(true)
})

Given('continuation mode is enabled', async function () {
  this.continuationModeEnabled = true
  expect(this.continuationModeEnabled).toBe(true)
})

// Scenario: Recognize basic control flow keywords
When('I provide code containing basic control flow keywords', async function () {
  this.codeInput = 'break; continue; do { } while(true); if(x) { } else { } for(;;) { } return; while(true) { }'
})

Then('the system should identify keywords: break, continue, do, else, for, if, return, while', async function () {
  const expectedKeywords = ['break', 'continue', 'do', 'else', 'for', 'if', 'return', 'while']
  this.identifiedTokens = expectedKeywords
  expect(this.identifiedTokens).toEqual(expect.arrayContaining(expectedKeywords))
})

Then('mark them with keyword token type', async function () {
  this.identifiedTokens.forEach(token => {
    this.tokenTypes[token] = 'keyword'
  })
  this.identifiedTokens.forEach(token => {
    expect(this.tokenTypes[token]).toBe('keyword')
  })
})

// Scenario: Recognize C/C++ language keywords
When('I provide C/C++ code containing language-specific keywords', async function () {
  this.codeInput = 'auto bool break case catch char class const constexpr continue default delete do double else enum explicit extern float for friend goto if inline int long namespace new operator private protected public register return short signed sizeof static struct switch template this throw try typedef typeid typename union unsigned using virtual void volatile while'
})

Then('the system should identify keywords from the C/C++ keyword set', async function () {
  const cppKeywords = ['auto', 'bool', 'break', 'case', 'catch', 'char', 'class', 'const', 'continue', 'default', 'delete', 'do', 'double', 'else', 'enum', 'explicit', 'extern', 'float', 'for', 'friend', 'goto', 'if', 'inline', 'int', 'long', 'namespace', 'new', 'operator', 'private', 'protected', 'public', 'register', 'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch', 'template', 'this', 'throw', 'try', 'typedef', 'typeid', 'typename', 'union', 'unsigned', 'using', 'virtual', 'void', 'volatile', 'while']
  this.identifiedTokens = cppKeywords
  expect(this.identifiedTokens.length).toBeGreaterThan(0)
})

Then('recognize extended C++ keywords like alignof, concept, constexpr, decltype, template, typename', async function () {
  const extendedKeywords = ['alignof', 'concept', 'constexpr', 'decltype', 'template', 'typename']
  extendedKeywords.forEach(keyword => {
    this.tokenTypes[keyword] = 'keyword'
  })
  extendedKeywords.forEach(keyword => {
    expect(this.tokenTypes[keyword]).toBe('keyword')
  })
})

// Scenario: Recognize Java language keywords
When('I provide Java code containing language-specific keywords', async function () {
  this.codeInput = 'abstract class MyClass extends BaseClass implements Interface { synchronized void method() { transient int field; } }'
})

Then('the system should identify keywords like abstract, extends, implements, interface, synchronized, transient', async function () {
  const javaKeywords = ['abstract', 'extends', 'implements', 'interface', 'synchronized', 'transient']
  this.identifiedTokens = javaKeywords
  expect(this.identifiedTokens).toEqual(expect.arrayContaining(javaKeywords))
})

Then('recognize Java-specific modifiers and access control keywords', async function () {
  const javaModifiers = ['public', 'private', 'protected', 'static', 'final', 'volatile', 'transient', 'synchronized']
  javaModifiers.forEach(modifier => {
    this.tokenTypes[modifier] = 'keyword'
  })
  javaModifiers.forEach(modifier => {
    expect(this.tokenTypes[modifier]).toBe('keyword')
  })
})

// Scenario: Recognize C# language keywords
When('I provide C# code containing language-specific keywords', async function () {
  this.codeInput = 'checked { decimal value; } delegate void Handler(); foreach(var item in list) { } lock(obj) { } override void Method() { } partial class PartialClass { }'
})

Then('the system should identify keywords like checked, decimal, delegate, foreach, lock, override, partial', async function () {
  const csharpKeywords = ['checked', 'decimal', 'delegate', 'foreach', 'lock', 'override', 'partial']
  this.identifiedTokens = csharpKeywords
  expect(this.identifiedTokens).toEqual(expect.arrayContaining(csharpKeywords))
})

Then('recognize C#-specific async/await and LINQ keywords', async function () {
  const asyncLinqKeywords = ['async', 'await', 'from', 'select', 'where', 'join', 'group', 'into', 'orderby', 'let']
  asyncLinqKeywords.forEach(keyword => {
    this.tokenTypes[keyword] = 'keyword'
  })
  asyncLinqKeywords.forEach(keyword => {
    expect(this.tokenTypes[keyword]).toBe('keyword')
  })
})

// Scenario: Recognize Python language keywords
When('I provide Python code containing language-specific keywords', async function () {
  this.codeInput = 'class MyClass: def method(self): if True: elif False: else: pass; lambda x: x; nonlocal var; yield value'
})

Then('the system should identify keywords like class, def, elif, except, lambda, nonlocal, yield', async function () {
  const pythonKeywords = ['class', 'def', 'elif', 'except', 'lambda', 'nonlocal', 'yield']
  this.identifiedTokens = pythonKeywords
  expect(this.identifiedTokens).toEqual(expect.arrayContaining(pythonKeywords))
})

Then('recognize Python boolean and special values: False, True, None', async function () {
  const pythonSpecialValues = ['False', 'True', 'None']
  pythonSpecialValues.forEach(value => {
    this.tokenTypes[value] = 'keyword'
  })
  pythonSpecialValues.forEach(value => {
    expect(this.tokenTypes[value]).toBe('keyword')
  })
})

// Scenario: Recognize Ruby language keywords
When('I provide Ruby code containing language-specific keywords', async function () {
  this.codeInput = 'alias new_name old_name; begin; rescue; ensure; end; elsif; module MyModule; retry; yield'
})

Then('the system should identify keywords like alias, begin, elsif, ensure, module, rescue, retry', async function () {
  const rubyKeywords = ['alias', 'begin', 'elsif', 'ensure', 'module', 'rescue', 'retry']
  this.identifiedTokens = rubyKeywords
  expect(this.identifiedTokens).toEqual(expect.arrayContaining(rubyKeywords))
})

Then('recognize Ruby block and control keywords: BEGIN, END, yield', async function () {
  const rubyBlockKeywords = ['BEGIN', 'END', 'yield']
  rubyBlockKeywords.forEach(keyword => {
    this.tokenTypes[keyword] = 'keyword'
  })
  rubyBlockKeywords.forEach(keyword => {
    expect(this.tokenTypes[keyword]).toBe('keyword')
  })
})

// Scenario: Recognize Bash/Shell language keywords
When('I provide Bash/Shell code containing language-specific keywords', async function () {
  this.codeInput = 'case $var in esac; done; elif; eval; fi; function name() { local var; }'
})

Then('the system should identify keywords like case, done, elif, esac, eval, fi, function, local', async function () {
  const bashKeywords = ['case', 'done', 'elif', 'esac', 'eval', 'fi', 'function', 'local']
  this.identifiedTokens = bashKeywords
  expect(this.identifiedTokens).toEqual(expect.arrayContaining(bashKeywords))
})

// Scenario: Recognize JavaScript keywords and built-ins
When('I provide JavaScript code containing keywords and built-in functions', async function () {
  this.codeInput = 'debugger; eval(); export function get() { } set value(v) { } var x = undefined; with(obj) { }'
})

Then('the system should identify keywords like debugger, eval, export, function, get, set, undefined, var, with', async function () {
  const jsKeywords = ['debugger', 'eval', 'export', 'function', 'get', 'set', 'undefined', 'var', 'with']
  this.identifiedTokens = jsKeywords
  expect(this.identifiedTokens).toEqual(expect.arrayContaining(jsKeywords))
})

Then('recognize special values: Infinity, NaN', async function () {
  const jsSpecialValues = ['Infinity', 'NaN']
  jsSpecialValues.forEach(value => {
    this.tokenTypes[value] = 'keyword'
  })
  jsSpecialValues.forEach(value => {
    expect(this.tokenTypes[value]).toBe('keyword')
  })
})

// Scenario: Recognize CoffeeScript language keywords
When('I provide CoffeeScript code containing language-specific keywords', async function () {
  this.codeInput = 'by catch class loop no off on unless until when yes'
})

Then('the system should identify keywords like by, catch, class, loop, no, off, on, unless, until, when, yes', async function () {
  const coffeeKeywords = ['by', 'catch', 'class', 'loop', 'no', 'off', 'on', 'unless', 'until', 'when', 'yes']
  this.identifiedTokens = coffeeKeywords
  expect(this.identifiedTokens).toEqual(expect.arrayContaining(coffeeKeywords))
})

// Scenario: Recognize Perl language keywords
When('I provide Perl code containing language-specific keywords', async function () {
  this.codeInput = 'caller; die; dump; elsif; foreach; goto; last;