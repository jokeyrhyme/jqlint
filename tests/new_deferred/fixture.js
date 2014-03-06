/*jslint browser:true, indent:2*/
/*globals $, jQuery*/

(function () {
  'use strict';

  var dfrd1, dfrd2;

  dfrd1 = new $.Deferred();
  dfrd2 = $.Deferred();

  $.Deferred(function (dfrd3) {
    return dfrd3;
  });

  return [ dfrd1, dfrd2 ];
}());
