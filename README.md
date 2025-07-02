# ddev-puppeteer

Simple Puppeteer script for measuring DDEV performance.

This tries to use a DDEV Drupal 11 project as a measure of performance using a web install of the `demo_umami` profile.

* Make sure you have installed `chromium` somehow, and `export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true`.
* If you don't have it installed, use `sudo apt install chromium-browser` or `brew install chromium` or whatever is appropriate for your system. On Apple Silicon, `brew install chromium --no-quarantine` (see [blog](https://www.broddin.be/fixing-the-chromium-binary-is-not-available-for-arm64/)). These are better than letting puppeteer download its own version of Chromium.
* Since you have manually installed `chromium`, `export PUPPETEER_EXECUTABLE_PATH="$(which chromium)"` to set the path to the chromium executable.
* Install with `npm init && npm i puppeteer async`.
* The project named in `ddev-puppeteer.js` should be a standard Drupal 11 install as per the [DDEV Drupal 11 quickstart](https://ddev.readthedocs.io/en/latest/users/quickstart/#drupal)
* Edit `site` and `sitedir` in `ddev-puppeteer.js`.
* Set up the project with Mutagen or Colima or whatever permutation you like.
* The project should already be running.
* Run the test with `node ddev-puppeteer.js`.

## Notes

* This is using the Drupal `demo_umami` profile, which takes longer than `standard`.
* The script resets php-fpm at the beginning to make sure we start without a PHP OPcache. This may or may not be fair.
* To see what’s happening in the install you can change `puppeteer.launch({headless: true})` to `puppeteer.launch({headless: false})`.
* The Drush install  is `ddev mysql -e "DROP DATABASE IF EXISTS db; CREATE DATABASE db;" && ddev exec killall -USR2 php-fpm && rm -rf web/sites/default/files/* && ddev mutagen sync && time ddev drush si demo_umami -y`
* Links:
  * Early measurements of performance with Mutagen on [ddev.com](https://ddev.com/ddev-local/supercharge-your-ddev-performance-with-mutagen/).
  * [November, 2023 DDEV performance measurements](https://ddev.com/blog/docker-performance-2023/)
  * [Puppeteer quickstart](https://pptr.dev/guides/getting-started)
  * [async docs](https://caolan.github.io/async/v3)
  * [Useful Puppeteer examples](https://nitayneeman.com/posts/getting-to-know-puppeteer-using-practical-examples/).


## Thanks

Thanks so much to @froboy and his inspiring measurements in https://gist.github.com/froboy/f237bf62cfde5350c0849c6e9aab0c71
