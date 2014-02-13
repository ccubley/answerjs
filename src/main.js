define(function(require) {

  'use strict';

  var $ = require('jquery');
  require('widgets/answer-field-picker');

  $('#main').fieldpicker({
    message: 'hello fieldpicker'
  });

});
