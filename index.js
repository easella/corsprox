var http = require('http'),
    request = require('request'),
    url = require('url'),
    express=require('express')

var port = process.env.PORT || 8000,
    proxyURL = process.env.PROXY_URL || 'http://playminigames.ru/en/embed/the-yukon-trail/:80',
    allowOrigin = process.env.ALLOW_ORIGIN || '*',
    allowMethods = process.env.ALLOW_METHODS || '*',
    allowHeaders = process.env.ALLOW_HEADERS || 'X-Requested-With'

http.createServer(function (req, res) {
  var r = request(url.resolve(proxyURL, req.url));

  // Add CORS Headers
  r.on('response', function(_r) {
   
    _r.headers['Access-Control-Allow-Methods'] = allowMethods;
    _r.headers['Location']=url
    _r.headers['Access-Control-Allow-Headers'] = allowHeaders;
  });

  // Stream the response
  req.pipe(r).pipe(res);
}).listen(port);

console.log('Proxying ' + proxyURL + ' on port ' + port);
