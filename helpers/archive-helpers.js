var fs = require('fs');
var http = require("http");
var path = require('path');
var _ = require('underscore');
var utility = require('../web/utility');
var httpWrap = require('http-request')

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

exports.readListOfUrls = function(callback) {
  var text;
  var read = fs.createReadStream(exports.paths.list);
  utility.collectData(read, function (readData) {
    text = readData;
    var arr = text.split('\n');
    callback(arr)
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function (urlArray) {
    callback( urlArray.indexOf(url) !== -1 ); 
  })
};

exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(url, function (inList) {
    if ( !inList ) {
      fs.appendFile(exports.paths.list, url + ('\n'), callback);
    }
  })
};

exports.isUrlArchived = function(url, callback, index) {
  fs.exists(url, function (exists) {
    callback(exists, url);
  })
};

exports.downloadUrls = function(urlArr) {
  for ( var i = 0; i < urlArr.length-1; i++ ) { //port: 8080};
    var url = urlArr[i];
    exports.isUrlArchived(url, function (isArchived, url) {
      if ( !isArchived ) {
        //DOWNLOAD THE URL, SO EASY, DUH

        httpWrap.get(url, function (err, res) {
          if(err || res.code === 404) {
            console.log("I can't do that john");
          } else {
            fs.writeFile(path.join(exports.paths.archivedSites, url), res.buffer.toString())
          }

        });

      } 

    })
  }

};

