define(function(require) {
  'use strict';

  var $ = require('jquery');
  require('jqueryui');

  var template = require('templates/answer-field-picker');

  $.widget( 'ui.fieldpicker', {
    options: {
    },

    _create: function() {
      this._processModel(this.options.model);
      this._render();
    },

    _render: function() {
      var html = template(this.options);
      this.element.html(html);

      var attributes = this.element.find('.afp-attribute');
      attributes.draggable({ 
        revert: false,
        opacity: 0.35,
        helper: function() {
          var modelPath = $(this).attr('modelPath');
          var result = $('<a></a>');
          
          result.text($(this).text());
          result.data('model-path', modelPath);

          console.log(result.data('model-path'));

          return result;
        }
      });

    },

    _processModel: function(model) {
      for(var entityId in model.entities)
      {
        var currentEntity = model.entities[entityId];

        for(var attributeId in currentEntity.attributes)
        {
          var currentAttribute = currentEntity.attributes[attributeId];
          currentAttribute.modelPath = entityId + '.' + attributeId;
        }
      }
    },

  });
});