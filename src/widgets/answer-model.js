define(function(require) {
  'use strict';

  var $ = require('jquery');

  var Model = function Model(model) {
    this.aggregations = require('lib/answer-library-aggregations');

    this.types = require('lib/answer-library-types');

    $.extend(this, model);

    for(var aggregationId in this.aggregations) {
      this.aggregations[aggregationId].aggregationId = aggregationId; 
    }
    
    for(var typeId in this.types) {
      var currentType = this.types[typeId];
      currentType.typeId = typeId;

      var aggregations = {};
      for(var aggregationIndex in currentType.aggregations)
      {
        var currentAggregationId = currentType.aggregations[aggregationIndex];
        aggregations[currentAggregationId] = this.aggregations[currentAggregationId];
      }

      currentType.aggregations = aggregations;
    }

    this.lookup = {};

    for(var entityId in this.entities)
    {
      var currentEntity = this.entities[entityId];
      currentEntity.entityId = entityId;

      for(var attributeId in currentEntity.attributes)
      {
        var currentAttribute = currentEntity.attributes[attributeId];
        currentAttribute.entity = currentEntity;

        var modelPath = entityId + '.' + attributeId;
        currentAttribute.modelPath = modelPath;

        currentAttribute.attributeId = attributeId;

        currentAttribute.type = this.types[currentAttribute.type];

        this.lookup[modelPath] = currentAttribute;
      }
    }
  };

  return Model;

});