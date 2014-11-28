var HtmlReporter = require('protractor-html-screenshot-reporter');

exports.config = {
    specs:[
        './e2e/**/*.spec.js'
    ],
    baseUrl: 'http://localhost:3000',
    onPrepare: function() {
        // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'tmp/screenshots'
        }));
    }
};