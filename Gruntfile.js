module.exports = function(grunt) {
    var appfiles = ['*.js','routes/*.js', 'bin/www'];

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