#! /usr/bin/env node

'use strict';

var command = process.argv.slice(2).join(' ');
var spawn = require('child_process').spawn;
var notifier = require('node-notifier');
var start = new Date().getTime();

if (command.length === 0) {
    console.log('Usage: exec-notify COMMAND');
    process.exit(1);
}

var child = spawn('bash', ['-c', command], { stdio: 'inherit' });
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
    var printableCommand = command;
    var message = 'Executed ' + printableCommand + ' in ' + printableDuration;

    code = parseInt(code);
    if (code === 0) {
        notifier.notify({
            'title': 'Success',
            'message': message,
            'sound': 'Submarine',
            'icon': 'success-icon.png'
        });
    } else {
        notifier.notify({
            'title': 'Failure',
            'message': message,
            'sound': 'Basso',
            'icon': 'warning-icon.png'
        });
    }
});
