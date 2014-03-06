/*jslint indent:2, node:true*/
/*jslint nomen:true*/ // __dirname
/*globals suite, test, setup, teardown, suiteSetup, suiteTeardown*/ // Mocha

// Node.JS built-ins

var fs, path;

fs = require('fs');
path = require('path');

// 3rd-party modules

var assert, chai;

chai = require('chai');
assert = chai.assert;

// custom modules

var jqlint;

jqlint = require(path.join(__dirname, '..', '..', 'jqlint'));

// this module

var fixturePath;

fixturePath = path.join(__dirname, 'fixture.js');

suite('deprecated', function () {
  'use strict';

  var report;

  suiteSetup(function (done) {
    fs.readFile(fixturePath, function (err, data) {
      if (err) { throw err; }
      report = jqlint(data);
      done();
    });
  });

  test('report', function () {
    assert.isObject(report);
    assert.isArray(report.errors);
    assert.lengthOf(report.errors, 1);
  });

  test('$.Deferred() without `new`', function () {
    var error, errors;

    errors = report.errors.filter(function (e) {
      return e.evidence === '$.Deferred()';
    });
    assert.lengthOf(errors, 1);
    error = errors[0];

    assert.isObject(error);
    assert.equal(error.line, 10);
    assert.equal(error.character, 11);
    assert.equal(error.reason, 'CONSTRUCTOR_MISSING_NEW');
    assert.equal(error.evidence, '$.Deferred()');
  });

});
