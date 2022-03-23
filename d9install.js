// Do a simple Drupal 9 install

// Must npm install async

var site = "https://d9junk.ddev.site/";
var sitedir = "/Users/rfay/workspace/d9junk"

const puppeteer = require('puppeteer');

var exec = require('child_process').exec;
const async = require('async');

function execute(command, callback) {
    exec(command, function (error, stdout, stderr) {
        callback(stdout);
    });
};

function restart(callback) {
    execute('ddev restart', function (result) {
        exec('cd ' + sitedir + ' && ddev restart', function (error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
        callback(result);
    });
    console.log("executed ddev restart");
    return callback;
};

function drop_db(callback) {
    execute('dropdb d9install', function (result) {
        exec('cd ' + sitedir + ' && ddev mysql -e "DROP DATABASE IF EXISTS db; CREATE DATABASE db;"', function (error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
        callback(result);
    });
    console.log("executed dropdb");
    return callback;
};

function web_install() {
    doit = async function doit() {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        page.setDefaultTimeout(0);
        console.log("beginning of web install");
        console.time("installtime");

        installpage = site + 'core/install.php'
        console.log("Installing at " + installpage)
        await page.goto(installpage);
        await page.waitForSelector('[id="edit-langcode"]');
        await page.click('[id="edit-submit"]');
        await page.waitForNavigation();
        await page.waitForSelector('[id="edit-profile"]');
        await page.click('[id="edit-submit"]');
        await page.waitForNavigation();

        await page.waitForSelector('[id="edit-site-name"]');
        browser.close();
        console.timeEnd("installtime");
    }
    doit();
};

async.series([
    function (callback) {
        exec('cd ' + sitedir + ' && ddev mysql -e "DROP DATABASE IF EXISTS db; CREATE DATABASE db;"', function (error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
        console.log("completed drop database");
        callback(null, 'completed drop db');
    },
    function (callback) {
        // then do another async task
        console.log("starting web install");

        web_install(null, 'two');
        console.log("completed web install");
        callback(null, 'completed web install');
    }
]);


