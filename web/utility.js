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

exports.collectData = function (dataStream, callback) {
  var rawData = '';
  dataStream.on('data', function (data) {
    rawData += data
  });
  dataStream.on('end', function () {
    console.log('utility callback thing ',rawData);
    return callback(rawData);
  });
}
