var fs = require('fs');
var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var utility = require('./utility');
// require more modules/folders here!

var actions =  {
  'GET': function (req, res) {
    //Serves websites if found
    //else 404

    console.log("Listening on http://" + "127.0.0.1" + ":" + 8080 + ' to ' + req.url);

    if (req.url === '/favicon.ico') {
      utility.sendResponse(res, null, 404);
      return "fuck favicon";
    }

    var file;
    var contentType;
    var filePath

    if(req.url === '/') {
      filePath = path.join(archive.paths.siteAssets, '/index.html');
    } else if(req.url === '/styles.css') {
      filePath = path.join(archive.paths.siteAssets, '/styles.css');
      contentType = 'text/css'
    } else {
      filePath = path.join(archive.paths.archivedSites, req.url);


      // contentType = 'application/json'
      // sendResponse(res, JSON.stringify(archive.isUrlArchived(filePath)), 200)
      if(!archive.isUrlArchived(filePath)) {
        utility.sendResponse(res, null, 404);
        return;
      }
    }

    file = fs.createReadStream(filePath)
    
    // console.log(url.parse(req.url))

      //console.log(html);
    utility.collectData(file, function (data) {
      utility.sendResponse(res, data, 200, contentType);
    });

    // utility.collectData2(file, res, function (data) {
    //   console.log('line 47',data)
    //   utility.sendResponse(res, null, 200, contentType);
    // });
        //utility.collectData(req, function (websiteUrl) {
          // if(archive.isUrlArchived(websiteUrl)) {
          //   //send the website
          // } else {
          //   //fuck yo couch/404
          // }
          //utility.sendResponse(res, data, 200, contentType);
        //})

    


  },
  'POST': function (req, res) {

    //take in request url
      //check if it's been downloaded
        // tell user where to look
      //else
        //put address on urlList
        //tell user to wait

  }
}


exports.handleRequest = function (req, res) {
  var action = actions[req.method];

  action(req, res)

  //res.end(archive.paths.list);
};
