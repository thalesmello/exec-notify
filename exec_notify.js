#! /usr/bin/env node

'use strict';

var command = process.argv.slice(2);
var spawn = require('child_process').spawn;
var notifier = require('node-notifier');
var start = new Date().getTime();

var child = spawn(command[0], command.slice(1), { stdio: 'inherit' });
function millisecondsToStr(milliseconds) {
    var build = [];

    var temp = Math.floor(milliseconds / 1000);

    var minutes = Math.floor((temp %= 3600) / 60);

    if (minutes) {
        build.push(minutes + ' min');
    }

    var seconds = temp % 60;

    if (seconds) {
        build.push(seconds + 's');
    }

    if (build.length === 0) {
        return 'less than a second';
    } else if (build.length === 1) {
        return build[0];
    } else {
        return build.join('');
    }
}

child.on('exit', function(code) {
    var end = new Date().getTime();
    var duration = end - start;
    var printableDuration = millisecondsToStr(duration);
    var printableCommand = command.join(' ');
    var message = 'Executed ' + printableCommand + ' in ' + printableDuration;

    code = parseInt(code);
    if (code === 0) {
        notifier.notify({
            'title': 'Deploy successfully executed',
            'message': message,
            'sound': 'Submarine',
            'icon': 'success-icon.png'
        });
    } else {
        notifier.notify({
            'title': 'Deploy failed',
            'message': message,
            'sound': 'Basso',
            'icon': 'warning-icon.png'
        });
    }
});
