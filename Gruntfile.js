module.exports = function (grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // we could just concatenate everything, really
        // but we like to have it the complex way.
        // also, in this way we do not have to worry
        // about putting files in the correct order
        // (the dependency tree is walked by r.js)
        sass: {
          options: {
              sourceMap: true,
              outputStyle: 'compressed',
            },
            dist: {
                files: {
                    // 'destination': 'source'
                    'css/redturtleagidtheme.css': 'sass/redturtleagidtheme.scss',
                }
            },
            bs: {
              files: {
                // 'destination': 'source'
                'css/bootstrap.min.css': 'sass/bootstrap.scss',
              },
            },
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },
        watch: {
            scripts: {
                files: [
                    'sass/*.scss'
                ],
                tasks: ['sass', 'postcss']
            }
        },
        browserSync: {
            html: {
                bsFiles: {
                    src : [
                      'sass/*.scss'
                    ]
                },
                options: {
                    watchTask: true,
                    debugInfo: true,
                    online: true,
                    server: {
                        baseDir: "."
                    },
                }
            },
            plone: {
                bsFiles: {
                    src : [
                      'sass/*.scss'
                    ]
                },
                options: {
                    watchTask: true,
                    debugInfo: true,
                    proxy: "localhost:8080",
                    reloadDelay: 3000,
                    // reloadDebounce: 2000,
                    online: true
                }
            }
        }
    });

    // CWD to theme folder
    grunt.file.setBase('./src/redturtle/agidtheme/theme');

    grunt.registerTask('compile', ['sass', 'postcss']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('bsync', ["browserSync:html", "watch"]);
    grunt.registerTask('plone-bsync', ["browserSync:plone", "watch"]);
};
