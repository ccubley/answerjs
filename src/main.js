define(function(require) {

  'use strict';

  var $ = require('jquery');
  require('widgets/answer-field-picker');
  require('widgets/answer-field-list');

  var model = {
    caption: 'Order Processing',
    aggregations: {
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
    },

    types: {
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
    },
    entities: {
      customers: {
        caption: 'Customers',
        attributes: {
          customerId: {
            caption: 'Customer ID',
            type: 'id'
          },
          firstName: {
            caption: 'First Name',
            description: 'Customer\'s first name.',
            type: 'string',
          },
          lastName: {
            caption: 'Last Name',
            description: 'Customer\'s last name.',
            type: 'string',
          },
          phoneNumber: {
            caption: 'Phone Number',
            type: 'string',
          },
          address: {
            caption: 'Address',
            type: 'string',
          },
          city: {
            caption: 'City',
            type: 'string',
          },
          state: {
            caption: 'State',
            type: 'string',
          },
          zip: {
            caption: 'ZIP Code',
            type: 'string',
          },
        },
      },

      products: {
        caption: 'Products',
        attributes: {
          productId: {
            caption: 'Product ID',
            type: 'id',
          },
          name: {
            caption: 'Product Name',
            type: 'string',
          },
          description: {
            caption: 'Description',
            type: 'string',
          },
          unitPrice: {
            caption: 'Unit Price',
            description: 'Unit price of the product in USD.',
            type: 'money',
          },
        },
      },

      orders: {
        caption: 'Orders',
        attributes: {
          orderId: {
            caption: 'Order ID',
            type: 'id',
          },
          customerId: {
            caption: 'Customer ID',
            type: 'id',
          },
          orderDate: {
            caption: 'Order Date',
            description: 'Date the order was placed.',
            type: 'date',
          },
          status: {
            caption: 'Order Status',
            type: 'id',
          },
        },
      },

      orderDetails: {
        caption: 'Order Details',
        attributes: {
          orderDetailId: {
            caption: 'Order Detail ID',
            type: 'id',
            hidden: true,
          },
          orderId: {
            caption: 'Order ID',
            type: 'id',
          },
          productId: {
            caption: 'Product ID',
            type: 'id',
          },
          quantity: {
            caption: 'Quantity',
            type: 'integer',
          },
        },
      },

      configStuff: {
        caption: 'Shouldn\'t see this',
        hidden: true,
        attributes: {
          configId: {
            caption: 'Config ID',
            type: 'id',
          },
        },
      },

    },
  };

  $('#fieldpicker').fieldpicker({
    model: model
  });

  $('#fieldlist').fieldlist({
    caption: 'Variables',
    model: model
  });

  $('#fieldpicker').on('attributeClick', function(eventData, params){
    $('#fieldlist').fieldlist('addField', params.modelPath);
  });

});
