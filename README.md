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

## Options

None yet, but they are on the way.

## Errors

This list will continue to grow.

jqlint currently detects:

- use of features deprecated in jQuery 1.3: `jQuery.browser`, `jQuery.boxModel`

- use of features deprecated in jQuery 1.7: `.selector`
