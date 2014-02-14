define(function(require) {

  'use strict';

  var $ = require('jquery');
  require('widgets/answer-field-picker');

  var model = {
    caption: 'Order Processing',
    entities: {
      customers: {
        caption: 'Customers',
        attributes: {
          customerId: {
            caption: 'Customer ID'
          },
          firstName: {
            caption: 'First Name'
          },
          lastName: {
            caption: 'Last Name'
          },
          phoneNumber: {
            caption: 'Phone Number'
          },
          address: {
            caption: 'Address'
          },
          city: {
            caption: 'City'
          },
          state: {
            caption: 'State'
          },
          zip: {
            caption: 'ZIP Code'
          },
        },
      },

      products: {
        caption: 'Products',
        attributes: {
          productId: {
            caption: 'Product ID'
          },
          name: {
            caption: 'Product Name'
          },
          description: {
            caption: 'Description'
          },
          unitPrice: {
            caption: 'Unit Price'
          },
        },
      },

      orders: {
        caption: 'Orders',
        attributes: {
          orderId: {
            caption: 'Order ID'
          },
          customerId: {
            caption: 'Customer ID'
          },
          orderDate: {
            caption: 'Order Date'
          },
          status: {
            caption: 'Order Status'
          },
        },
      },

      orderDetails: {
        caption: 'Order Details',
        attributes: {
          orderDetailId: {
            caption: 'Order Detail ID',
            hidden: true
          },
          orderId: {
            caption: 'Order ID'
          },
          productId: {
            caption: 'Product ID'
          },
          quantity: {
            caption: 'Quantity'
          },
        },
      },

      configStuff: {
        caption: 'Shouldn\'t see this',
        hidden: true,
        attributes: {
          configId: {
            caption: 'Config ID'
          },
        },
      },

    },
  };

  $('#main').fieldpicker({
    model: model
  });

});
