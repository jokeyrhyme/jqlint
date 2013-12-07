/*jslint indent:2, node:true*/
/*jslint nomen:true*/ // __dirname
/*globals suite, test, setup, teardown, suiteSetup, suiteTeardown*/ // Mocha
/*globals chai*/ // Chai

/*globals $, constants*/ // subject of test

var assert = chai.assert;

suite('METHODS and chaining', function () {
  'use strict';

  var fixture$;

  setup(function () {
    fixture$ = $('<div></div>');
  });

  constants.METHODS.CHAIN_WITH_ARG1.forEach(function (name) {
    test('method with 2 arguments: ' + name, function () {
      var result;
      result = fixture$[name]('a', 'b');
      assert.instanceOf(result, $);
    });
  });

  constants.METHODS.CHAIN_WITH_ARG0.forEach(function (name) {
    test('method with 1 argument: ' + name, function () {
      var result;
      result = fixture$[name]('a');
      assert.instanceOf(result, $);
    });
  });

  constants.METHODS.CHAIN_WITH_CALLBACK.forEach(function (name) {
    test('method with callback: ' + name, function () {
      var result;
      result = fixture$[name](function () { return true; });
      assert.instanceOf(result, $);
    });
  });

  constants.METHODS.CHAIN.forEach(function (name) {
    test('method: ' + name, function () {
      var result;
      result = fixture$[name]();
      assert.instanceOf(result, $);
    });
  });

});
