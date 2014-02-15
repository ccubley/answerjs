define(function(require) {
  'use strict';

  var $ = require('jquery');

  function generateId(){
      var d = new Date().getTime();
      var uuid = 'IDxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c==='x' ? r : (r&0x7|0x8)).toString(16);
      });
      return uuid;
  }

  var Query = function Query(){
    this.fields = {};
  };

  Query.prototype.addField = function(attribute) {
    var newField = {
      id: generateId(),
      attribute: attribute,
      caption: attribute.caption,
      aggregation: false
    };
 
    this.fields[newField.id] = newField;

    $(this).trigger('fieldAdded', newField);
  };

  Query.prototype.removeField = function(id) {
    delete this.fields[id];

    $(this).trigger('fieldRemoved', id);

    return this;
  };

  Query.prototype.setFieldAggregation = function(id, aggregationId) {
    var field = this.fields[id];

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