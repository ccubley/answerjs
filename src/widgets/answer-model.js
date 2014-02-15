define(function(require) {
  'use strict';

  var $ = require('jquery');

  var Model = function Model(model) {
    this.aggregations = {
      count: {
        caption: 'Count',
        descriptionFormat: 'Count of #{caption}',
      },
      countDistinct: {
        caption: 'Count (Distinct)',
        descriptionFormat: 'Distinct Count of #{caption}',
      },
      sum: {
        caption: 'Sum',
        descriptionFormat: 'Sum of #{caption}',
      },
      average: {
        caption: 'Average',
        descriptionFormat: 'Average of #{caption}',
      },
      min: {
        caption: 'Minimum',
        descriptionFormat: 'Minimum of #{caption}',
      },
      max: {
        caption: 'Maximum',
        descriptionFormat: 'Maximum of #{caption}',
      },
      stdev: {
        caption: 'Standard Deviation',
        descriptionFormat: 'Standard Deviation of #{caption}',
      }
    };

    this.types = {
      id: {
        comparisons: ['equals', 'notEquals'],
        aggregations: ['count', 'countDistinct'],
      },
      integer: {
        comparisons: ['equals', 'notEquals', 'lessThan', 'greaterThan', 'lessThanOrEqual', 'greaterThanOrEqual'],
        aggregations: ['count', 'countDistinct', 'sum', 'average', 'min', 'max', 'stdev'],
      },
      money: {
        comparisons: ['equals', 'notEquals', 'lessThan', 'greaterThan', 'lessThanOrEqual', 'greaterThanOrEqual'],
        aggregations: ['count', 'countDistinct', 'sum', 'average', 'min', 'max', 'stdev'],
      },
      string: {
        comparisons: ['equals', 'notEquals', 'contains', 'beginsWith', 'endsWith'],
        aggregations: ['count', 'countDistinct'],
      },
      date: {
        comparisons: ['equals', 'not-equals', 'before', 'after', 'onOrBefore', 'onOrAfter', 'between'],
        aggregations: ['count', 'countDistinct'],
      },
    };

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