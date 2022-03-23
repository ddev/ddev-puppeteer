// Must npm install async

var site= "https://d9junk.ddev.site/";

const puppeteer = require('puppeteer');

var exec = require('child_process').exec;
const async = require('async');

function execute(command, callback) {
    exec(command, function (error, stdout, stderr) {
        callback(stdout);
    });
};

function drop_db(callback) {
    execute('dropdb d9install', function (result) {
        exec('cd /Users/rfay/workspace/d9junk && ddev mysql -e "DROP DATABASE IF EXISTS db; CREATE DATABASE db;"', function (error, stdout, stderr) {
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

        const browser = await puppeteer.launch({headless: false});
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

async.series([drop_db, web_install], function (err, results) {
    console.log(results);
});


