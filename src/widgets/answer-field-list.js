define(function(require) {
  'use strict';

  var $ = require('jquery');
  require('jqueryui');
  require('bootstrap');

  var template = require('templates/answer-field-list');
  var listItemTemplate = require('templates/answer-field-list-item');

  $.widget( 'ui.fieldlist', {
    options: {
      caption: 'Fields'
    },

    _create: function() {
      this._processModel(this.options.model);
      this._render();
    },

    _render: function() {
      var self = this;
      var html = template(this.options);
      this.element.html(html);

      var fieldListElement = this.element.find('.afl-field-target');

      fieldListElement.droppable({
        tolerance: 'pointer',
        accept: function(item) {
          return item.hasClass('afp-attribute');
        },
        drop: function(event, ui) {
          var modelPath = ui.helper.data('model-path');
          self.addField(modelPath);
        },
      });

      fieldListElement.find('tbody').sortable({
        helper: function(event, element) {
          return $(element).find('.afl-field-list-item-caption').clone();
        },
      });
    },

    addField: function(modelPath) {
      var attribute = this.model.lookup[modelPath];
      var fieldlist = this.element.find('.afl-field-list > tbody');
      var listItemHtml = listItemTemplate(attribute);
      var newField = $(listItemHtml);

      fieldlist.append(newField);

      newField.find('.afl-field-list-item-delete').click(
        function() {
          $(this).parents('.afl-field-list-item').remove();
        }
      );

      newField.find('.afl-aggregation-menu-item').click(
        function() {
          var aggregationId = $(this).data('aggregation-id');
          alert(aggregationId);
        }
      );

      var captionEdit = function() {
        console.log(this);
        var currentCaption = $(this).text();
        
        var captionEditBox = $('<input type="text" value="' + currentCaption + '">');

        captionEditBox.keypress(function(eventObject){
          if(eventObject.which === 13){
            captionEditBox.blur();
          }
        });

        captionEditBox.blur(function(){
          var newCaption = $(this).val();
          var captionLabel = $('<a class="afl-field-list-item-caption" href="#">' + newCaption + '</a>');
          captionLabel.click(captionEdit);
          
          $(this).replaceWith(captionLabel);
        });

        $(this).replaceWith(captionEditBox);
        captionEditBox.focus();
      };

      newField.find('.afl-field-list-item-caption').click(captionEdit);
    },

    _processModelAggregations: function(model) {
      for(var aggregationId in model.aggregations)
      {
        model.aggregations[aggregationId].aggregationId = aggregationId; 
      }
    },

    _processModelTypes: function(model) {
      for(var typeId in model.types)
      {
        var currentType = model.types[typeId];
        currentType.typeId = typeId;

        var aggregations = {};
        for(var aggregationIndex in currentType.aggregations)
        {
          var aggregationId = currentType.aggregations[aggregationIndex];
          aggregations[aggregationId] = model.aggregations[aggregationId];
        }

        currentType.aggregations = aggregations;
      }
    },

    _processModel: function(model) {
      var outputModel = $.extend({}, model);

      outputModel.lookup = {};

      this._processModelAggregations(model);

      this._processModelTypes(model);

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

          currentAttribute.type = outputModel.types[currentAttribute.type];

          outputModel.lookup[modelPath] = currentAttribute;
        }
      }

      this.model = outputModel;
    },

  });
});