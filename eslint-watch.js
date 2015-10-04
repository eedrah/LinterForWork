/* globals require */
/* eslint no-console: 0 */

var chokidar = require('chokidar');
var eslint = require('eslint');
var cli = new eslint.CLIEngine({
    extensions: ['.js', '.jsx']
});

var formatter = cli.getFormatter();

var watcher = chokidar.watch(['../**/*.js', '../**/*.jsx'], {
    ignored: /[\/\\]\./,
    persistent: true
});

var runLint = function (path) {
    var report = cli.executeOnFiles([path]);
    var results = formatter(report.results);
    if (results === '') {
        console.log('Passed lint');
    } else {
        console.log(results);
    }
};

watcher.on('change', runLint);
