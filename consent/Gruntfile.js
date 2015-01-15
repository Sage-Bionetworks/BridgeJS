'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    
    var jsFiles = [
        "scripts/consent.js",
        "scripts/learn-more-service.js"
    ];

    grunt.initConfig({
        token: "consent",
        output: "build/" + grunt.template.today('yyyymmddHHMM'),
        clean: {
            build: ['<%= output %>'],
            release: ['bower_components', 'node_modules']
        },
        jshint: {
            options: { node: true, loopfunc: true, globals: { "angular": false } },
            js: jsFiles
        },
        sass: {
            all: {
                files: { '<%= output %>/<%= token %>.min.css' : '<%= output %>/<%= token %>.scss' }
            }
        },
        concat: {
            js: {
                src: jsFiles,
                dest: '<%= output %>/<%= token %>.js',
                nonull: true
            },
            sass: {
                src: [
                    "styles/consent.scss",
                    "styles/learn-more.scss"
                ],
                dest: '<%= output %>/<%= token %>.scss',
                nonull: true
            }
        },
        uglify: {
            js: {
                src: '<%= output %>/<%= token %>.js',
                dest: '<%= output %>/<%= token %>.min.js'
            },
            options: {
                sourceMap: true
            }
        },
        watch: {
            all: {
                files: ['Gruntfile.js', 'scripts/**/*.js', 'styles/**/*.scss', 'styles/**/*.css'],
                tasks: 'build',
                spawn: false
            }
        }
    });

    grunt.registerTask('test', ['build']);
    grunt.registerTask('build', ['jshint', 'clean:build', 'concat', 'sass', 'uglify']);
    grunt.registerTask('default', ['jshint', 'clean:build', 'concat', 'sass', 'uglify']);
    grunt.registerTask('release', ['test', 'clean:release']);
};
