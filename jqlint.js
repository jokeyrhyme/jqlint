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

  if (object.type) {
    visitor.call(null, object);
  }
  for (key in object) {
    if (object.hasOwnProperty(key)) {
      child = object[key];
      if (typeof child === 'object' && child !== null) {
        traverse(child, visitor);
      }
    }
  }
}

/**
 * determine if a syntax node is for the jQuery constructor
 * @param node
 * @returns {boolean}
 */
function isConstructor(node) {
  if (node.type === 'Identifier' &&
      options.constructor.indexOf(node.name) !== -1) {
    return true;
  }
  return false;
}

/**
 * determine if a syntax node is for a call to the jQuery constructor
 * @param node
 * @returns {boolean}
 */
function isConstructed(node) {
  if (node.type === 'CallExpression' &&
      isConstructor(node.callee)) {
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

function checkDeprecated17(node) {
  if (node.type === 'MemberExpression') {
    if (isConstructed(node.object) && node.property.type === 'Identifier' &&
        node.property.name === 'selector') {
      report.errors = report.errors || [];
      report.errors.push({
        line: node.property.loc.start.line,
        character: node.property.loc.start.column + 1,
        reason: 'DEPRECATED',
        evidence: '.' + node.property.name
      });
    }
  }
  if (node.type === 'CallExpression') {
    if (node.callee.type === 'MemberExpression' &&
        isConstructor(node.callee.object) &&
        node.callee.property.type === 'Identifier' &&
        node.callee.property.name === 'sub') {
      report.errors = report.errors || [];
      report.errors.push({
        line: node.callee.loc.start.line,
        character: node.callee.loc.start.column + 1,
        reason: 'DEPRECATED',
        evidence: node.callee.object.name + '.' + node.callee.property.name
      });
    }
  }
}

function validate(node) {
  checkDeprecated13(node);
  checkDeprecated17(node);
}

// exports

module.exports = function (code) {

  var syntax;

//  console.log(JSON.stringify(esprima.parse(code, {
//    comment: true,
//    tolerant: true
//  }), null, 2));

  syntax = esprima.parse(code, {
    comment: true,
    loc: true,
    tolerant: true,
    range: true
  });

  report = {};

  traverse(syntax, validate);

//  console.log(JSON.stringify(report, null, 2));

  return report;
};
