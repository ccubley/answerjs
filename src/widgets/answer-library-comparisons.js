define(function(require) {
  'use strict';

  var libraryComparisons = {
    equals: {
      parameters: ['lhs', 'rhs']
    },
    
    notEquals: {
      parameters: ['lhs', 'rhs']
    },
    
    lessThan: {
      parameters: ['lhs', 'rhs']
    },
    
    greaterThan: {
      parameters: ['lhs', 'rhs']
    },
    
    lessThanOrEqual: {
      parameters: ['lhs', 'rhs']
    },

    greaterThanOrEqual: {
      parameters: ['lhs', 'rhs']
    },

    before: {
      parameters: ['lhs', 'rhs']
    },

    after: {
      parameters: ['lhs', 'rhs']
    },

    onOrBefore: {
      parameters: ['lhs', 'rhs']
    },

    onOrAfter: {
      parameters: ['lhs', 'rhs']
    },

    between: {
      parameters: ['value', 'lowerBound', 'upperBound']
    },
  };

  return libraryComparisons;

});