/*jslint browser:true, indent:2*/
/*globals $, jQuery*/

(function () {
  'use strict';

  var dfrd;

  $('button').andSelf();
  $('button').error().load().unload().toggle().size();

  dfrd = new $.Deferred();
  dfrd.pipe();

}());
