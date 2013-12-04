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

    mochacli: {
      all: [
        'tests/**/test.js'
      ],
      options: {
        ui: 'tdd'
      }
    }

  });

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.registerTask('test', ['jslint', 'mochacli']);

  grunt.registerTask('default', ['test']);

};
