// Do a simple Drupal 9 install

// Must npm install async

var site = "https://d9junk.ddev.site/";
var sitedir = "/Users/rfay/workspace/d9junk"

const puppeteer = require('puppeteer');

var exec = require('child_process').exec;
const async = require('async');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function execute(command, callback) {
    exec(command, function (error, stdout, stderr) {
        callback(stdout);
    });
};

function web_install() {
    doit = async function doit() {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        page.setDefaultTimeout(0);
        console.log("Waiting for setup work to be done");
        await sleep(10000); // make sure setup work is done
        console.log("Continuing with web install");

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
        exec('cd ' + sitedir + ' && ddev mysql -e "DROP DATABASE IF EXISTS db; CREATE DATABASE db;" && ddev exec killall -USR2 php-fpm', function (error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
        callback(null, 'completed drop db');
    },
    function (callback) {
        web_install(null, 'two');
        callback(null, 'completed web install');
    }
]);


