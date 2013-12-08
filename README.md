# jqlint

JSLint but for jQuery! This is primarily to support my strict jQuery ideals, and
may hurt your feelings. :P

This is a static analysis tool, just like JSLint. It is not yet intended to be
used as a runtime analysis tool in the browser, but I wouldn't say no to such a
Pull Request.

## Usage

```
var jqlint;
jqlint = require('jqlint');

// example code to lint
var code;
code = '$("#id").find(".class").attr("attr", "value");'

var report;
report = jqlint(code);
// report.errors will be an Array of errors found, just like the JSLint report
```

## Assumptions

These will hopefully be reduced over time as jqlint gains sophistication.

- jQuery is available in any scope as `jQuery` or `$`

- any identifier (e.g. variable or property name) that begins or ends with `$`
    is a cached jQuery selector e.g. `$button`, `input$`, etc

## Options

The only way to set options currently is to use block comments in your code,
like JSLint. For example: `/*jslint angular:true*/`

### angular (default: false)

- if true: identifiers beginning with `$` will not be treated like cached jQuery
    selectors (e.g. `$scope`)

## Detected Errors

This list will continue to grow.

jqlint currently detects:

- use of features deprecated in jQuery 1.3: `jQuery.browser`, `jQuery.boxModel`

- use of features deprecated in jQuery 1.7: `.die()`, `.live()`, `.selector`,
    `jQuery.sub()`

- use of features superseded in jQuery 1.7: `.bind()`, `.unbind()`,
    `.delegate()`, `.undelegate()`

- use of features deprecated in jQuery 1.8: `.andSelf()`, `.error()`, `.load()`,
    `.unload()`, `.size()`, `.toggle()`

- use of features deprecated in jQuery 1.8: `.context`

- use of features designed only for jQuery-internal use: `jQuery.support`
