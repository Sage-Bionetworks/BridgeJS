'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        token: "test",
        output: "build",
        
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
    grunt.registerTask('release', ['hashres']);
};
