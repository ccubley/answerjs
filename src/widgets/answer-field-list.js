define(function(require) {
  'use strict';

  var _ = require('lodash');
  var $ = require('jquery');
  require('jqueryui');
  require('bootstrap');

  var Query = require('lib/answer-query');

  var template = require('templates/answer-field-list');
  var listItemTemplate = require('templates/answer-field-list-item');

  $.widget( 'ui.fieldlist', {
    options: {
      caption: 'Fields',
      query: false
    },

    _create: function() {
      var self = this;

      this.options.query = this.options.query || new Query(this.options.model);

      $(this.options.query).on('fieldAdded', function(event, field) {
        self._renderAddField(field);
      });

      $(this.options.query).on('fieldRemoved', function(event, fieldId) {
        self._renderRemoveField(fieldId);
      });

      $(this.options.query).on('fieldAggregationChanged', function(event, params) {
        var field = params.field;

        if(params.aggregationId === 'none') {
          field.caption = field.attribute.caption;
        } else {
          field.caption = _.template(
            field.aggregation.descriptionFormat, 
            field.attribute, 
            { 
              interpolate: /\#\{([\s\S]+?)\}/g 
            });
        }

        self._renderFieldChanged(field);
      });

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
      var attribute = this.options.model.lookup[modelPath];
      
      this.options.query.addField(attribute);
    },

    _renderFieldChanged: function(field) {
      var listItem = this.element.find('#' + field.id);

      var captionElement = listItem.find('.afl-field-list-item-caption');
      captionElement.text(field.caption);

      if(field.aggregation) {
        alert('start me up');
      }
    },

    _renderRemoveField: function(id) {
      var listItem = this.element.find('#' + id);

      listItem.remove();
    },

    _renderAddField: function(field) {
      var self = this;
      var attribute = field.attribute;
      var fieldlist = this.element.find('.afl-field-list > tbody');
      var listItemHtml = listItemTemplate(attribute);
      var newField = $(listItemHtml);

      newField.attr('id', field.id);
      fieldlist.append(newField);

      newField.find('.afl-field-list-item-delete').click(
        function() {
          var fieldId = $(this).parents('.afl-field-list-item').attr('id');
          self.options.query.removeField(fieldId);
        }
      );

      newField.find('.afl-aggregation-menu-item').click(
        function() {
          var aggregationId = $(this).data('aggregation-id');
          var fieldId = newField.attr('id');
          self.options.query.setFieldAggregation(fieldId, aggregationId);
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

  });
});