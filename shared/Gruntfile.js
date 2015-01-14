'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    
    var jsFiles = [
        "bower_components/angular/angular.js",
        "bower_components/angular-route/angular-route.js",
        "bower_components/bootstrap-bower/ui-bootstrap-tpls.min.js",
        /* Build that included dropdown, modal and datepicker didn't include the dropdown module. */
        /*"scripts/angular-bootstrap-ui-custom-build/ui-bootstrap-custom-tpls-0.10.0.js",*/        
        "scripts/humane-modified.js",
        "scripts/shared.js",
        "scripts/form-service.js",
        "scripts/modal-service.js",
        "scripts/humane.js",
        "scripts/auth-service.js",
        "scripts/signin-service.js",
        "scripts/request-reset-password.js",
        "scripts/auth-interceptor.js",
        "scripts/loading-interceptor.js",
        "scripts/ga.js",
        "scripts/bg-focus.js",
        "scripts/bg-pressable.js"
    ];
    var cssFiles = [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/bootstrap/dist/css/bootstrap-theme.css',
        'styles/*.scss'
    ];
    
    grunt.initConfig({
        token: "bridge-shared",
        output: "build",
        clean: {
            build: ['<%= output %>'],
            release: ['bower_components', 'node_modules']
        },
        jshint: {
            options: { 
                node: true,
                evil: true,
                loopfunc: true, 
                globals: { "angular": false },
                ignores: ['**/angular.js', '**/angular-route.js', '**/ui-bootstrap-tpls.min.js', '**/ui-bootstrap-custom-tpls-0.10.0.js']
            },
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
                src: cssFiles,
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
        copy: {
            main: {
                files: [
                    {
                        expand: true, cwd: 'bower_components/bootstrap/dist/css/', src: ['*.map'], 
                        dest: '<%= output %>'
                    }
                ]
            }
        },
        watch: {
            all: {
                files: ['Gruntfile.js', 'scripts/*.js', 'styles/**/*.scss'],
                tasks: 'build',
                spawn: false
            }
        }
    });

    grunt.registerTask('test', ['build']);
    grunt.registerTask('build', ['jshint', 'clean:build', 'concat', 'sass', 'uglify', 'copy']);
    grunt.registerTask('default', ['jshint', 'clean:build', 'concat', 'sass', 'uglify', 'copy']);
    grunt.registerTask('release', ['test', 'clean:release']);
};
