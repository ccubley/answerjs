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
      this._processModel(this.options.model);
      this._render();
    },

    _render: function() {
      var self = this;
      var html = template(this.options);
      this.element.html(html);

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

      $('.afp-attribute-info').popover({
        delay: { show: 500, hide: 100 }
      });

    },

    _processModel: function(model) {
      var outputModel = $.extend({}, model);

      outputModel.lookup = {};

      for(var entityId in outputModel.entities)
      {
        var currentEntity = outputModel.entities[entityId];
        currentEntity.entityId = entityId;

        for(var attributeId in currentEntity.attributes)
        {
          var currentAttribute = currentEntity.attributes[attributeId];
          currentAttribute.entity = currentEntity;

          var modelPath = entityId + '.' + attributeId;
          currentAttribute.modelPath = modelPath;

          currentAttribute.attributeId = attributeId;

          outputModel.lookup[modelPath] = currentAttribute;
        }
      }

      this.model = outputModel;
    },

  });
});