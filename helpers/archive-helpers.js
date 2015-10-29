var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var utility = require('../web/utility');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */





exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};


// var urlArr = {};
// var text = '';
// var read = fs.createReadStream(exports.paths.list, {autoClose: false})
// read.on('data', function (data) {
//   text += data.toString();
//   sliceIndex = text.indexOf('\n')
//   while(sliceIndex !== -1) {
//     urlArr[text.slice(0, sliceIndex)] = true;
//     console.log(text.slice(0, sliceIndex))
//     text = text.slice(sliceIndex+1, text.length);
//     sliceIndex = text.indexOf('\n')
//   }
// })

// var write = fs.createWriteStream(exports.paths.list)

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function() {
  // return urlArr.slice();
};

exports.isUrlInList = function(url) {
  // return urlArr[url] !== undefined;
};

exports.addUrlToList = function() {

};

exports.isUrlArchived = function(url) {
  var foundIt = false;
  fs.exists(url, function (exists) {
    foundIt = exists
  })
  return foundIt;
};

exports.downloadUrls = function() {
};

