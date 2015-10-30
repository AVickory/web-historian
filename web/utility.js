fs = require('fs')

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  // 'Content-Type': "text/html"
};

exports.sendResponse = function (res, data, statusCode, contentType) {
  headers['Content-Type'] = contentType ? contentType : "text/html";
  // headers = headers || defaultHeaders;
  statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(data)
}

exports.sendFile = function (res, filePath, statusCode, contentType) {
  headers['Content-Type'] = contentType ? contentType : "text/html";
  // headers = headers || defaultHeaders;
  statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  var file = fs.createReadStream(filePath)
  var body = ''
  file.on('data', function (data) {
    body += data;
  });
  file.on('end', function () {
    res.end(body);
  })
  
  // console.log('BODY', res.body);
  // res.end();
}

exports.collectData = function (dataStream, callback) {
  var rawData = '';
  dataStream.on('data', function (data) {
    rawData += data;
  });
  dataStream.on('end', function () {
    return callback(rawData);
  });
}

// exports.collectData2 = function (dataStream, res, callback) {
//   var rawData = '';
//   dataStream.on('data', function (data) {
//     res.write(data);
//   });
//   dataStream.on('end', function () {
//     console.log('utility callback thing ',rawData);
//     return callback(rawData);
//   });
// }
