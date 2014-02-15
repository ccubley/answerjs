define(function(require) {
  'use strict';

  var $ = require('jquery');
  require('jqueryui');
  require('bootstrap');

  var template = require('templates/answer-field-picker');

  $.widget( 'ui.fieldpicker', {
    options: {
    },

    _create: function() {
      this._render();
    },

    _render: function() {
      var self = this;
      var html = template(this.options);
      this.element.html(html);

      var descriptions = this.element.find('.afp-attribute-info');
      descriptions
        .click(function (e){
          e.preventDefault();
          return false;
        })
        .popover({
          delay: {
            show: 500,
            hide: 100
          }
        });

      var attributes = this.element.find('.afp-attribute');
      attributes.draggable({ 
        revert: false,
        opacity: 0.35,
        helper: function() {
          var modelPath = $(this).attr('modelPath');
          var result = $('<a class="afp-model-attribute"></a>');
          
          result.text($(this).text());
          result.data('model-path', modelPath);

          console.log(result.data('model-path'));

          return result;
        }
      });

      attributes.click(function(){
        var modelPath = $(this).attr('modelPath');
        $(self.element).trigger('attributeClick', { modelPath: modelPath });
      });
    },

  });
});