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
    assert.lengthOf(report.errors, 3);
  });

  test('angular:true -> button$.bind()', function () {
    var errors;

    errors = report.errors.filter(function (e) {
      return e.evidence === '.bind()';
    });
    assert.lengthOf(errors, 0);
  });

  test('angular:true -> input$.unbind()', function () {
    var error, errors;

    errors = report.errors.filter(function (e) {
      return e.evidence === '.unbind()';
    });
    assert.lengthOf(errors, 1);
    error = errors[0];

    assert.isObject(error);
    assert.equal(error.line, 14);
    assert.equal(error.character, 10);
    assert.equal(error.reason, 'SUPERSEDED');
    assert.equal(error.evidence, '.unbind()');
  });

  test('angular:false -> $button.delegate()', function () {
    var error, errors;

    errors = report.errors.filter(function (e) {
      return e.evidence === '.delegate()';
    });
    assert.lengthOf(errors, 1);
    error = errors[0];

    assert.isObject(error);
    assert.equal(error.line, 17);
    assert.equal(error.character, 11);
    assert.equal(error.reason, 'SUPERSEDED');
    assert.equal(error.evidence, '.delegate()');
  });

  test('angular:false -> input$.undelegate()', function () {
    var error, errors;

    errors = report.errors.filter(function (e) {
      return e.evidence === '.undelegate()';
    });
    assert.lengthOf(errors, 1);
    error = errors[0];

    assert.isObject(error);
    assert.equal(error.line, 18);
    assert.equal(error.character, 10);
    assert.equal(error.reason, 'SUPERSEDED');
    assert.equal(error.evidence, '.undelegate()');
  });

});
