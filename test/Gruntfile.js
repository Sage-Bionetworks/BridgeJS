'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        token: "test",
        output: "build/" + grunt.template.today('yyyymmddHHMM'),
        clean: {
            build: ['<%= output %>'],
            release: ['bower_components', 'node_modules']
        }
    });

    grunt.registerTask('watch');
    grunt.registerTask('default', ['clean:build']);
    grunt.registerTask('release', ['clean:release']);
};
