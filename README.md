# exec-notifier

This is a command line utility to execute commands and get
a feedback notification on the exit status of the notification
of the command.

## Install

In order to install this utility, you need [Node.js][node-homepage].
To install it globally, execute the following command:

	npm install -g exec-notify
	
## Usage

To use this command, simply time `node-exec command`. If the command
returns with a normal exit code, a success notification will pop-up in
your screen:

	exec-notify echo Success! # -> Success notification
	
However, if the command fails for some reason, you will receive a failure
notification:

	exec-notify "echo Failure... && false" # -> Failure notification

## Using with your project

Suppose you are developing a Node.js application and you want to get
a notification when your deploy is completed. You can use `exec-notify`
in an `npm script` so that you get a notification of your deploy with
a success or error message.

In order to do this, install `exec-notify` as a development dependency
in your project (so whoever clones the source code can get notifications
as well)

	npm install --save-dev exec-notify
	
The, include a new entry in the [scripts][scripts-documentation] session of your `package.json`.

	"scripts": {
		"deploy": "exec-notify echo Deploying app",
		// ...
	},
	
Afterwards, you will get a notification whenever you run `npm run deploy`.

## Supported Systems

This package uses the excellent [Node Notifier][node-notifier-homepage]. So theorically, Windows, GNU-Linux and Mac OS X are supported. In case you have problems, open an issue so I can take a look.

## Credits

Thanks to:
* @mikaelbr for maintaining [Node Notifier][node-notifier-homepage].
* Custom Icon Design for creating the [Success icon][success-icon-homepage].
* Martz90 for creating the [Warning icon][warning-icon-homepage]

[node-homepage]: https://nodejs.org/en/
[scripts-documentation]: https://docs.npmjs.com/misc/scripts
[node-notifier-homepage]: https://github.com/mikaelbr/node-notifier
[success-icon-homepage]: http://www.iconarchive.com/show/flatastic-2-icons-by-custom-icon-design/success-icon.html
[warning-icon-homepage]: http://www.iconarchive.com/show/circle-addon2-icons-by-martz90/warning-icon.html