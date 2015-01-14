'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        token: "bridge",
        output: "build",
        clean: {
            build: ['<%= output %>'],
            release: ['bower_components', 'node_modules']
        },
        jshint: {
            options: { node: true, loopfunc: true, globals: { "angular": false } },
            js: ['scripts/**/*.js']
        },
        sass: {
            all: {
                files: { '<%= output %>/<%= token %>.min.css' : '<%= output %>/<%= token %>.scss' }
            }
        },
        concat: {
            js: {
                src: [
                    /*'bower_components/dygraphs/dygraph.dev.js',*/
                    'scripts/app.js',
                    /*'scripts/services/*.js',*/
                    /*'scripts/directives/*.js',*/
                    'scripts/directives/bg-user-menu.js',
                    'scripts/controllers/*.js',
                    'scripts/controllers/directives/*.js'
                ],
                dest: '<%= output %>/<%= token %>.js',
                nonull: true
            },
            sass: {
                src: [
                    'styles/*.scss'
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
        jasmine: {
            src: [
                '../shared/build/bridge-shared.js',
                'bower_components/angular-mocks/angular-mocks.js',
                '<%= output %>/<%= token %>.js'
            ],
            options: {
                version: '2.0.0',
                specs: ['test/**/*_spec.js']
            }
        },
        // run 'grunt watch' to have files processed any time they are changed while you work.
        watch: {
            all: {
                files: ['Gruntfile.js', 'scripts/**/*.js', 'styles/**/*.scss'],
                tasks: 'build',
                spawn: false
            }
        }
    });

    grunt.registerTask('test', ['build', 'jasmine']);
    grunt.registerTask('build', ['jshint', 'clean:build', 'concat', 'sass', 'uglify']);
    grunt.registerTask('default', ['jshint', 'clean:build', 'concat', 'sass', 'uglify']);
    grunt.registerTask('release', ['test', 'clean:release']);
};
