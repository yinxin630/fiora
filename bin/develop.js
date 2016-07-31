'use strict'

const path = require('path');
const cp = require('child_process');
const chokidar = require('chokidar');
const watcher = chokidar.watch(path.join(__dirname, '../src/server/'));

let appIns = cp.fork(path.join(__dirname, '../src/server/app.js'));
appIns.on('exit', code => {
    if (code === 10601) {
        console.log('main applicatiton connect database fail');
        process.exit(0);
    }
});

watcher.on('ready', () => {
    watcher.on('change', (path) => {
        console.log('<---- watched file change, restart server ---->');
        appIns = reload(appIns);
    });

    watcher.on('add', (path) => {
        console.log('<---- watched new file add, restart server ---->');
        appIns = reload(appIns);
    });

    watcher.on('unlink', (path) => {
        console.log('<---- watched file remove, do something ---->');
        appIns = reload(appIns);
    });
});

process.on('SIGINT', () => {
    process.exit(0);
});

function reload(appIns) {
    appIns.kill('SIGINT');
    return cp.fork(require('path').join(__dirname, '../src/server/app.js'));
}