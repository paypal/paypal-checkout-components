'use strict';

if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'test';
}

if (process.env.CONSOLE_LOG === undefined ) {
    process.env.CONSOLE_LOG = 0;
}

module.exports = function (grunt) {

    var coverageDirectory = 'coverage';

    function isFusion() {
        return process.env.FUSION_BUILD_GENERATED !== undefined;
    }

    var srcFiles = ['*.js', 'lib/*.js'];
    var unitTests = ['test/*.js'];

    var allFiles = ['Gruntfile.js'];
    Array.prototype.push.apply(allFiles, srcFiles);

    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-plato');

    grunt.initConfig({
        clean: {
            tmp: 'tmp',
            build: '.build',
            coverage: coverageDirectory
        },
        eslint: {
            options: {
                config: '.eslintrc',
                format: isFusion() ? 'checkstyle' : 'stylish',
                outputFile: isFusion() ? 'checkstyle.xml' : ''
            },
            module: [
                'lib/*.js',
                'test/*.js',
                'index.js'
            ]
        },
        mochacli: {
            unitTests: {
                src: unitTests,
                options: {
                    timeout: 30000,
                    ignoreLeaks: true,
                    ui: 'bdd',
                    reporter: isFusion() ? 'xunit-file' : 'spec',
                    require: ['babel-register', 'babel-polyfill']
                }
            }
        },

        plato: {
            fusion: {
                options: {
                    jshint: false,
                    exclude: /Gruntfile.js/,
                    complexity: {
                        logicalor: false,
                        switchcase: false,
                        forin: true,
                        trycatch: true
                    }
                },
                files: {
                    'plato-reports': srcFiles
                }
            }
        },
        checkplato: {
            options: {
                dir: 'plato-reports',
                threshold: 90
            }
        }
    });

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('lint', ['eslint']);
    grunt.registerTask('build', ['test']);
    grunt.registerTask('unitTests', ['mochacli:unitTests']); // 'plato', 'checkplato']);
    grunt.registerTask('test', ['lint', 'mochacli:unitTests']);
};