define(function(require) {
  'use strict';

  var libraryAggregations = {
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

    return libraryAggregations;

});