define(function(require) {

  'use strict';

  var $ = require('jquery');
  require('widgets/answer-field-picker');
  require('widgets/answer-field-list');

  var model = require('order-processing-model');
  var Query = require('lib/answer-query');
  var query = new Query(model);

  $('#fieldpicker').fieldpicker({
    model: model
  });

  $('#fieldlist').fieldlist({
    caption: 'Variables',
    model: model,
    query: query
  });

  $('#fieldpicker').on('attributeClick', function(eventData, params){
    $('#fieldlist').fieldlist('addField', params.modelPath);
  });

  $('#runbutton').click(function() {
    console.log(query);
  });

});
