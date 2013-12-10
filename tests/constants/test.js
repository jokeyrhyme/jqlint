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

var constants;

constants = require(path.join(__dirname, '..', '..', 'lib', 'constants'));

// this module

suite('SELECTORS.EXT_FN', function () {
  'use strict';

  var regexp;

  suiteSetup(function () {
    regexp = constants.SELECTORS.EXT_FN;
  });

  test('is a RegExp', function () {
    assert.instanceOf(regexp, RegExp);
  });

  test('doesn\'t match :not()', function () {
    assert.notMatch('p:not(.class)', regexp);
  });

  test('matches :eq()', function () {
    assert.match('p:eq(1)', regexp);
  });

  test('matches :gt()', function () {
    assert.match('p:gt(1)', regexp);
  });

  test('matches :has()', function () {
    assert.match('p:has(text)', regexp);
  });

  test('matches :lt()', function () {
    assert.match('p:lt(1)', regexp);
  });

});

suite('SELECTORS.EXT_ATTR_NOT_EQUAL', function () {
  'use strict';

  var regexp;

  suiteSetup(function () {
    regexp = constants.SELECTORS.EXT_ATTR_NOT_EQUAL;
  });

  test('is a RegExp', function () {
    assert.instanceOf(regexp, RegExp);
  });

  test('doesn\'t match [attr]', function () {
    assert.notMatch('p[attr]', regexp);
  });

  test('doesn\'t match [attr=value]', function () {
    assert.notMatch('p[attr=value]', regexp);
  });

  test('doesn\'t match [attr="value"]', function () {
    assert.notMatch('p[attr="value"]', regexp);
  });

  test('doesn\'t match [attr=\'value\']', function () {
    assert.notMatch('p[attr=\'value\']', regexp);
  });

  test('matches [attr!=value]', function () {
    assert.match('p[attr!=value]', regexp);
  });

  test('matches [attr!="value"]', function () {
    assert.match('p[attr!="value"]', regexp);
  });

  test('matches [attr!="value\'s"]', function () {
    assert.match('p[attr!="value\'s"]', regexp);
  });

  test('matches [attr!=\'value\']', function () {
    assert.match('p[attr!=\'value\']', regexp);
  });

  test('matches [attr!=\'value "blah"\']', function () {
    assert.match('p[attr!=\'value "blah"\']', regexp);
  });

});
