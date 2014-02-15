require.config({
  baseUrl: "..",
  paths: {
    jquery: "bower_components/jquery/jquery",
    jqueryui: "bower_components/jqueryui/ui/jquery-ui",
    backbone: "bower_components/backbone/backbone",
    underscore: "bower_components/lodash/dist/lodash.underscore",
    lodash: "bower_components/lodash/dist/lodash",
    tmpl: "bower_components/lodash-template-loader/loader",
    handlebars: "bower_components/handlebars/handlebars.runtime",
    bootstrap: "include/bootstrap/js/bootstrap",

    components: "src/modules/components",
    layouts: "src/modules/components/layouts",
    core: "src/modules/core",
    services: "src/modules/services",
    widgets: "src/widgets",
    lib: "src/widgets"
  },
  shim: {
    "jquery-ui": {
      exports: "$",
      deps: ["jquery"]
    },
    bootstrap: {
      deps: ["jquery"],
      exports: "$.fn.dropdown"
    },
    backbone: {
      exports: "Backbone",
      deps: ["underscore", "jquery"]
    },
    handlebars: {
      exports: "Handlebars"
    },
  },
  deps: ["src/main"]
});
