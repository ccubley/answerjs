define(function(require) {
  'use strict';

  var $ = require('jquery');
  require('jqueryui');

  $.widget( 'ui.fieldpicker', {
    options: {
      message: ''
    },
    
    _create: function() {
      this.element.text( this.options.message );
    },
  });
});