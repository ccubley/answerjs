define(function(require) {
  'use strict';

  var libraryTypes = {
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

  return libraryTypes;

});