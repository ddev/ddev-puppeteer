# ddev-puppeteer
Simple puppeteer script to try to measure ddev performance

This tries to use a DDEV Drupal 9 project as a measure of performance using a web install of the demo_umami profile.

* To use this, you need nodejs, `npm init && npm i puppeteer async`.
* The project named in ddev-puppeteer.js should be a standard Drupal 9 install as per the [DDEV drupal 9 quickstart](https://ddev.readthedocs.io/en/latest/users/cli-usage/#drupal-9-composer-setup-example)
* Set up the project with mutagen or colima or whatever permutation you like.
* The project should already be running.
* Run the test with `node ddev-puppeteer.js`

## Notes

* This is using the Drupal `demo_umami` profile, which takes longer than `standard`.
* The script reset php-fpm at the beginning to make sure we start without a php opcache. This may or may not be fair.
* To see what's happening in the install you can change `puppeteer.launch({headless: true})` to `puppeteer.launch({headless: false})`.
