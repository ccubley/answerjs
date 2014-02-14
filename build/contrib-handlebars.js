module.exports = function(grunt) {

  grunt.config.set('handlebars', {
    compile: {
      options: {
        namespace: false,
        amd: true
      },
      files: [{
        expand: true,
        cwd: 'src/templates',
        src: '**/*.hbs',
        dest: 'prod/templates',
        ext: '.js',
      }],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');

};