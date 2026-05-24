# Auto-generated feature file for frontend/coverage/prettify.js
# Generated on: 2026-05-24T18:45:12.617Z

# Auto-generated feature file for frontend/coverage/prettify.js
# Generated on: 2026-05-24T18:43:27.053Z

Feature: Code Syntax Highlighting and Prettification
  As a developer
  I want to have my code properly syntax highlighted and prettified
  So that I can read and understand code more easily in reports

  Background:
    Given the prettify module is loaded
    And syntax highlighting rules are initialized
    And continuation mode is enabled

  Scenario: Recognize basic control flow keywords
    When I provide code containing basic control flow keywords
    Then the system should identify keywords: break, continue, do, else, for, if, return, while
    And mark them with keyword token type

  Scenario: Recognize C/C++ language keywords
    When I provide C/C++ code containing language-specific keywords
    Then the system should identify keywords from the C/C++ keyword set
    And mark them with keyword token type
    And recognize extended C++ keywords like alignof, concept, constexpr, decltype, template, typename

  Scenario: Recognize Java language keywords
    When I provide Java code containing language-specific keywords
    Then the system should identify keywords like abstract, extends, implements, interface, synchronized, transient
    And mark them with keyword token type
    And recognize Java-specific modifiers and access control keywords

  Scenario: Recognize C# language keywords
    When I provide C# code containing language-specific keywords
    Then the system should identify keywords like checked, decimal, delegate, foreach, lock, override, partial
    And mark them with keyword token type
    And recognize C#-specific async/await and LINQ keywords

  Scenario: Recognize Python language keywords
    When I provide Python code containing language-specific keywords
    Then the system should identify keywords like class, def, elif, except, lambda, nonlocal, yield
    And mark them with keyword token type
    And recognize Python boolean and special values: False, True, None

  Scenario: Recognize Ruby language keywords
    When I provide Ruby code containing language-specific keywords
    Then the system should identify keywords like alias, begin, elsif, ensure, module, rescue, retry
    And mark them with keyword token type
    And recognize Ruby block and control keywords: BEGIN, END, yield

  Scenario: Recognize Bash/Shell language keywords
    When I provide Bash/Shell code containing language-specific keywords
    Then the system should identify keywords like case, done, elif, esac, eval, fi, function, local
    And mark them with keyword token type

  Scenario: Recognize JavaScript keywords and built-ins
    When I provide JavaScript code containing keywords and built-in functions
    Then the system should identify keywords like debugger, eval, export, function, get, set, undefined, var, with
    And recognize special values: Infinity, NaN
    And mark them with keyword token type

  Scenario: Recognize CoffeeScript language keywords
    When I provide CoffeeScript code containing language-specific keywords
    Then the system should identify keywords like by, catch, class, loop, no, off, on, unless, until, when, yes
    And mark them with keyword token type

  Scenario: Recognize Perl language keywords
    When I provide Perl code containing language-specific keywords
    Then the system should identify keywords like caller, die, dump, elsif, foreach, goto, last, local, my, next, our, redo, require, sub, undef, unless, until, wantarray
    And mark them with keyword token type
    And recognize Perl special blocks: BEGIN, END

  Scenario: Recognize standard library types in C++
    When I provide C++ code with standard library containers
    Then the system should recognize type patterns like DIR, FILE, vector, queue, list, stack, iterator, set, map, bitset
    And mark them with type token type

  Scenario: Handle case-insensitive keyword matching
    When I provide code with keywords in mixed case
    Then the system should match keywords regardless of case sensitivity
    And apply appropriate highlighting based on language rules

  Scenario: Tokenize code with multiple token types
    When I provide code containing mixed token types
    Then the system should correctly identify and mark:
      | Token Type | Examples |
      | keyword    | break, class, def, if |
      | string     | "text", 'text' |
      | comment    | //, /*, # |
      | literal    | 123, true, false |
      | punctuation | {, }, (, ), ; |
      | plain text | variable names, identifiers |

  Scenario: Handle escape sequences in token recognition
    When I provide code with Unicode and hex escape sequences
    Then the system should correctly parse escape sequences
    And not misidentify escaped characters as keywords

  Scenario: Apply continuation mode for multi-line constructs
    When I provide code with multi-line statements or expressions
    Then the system should maintain highlighting context across line breaks
    And correctly highlight continuation lines

  Scenario: Recognize operators and punctuation
    When I provide code containing operators and punctuation
    Then the system should identify operators: ++, --, +=, -=, ==, ===, !=, !==, &&, ||, etc.
    And mark them with punctuation token type

  Scenario: Handle language-specific operator precedence
    When I provide code with complex operator expressions
    Then the system should recognize language-specific operator patterns
    And apply correct highlighting based on operator context