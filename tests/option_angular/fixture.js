/*jslint browser:true, indent:2*/
/*globals $, jQuery*/

(function () {
  'use strict';

  var $button, input$;

  $button = $('button');
  input$ = $('input');

  /*jqlint angular:true*/
  $button.bind();
  input$.unbind();
  /*jqlint angular:false*/

  $button.delegate();
  input$.undelegate();
}());
