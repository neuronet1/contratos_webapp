module.exports = function(grunt) {
    var appfiles = ['*.js','routes/*.js', 'bin/www', 'public/app/**/*.js'];

    grunt.initConfig({
        jshint: {
            files: appfiles
        },
        watch: {
            files: appfiles,
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
};