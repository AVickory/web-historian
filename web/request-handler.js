var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var actions =  {
  'GET': function (req, res) {
    //Serves websites if found
    //else 404
  },
  'POST': function (req, res) {
    //take in request url
      //check if it's been downloaded
        // tell user where to look
      //else
        //put address on urlList
        //tell user to wait
    var url = 

  }
}


exports.handleRequest = function (req, res) {
  var action = actions(req.method);

  action(req, res)

  res.end(archive.paths.list);
};
