/*jslint indent:2, node:true*/

'use strict';

// 3rd-party modules

var esprima;

esprima = require('esprima');

// this module

var options, report;

options = {
  constructor: ['jQuery', '$']
};

// https://github.com/ariya/esprima/blob/master/examples/detectnestedternary.js
// Executes visitor on the object and its children (recursively).
function traverse(object, visitor) {
  var key, child;

  visitor.call(null, object);
  for (key in object) {
    if (object.hasOwnProperty(key)) {
      child = object[key];
      if (typeof child === 'object' && child !== null) {
        traverse(child, visitor);
      }
    }
  }
}

function isConstructor(node) {
  if (node.type === 'Identifier' &&
      options.constructor.indexOf(node.name) !== -1) {
    return true;
  }
  return false;
}

function checkDeprecated13(node) {
  if (node.type === 'MemberExpression') {
    if (isConstructor(node.object)) {
      if (node.property.type === 'Identifier') {
        if (node.property.name === 'browser' ||
            node.property.name === 'boxModel') {
          report.errors = report.errors || [];
          report.errors.push({
            line: node.object.loc.start.line,
            character: node.object.loc.start.column + 1,
            reason: 'DEPRECATED',
            evidence: node.object.name + '.' + node.property.name
          });
        }
      }
    }
  }
}

function validate(node) {
  checkDeprecated13(node);
}

// exports

module.exports = function (code) {

  var syntax;

  syntax = esprima.parse(code, {
    comment: true,
    loc: true,
    tolerant: true,
    range: true
  });

  report = {};

  traverse(syntax, validate);

  //console.log(report);

  return report;
};
