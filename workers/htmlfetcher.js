archive = require('../helpers/archive-helpers');
// cron = require('cron');

archive.readListOfUrls(function (urlArr) {
  archive.downloadUrls(urlArr);
});

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
