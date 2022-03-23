# ddev-puppeteer
Simple puppeteer script to try to measure ddev performance

This tries to use a DDEV Drupal 9 project as a measure of performance using a web install of the demo_umami profile.

* To use this, you need nodejs, and `npm i puppeteer async`.
* The project named in ddev-puppeteer.js should be a standard Drupal 9 install as per the [DDEV drupal 9 quickstart](https://ddev.readthedocs.io/en/latest/users/cli-usage/#drupal-9-composer-setup-example)
* Set up the project with mutagen or colima or whatever permutation you like.
* Run the test with `node ddev-puppeteer.js`

## Notes
