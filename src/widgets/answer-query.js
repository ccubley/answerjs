define(function(require) {
  'use strict';

  var $ = require('jquery');

  function generateUUID(){
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c==='x' ? r : (r&0x7|0x8)).toString(16);
      });
      return uuid;
  }

  var Query = function Query(){
    this.fields = [];
  };

  Query.prototype.addField = function(attribute) {
    var newField = {
      id: generateUUID(),
      attribute: attribute,
      caption: attribute.caption,
      aggregation: false
    };

    $(this).trigger('fieldAdded', newField);
  };

  Query.prototype.removeField = function(index) {
    var removed = this.fields.splice(index, 1);
    var result = removed[0];

    $(this).trigger('fieldRemoved', result);

    return result;
  };

  Query.prototype.setFieldAggregation = function(index, aggregationId) {
    var field = this.fields[index];

    var previousAggregationId = field.aggregationId;
    field.aggregationId = aggregationId;

    $(this).trigger('fieldAggregationChanged', {
      field: field,
      previousAggregationId: previousAggregationId,
      aggregationId: aggregationId  
    });
  };

  return Query;
});