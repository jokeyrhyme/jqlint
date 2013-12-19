/*jslint indent:2, node:true*/

'use strict';

// 3rd-party modules

var esprima, estraverse;

esprima = require('esprima');
estraverse = require('estraverse');

// custom modules

var constants;

constants = require('./lib/constants');

// this module

var options, defaults, currentOptions, report, instanceVarsRegExp;

defaults = {
  angular: false
};

instanceVarsRegExp = {
  angular: /^\w*\$$/,
  noangular: /^\$\w*|\w*\$$/
};

/**
 * determine if a syntax node is for the jQuery constructor
 * @param node
 * @returns {boolean}
 */
function isConstructor(node) {
  if (node.type === 'Identifier' && ['jQuery', '$'].indexOf(node.name) !== -1) {
    return true;
  }
  return false;
}

/**
 * determine if a syntax node a jQuery-wrapped element list
 * @param node
 * @returns {boolean}
 */
function isInstance(node) {
  if (node.type === 'Identifier') {
    if (currentOptions.angular) {
      if (instanceVarsRegExp.angular.test(node.name)) {
        return true;
      }
    } else {
      if (instanceVarsRegExp.noangular.test(node.name)) {
        return true;
      }
    }
  }
  if (node.type === 'CallExpression') {
    if (isConstructor(node.callee)) {
      return true;
    }
    if (node.callee.type === 'MemberExpression') {
      if (isInstance(node.callee.object)) {
        if (node.callee.property.type === 'Identifier' &&
            constants.METHODS.CHAIN.indexOf(node.callee.property.name) !== -1) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkDeprecatedInstanceProperty(node) {
  var deprecated;
  deprecated = [
    // deprecated by jQuery 1.7
    'selector',
    // deprecated by jQuery 1.10
    'context'
  ];
  if (node.type === 'MemberExpression') {
    if (isInstance(node.object) && node.property.type === 'Identifier' &&
        deprecated.indexOf(node.property.name) !== -1) {
      report.errors.push({
        line: node.property.loc.start.line,
        character: node.property.loc.start.column + 1,
        reason: 'DEPRECATED',
        evidence: '.' + node.property.name
      });
    }
  }
}

function checkInstanceMethod(node) {
  var deprecated, superseded;
  deprecated = [
    // deprecated by jQuery 1.7
    'die', 'live',
    // deprecated by jQuery 1.8
    'andSelf', 'error', 'load', 'unload', 'size', 'toggle'
  ];
  superseded = [
    // superseded in jQuery 1.7
    'bind', 'unbind', 'delegate', 'undelegate'
  ];
  if (node.type === 'CallExpression') {
    if (node.callee.type === 'MemberExpression') {
      if (isInstance(node.callee.object)) {
        if (node.callee.property.type === 'Identifier') {
          if (deprecated.indexOf(node.callee.property.name) !== -1) {
            report.errors.push(
              {
                line: node.callee.property.loc.start.line,
                character: node.callee.property.loc.start.column + 1,
                reason: 'DEPRECATED',
                evidence: '.' + node.callee.property.name + '()'
              }
            );
          }
          if (superseded.indexOf(node.callee.property.name) !== -1) {
            report.errors.push(
              {
                line: node.callee.property.loc.start.line,
                character: node.callee.property.loc.start.column + 1,
                reason: 'SUPERSEDED',
                evidence: '.' + node.callee.property.name + '()'
              }
            );
          }
        }
      }
    }
  }
}

function checkConstructorProperty(node) {
  var deprecated, internalOnly;
  deprecated = [
    // deprecated by jQuery 1.3
    'browser', 'boxModel'
  ];
  internalOnly = [
    'support'
  ];
  if (node.type === 'MemberExpression') {
    if (isConstructor(node.object)) {
      if (node.property.type === 'Identifier') {
        if (deprecated.indexOf(node.property.name) !== -1) {
          report.errors.push({
            line: node.object.loc.start.line,
            character: node.object.loc.start.column + 1,
            reason: 'DEPRECATED',
            evidence: node.object.name + '.' + node.property.name
          });
        }
        if (internalOnly.indexOf(node.property.name) !== -1) {
          report.errors.push({
            line: node.object.loc.start.line,
            character: node.object.loc.start.column + 1,
            reason: 'INTERNALONLY',
            evidence: node.object.name + '.' + node.property.name
          });
        }
      }
    }
  }
}

function checkDeprecated17(node) {
  if (node.type === 'CallExpression') {
    if (node.callee.type === 'MemberExpression' &&
        isConstructor(node.callee.object) &&
        node.callee.property.type === 'Identifier' &&
        node.callee.property.name === 'sub') {
      report.errors.push({
        line: node.callee.loc.start.line,
        character: node.callee.loc.start.column + 1,
        reason: 'DEPRECATED',
        evidence: node.callee.object.name + '.' + node.callee.property.name + '()'
      });
    }
  }
}

function validate(node) {
  var leadingOptions;
  leadingOptions = options.filter(function (option) {
    return option.line < node.loc.start.line;
  });
  currentOptions = leadingOptions[leadingOptions.length - 1];
  checkConstructorProperty(node);
  checkDeprecated17(node);
  checkInstanceMethod(node);
  checkDeprecatedInstanceProperty(node);
}

function parseComments(found) {
  var f, fLength, comment, value, pairs, p, pLength, pair, option;
  fLength = found.length;
  for (f = 0; f < fLength; f += 1) {
    comment = found[f];
    if (comment.type === 'Block' && comment.value.indexOf('jqlint') === 0) {
      value = comment.value.replace(/^jqlint\s+/, '');
      pairs = value.split(',');

      pLength = pairs.length;
      option = JSON.parse(JSON.stringify(defaults));
      option.line = comment.loc.start.line;
      for (p = 0; p < pLength; p += 1) {
        pair = pairs[p].split(':');
        pair[0] = pair[0].trim();
        pair[1] = pair[1].trim();
        option[pair[0]] = pair[1] === 'true' ? true : false;
      }
      options.push(option);
    }
  }
}

// exports

/**
 * main entry point for jqlint
 * @param {String} code
 * @returns {Object}
 */
module.exports = function (code) {

  var ast;

  options = [];
  options.push({
    line: -1,
    angular: defaults.angular
  });

//  console.log(JSON.stringify(esprima.parse(code, {
//    comment: true,
//    loc: true,
//    tolerant: true
//  }), null, 2));

  report = {
    errors: []
  };

  try {
    ast = esprima.parse(code, {
      comment: true,
      loc: true,
      tolerant: true
    });
  } catch (e) {
    report.errors.push({
      line: e.lineNumber,
      character: e.column,
      reason: 'PARSER',
      evidence: e.message
    });
  }

  if (ast) {
    parseComments(ast.comments);
    estraverse.traverse(ast, {
      enter: validate
    });
  }

//  console.log(JSON.stringify(report, null, 2));

  return report;
};
