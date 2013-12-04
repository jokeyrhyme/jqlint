/*jslint browser:true, indent:2*/
/*globals $, jQuery*/

(function () {
  'use strict';

  function isOpenSource() {
    return $.browser.webkit || jQuery.browser.mozilla;
  }
  isOpenSource();

  function hasBoxModel() {
    return $.boxModel;
  }
  hasBoxModel();

}());
