# ddev-puppeteer
Simple puppeteer script to try to measure ddev performance

This tries to use a DDEV Drupal 10 project as a measure of performance using a web install of the demo_umami profile.

* To use this, you need nodejs, `npm init && npm i puppeteer async`.
* The project named in ddev-puppeteer.js should be a standard Drupal 10 install as per the [DDEV drupal 10 quickstart](https://ddev.readthedocs.io/en/latest/users/quickstart/#drupal)
* Edit `site` and `sitedir` in ddev-puppeteer.js.
* Set up the project with mutagen or colima or whatever permutation you like.
* The project should already be running.
* Run the test with `node ddev-puppeteer.js`

## Notes

* This is using the Drupal `demo_umami` profile, which takes longer than `standard`.
* The script reset php-fpm at the beginning to make sure we start without a php opcache. This may or may not be fair.
* To see what's happening in the install you can change `puppeteer.launch({headless: true})` to `puppeteer.launch({headless: false})`.
* The drush install  is `ddev mysql -e "DROP DATABASE IF EXISTS db; CREATE DATABASE db;" && ddev exec killall -USR2 php-fpm && rm -rf web/sites/default/files/* && ddev mutagen sync && time ddev drush si demo_umami -y`
* Links:
  * Early measurements of performance with mutagen on [ddev.com](https://ddev.com/ddev-local/supercharge-your-ddev-performance-with-mutagen/).
  * [Puppeteer quickstart](https://developers.google.com/web/tools/puppeteer/get-started)
  * [async docs](https://caolan.github.io/async/v3)
  * [How to use series function in async](https://www.tabnine.com/code/javascript/functions/async/series)
  * [Useful Puppeteer examples](https://nitayneeman.com/posts/getting-to-know-puppeteer-using-practical-examples/).


## Thanks

Thanks so much to @froboy and his inspiring measurements in https://gist.github.com/froboy/f237bf62cfde5350c0849c6e9aab0c71
