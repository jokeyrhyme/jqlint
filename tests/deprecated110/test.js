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

  test('.context', function () {
    var error;

    assert.isObject(report);
    assert.isArray(report.errors);
    assert(report.errors.length >= 1);

    error = report.errors[0];
    assert.isObject(error);
    assert.equal(error.line, 7);
    assert.equal(error.character, 34);
    assert.equal(error.reason, 'DEPRECATED');
    assert.equal(error.evidence, '.context');

    report.errors.splice(0, 1);
  });


});
