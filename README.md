# jqlint

JSLint but for jQuery! This is primarily to support my strict jQuery ideals, and
is likely to upset everyone. :P

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
