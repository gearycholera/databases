var models = require('../models');
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var headers = defaultCorsHeaders;
var statusCode = 200;
var storage = {results: [{"username":"louis","message":"test"}]};
headers['Content-Type'] = 'application/json';
module.exports = {
  messages: { // a function which handles a get request for all messages
    get: function (req, res) { 
      res.writeHead(200, headers);
      res.end(JSON.stringify(storage));
    },
    post: function (req, res) {
      res.writeHead(201, headers);
      var data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', function() {
        var parsed = JSON.parse(data);
        console.log('ppppp'+JSON.stringify(parsed)); // CONVERT THIS AND QUERY IT PROPERLY
        res.end(JSON.stringify(storage)); 
      });
    }
  },
  // a function which handles posting a message to the database

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

