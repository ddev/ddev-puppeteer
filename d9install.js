const puppeteer = require('puppeteer');

var exec = require('child_process').exec;
const async = require('async');
console.log("really early");

function execute(command, callback) {
    exec(command, function (error, stdout, stderr) {
        callback(stdout);
    });
};

function drop_db(callback) {
    execute('dropdb d9install', function (result) {
        exec('cd /Users/rfay/workspace/d9junk && ddev drush sql-drop -y', function (error, stdout, stderr) {
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
        console.log("beginning of puppeteer");
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        page.setDefaultTimeout(0); // 60 seconds

        await page.goto('https://d9junk.ddev.site/core/install.php');
        await page.screenshot({path: 'start.png'});
        console.log("screenshot taken")
        await page.waitForSelector('[id="edit-langcode"]');
        await page.click('[id="edit-submit"]');
        await page.waitForNavigation();
        await page.waitForSelector('[id="edit-site-name"]');
        await page.screenshot({path: 'done.png'});
        browser.close();
        return "done with puppeteer";
    }
    doit();
};

async.series([drop_db, web_install], function (err, results) {
    console.log(results);
});


