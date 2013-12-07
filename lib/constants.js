/*jslint indent:2, node:true*/

'use strict';

// https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js
(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.constants = factory();
  }
}(this, function () {
  return {
    METHODS: {
      CHAIN: [
        'end', 'show', 'hide',
        // methods that return `this.pushStack()`
        'slice', 'eq', 'find', 'not', 'filter', 'closest', 'add',
        'parent', 'parents', 'parentsUntil', 'next', 'prev', 'nextAll',
        'prevAll', 'nextUntil', 'prevUntil', 'siblings', 'children', 'contents',
        'appendTo', 'prependTo', 'insertBefore', 'insertAfter', 'replaceAll',
        // methods that return `this.eq()`
        'first', 'last',
        // methods that return `this.add()`
        'addBack',
        // methods that return `this`
        'ready', 'addClass', 'removeClass', 'on', 'off', 'remove', 'empty',
        'domManip', 'wrapAll',
        // methods that return `this.on()`
        'one', 'ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError',
        'ajaxSuccess', 'ajaxSend', 'bind', 'delegate', 'blur', 'focus',
        'focusin', 'focusout', 'load', 'resize', 'scroll', 'unload', 'click',
        'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover',
        'mouseout', 'mouseenter', 'mouseleave', 'change', 'select', 'submit',
        'keydown', 'keypress', 'keyup', 'error', 'contextmenu',
        // methods that return `this.off()`
        'unbind', 'undelegate',
        // methods that return `this.each()`
        'removeData', 'dequeue', 'removeAttr', 'removeProp', 'toggleClass',
        'wrapInner', 'wrap', 'toggle', 'animate', 'stop', 'finish',
        // methods that return `this.parent()`
        'unwrap',
        // methods that return `this.domManip()`
        'append', 'prepend', 'before', 'after',
        // methods that return `this.filter()`
        'fadeTo', 'has',
        // methods that return `this.map()`
        'clone',
        // methods that return `this.remove()`
        'detach',
        // methods that return `this.queue()`
        'delay', 'clearQueue',
        // methods that return `this.animate()`
        'slideDown', 'slideUp', 'slideToggle', 'fadeIn', 'fadeOut', 'fadeToggle'
      ],
      /**
       * jQuery.fn methods that only chain when provided with a callback
       */
      CHAIN_WITH_CALLBACK: [
        'each', 'map'
      ],
      /**
       * jQuery.fn methods that only chain when provided with arguments[0]
       */
      CHAIN_WITH_ARG0: [
        'val', 'text', 'html', 'height', 'width', 'trigger'
      ],
      /**
       * jQuery.fn methods that only chain when provided with arguments[1]
       */
      CHAIN_WITH_ARG1: [
        'attr', 'css', 'data'
      ]
    }
  };
}));
