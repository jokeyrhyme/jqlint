/*jslint indent:2, node:true*/

module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({

    jslint: {
      main: {
        src: [
          '**/*.js',
          '**/*.json',
          '!tests/**/*',
          '!**/bower_components/**/*',
          '!**/node_modules/**/*'
        ],
        options: {
          errorsOnly: true,
          failOnError: true
        }
      },
      tests: {
        src: [
          'tests/**/*.js'
        ],
        options: {
          errorsOnly: true,
          failOnError: false
        }
      }
    },

    mocha: {
      all: {
        src: [
          'tests/browser/**/index.html'
        ],
        options: {
          run: true
        }
      }
    },

    mochacli: {
      all: [
        'tests/**/test.js',
        '!tests/browser/**/*'
      ],
      options: {
        ui: 'tdd'
      }
    }

  });

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.registerTask('test', ['jslint', 'mocha', 'mochacli']);

  grunt.registerTask('default', ['test']);

};
