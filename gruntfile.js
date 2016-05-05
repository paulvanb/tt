module.exports = function (grunt) {

    /**
     * Load all dependecies with Just in Time grunt
     */
    require('jit-grunt')(grunt);

    /**
     * General settings
     * @type {String}
     */
    var themeName = 'tamtam';
    var themeDir = 'app/' + themeName + '/assets';
    var buildDir = 'app/' + themeName + '/build/assets';

    /**
     * Copy task object for bower libraries
     * @type {Object}
     */
    var bowerLibs = {};

    // jQuery validate
    var jQueryvalidate = buildDir + '/js/libs/jquery.validate.min.js';
    bowerLibs[jQueryvalidate] = ['bower_components/jquery-validate/dist/jquery.validate.min.js'];

    // jQuery validate additional methods
    var jQueryAdditionalDest = buildDir + '/js/libs/additional-methods.min.js';
    bowerLibs[jQueryAdditionalDest] = ['bower_components/jquery-validate/dist/additional-methods.min.js'];


    /**
     * Grunt config tasks
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            sass: {
                files: [themeDir + '/sass/**/*.scss'],
                tasks: ['sass', 'cssmin:css']
            },
            uglify: {
                files: [
                    themeDir + '/js/scripts.js',
                    themeDir + '/js/**/*.js',
                ],
                tasks: ['uglify:js']
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: [
                    {
                        expand: true,
                        cwd: themeDir + '/sass',
                        src: ['*.scss'],
                        dest: themeDir + '/css',
                        ext: '.css'
                    }
                ]
            }
        },
        cssmin: {
            options: {
                rebase: false,
                keepSpecialComments: 0,
            },
            css: {
                files: [{
                    expand: true,
                    cwd: themeDir + '/css',
                    src: ['*.css', '!*.min.css'],
                    dest: buildDir + '/css',
                    ext: '.min.css'
                }]
            }
        },
        modernizr: {
            dist: {
                // Path to save out the built file
                'dest': themeDir + '/js/libs/modernizr.js',
                // By default, source is uglified before saving
                'uglify': false,
                // Based on default settings on http://modernizr.com/download/
                'options': [
                    'setClasses',
                ],
                'excludeTests': [
                    'hidden'
                ],
                // Define any tests you want to explicitly include
                'tests': [
                    'placeholder'
                ],
                // By default, this task will crawl all *.js, *.css, *.scss files.
                'files': {
                    'src': [
                        themeDir + '/**/*.{js,css,scss}',
                    ]
                },
            }
        },
        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                    }, {
                        removeUselessStrokeAndFill: false
                    }
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: themeDir + '/images/svg/',
                    src: ['*.svg', '**/*.svg'],
                    dest: buildDir + '/images/svg/'
                }]
            }
        },
        uglify: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: themeDir + '/js',
                        src: ['*.js', '*/**.js'],
                        dest: buildDir + '/js',
                        ext: '.min.js'
                    }
                ]
            }
        },
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        cwd: themeDir + '/images',
                        src: ['*.{png,jpg,gif,svg}', 'favicon/*.{png,json,ico,xml}', '**/*.{png,jpg,gif,svg}'],
                        dest: buildDir + '/images'

                    }
                ]
            },
            font: {
                files: [
                    {
                        expand: true,
                        cwd: themeDir + '/fonts',
                        src: ['**'],
                        dest: buildDir + '/fonts/'

                    }
                ]
            },
            js: {
                files: bowerLibs
            }
        },
        clean: {
            build: [buildDir] //Clean build folder
        }
    });

    grunt.registerTask('default', ['clean:build', 'sass', 'cssmin:css', 'modernizr:dist', 'uglify:js', 'copy', 'watch']);
    grunt.registerTask('production', ['clean:build', 'sass', 'cssmin:css', 'uglify:js', 'svgmin:dist', 'copy']);
};
