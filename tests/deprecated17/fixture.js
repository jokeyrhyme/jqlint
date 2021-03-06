/*jslint browser:true, indent:2*/
/*globals $, jQuery*/

(function () {
  'use strict';

  var dfrd, sub, button$;

  dfrd = new $.Deferred();
  if (!dfrd.isRejected() && !dfrd.isResolved()) {
    dfrd.resolve();
  }

  button$ = $('button');

  button$.live('click', function () {
    button$.die('click');
  });

  sub = $.sub();

  sub(button$.selector).prop('disabled', true);

}());
