'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        token: "test",
        output: "build",
        clean: ['bower_components', 'node_modules'],
        hashres: {
            options: {
                encoding: 'utf8',
                fileNameFormat: '${name}.${hash}.${ext}',
                renameFile: true
            },
            execute: {
                src: ['<%= output %>/*.min.js', '<%= output %>/*.min.css'],
                dest: []
            }
        }
    });

    grunt.registerTask('watch', ['hashres']);
    grunt.registerTask('default', ['hashres']);
    grunt.registerTask('release', ['clean', 'hashres']);
};
