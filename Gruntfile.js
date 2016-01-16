module.exports = function (grunt){
    
    var files = require('./files').files;

    // Configuración del Proyecto
    grunt.initConfig({
        builddir: 'dist',
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/**\n'+
                ' * <%= pkg.description %>\n' +
                ' * @version v<%= pkg.version %>\n' +
                ' * @link <%= pkg.homepage %>\n' +
                ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
                ' */'
        },

        clean: [ '<%= builddir %>' ],

        concat: {
            options: {
                banner: '(function(window, angular, vis, undefined){\n\n\n',
                footer: '})(window, window.angular, vis);'
            },
            build: {
                src: files.src,
                dest: '<%= builddir %>/<%= pkg.name %>.js'
            }
        },

        watch: {
            files: ['src/*.js'],
            tasks: ['default']
        }
    });

    grunt.registerTask('default', 'Perform a normal build', ['concat']);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
};