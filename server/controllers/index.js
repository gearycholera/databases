var models = require('../models');
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var headers = defaultCorsHeaders;
var statusCode = 200;
var storage = {results: []};
headers['Content-Type'] = 'application/json';

models.messages.get(function(data) {
  storage.results = data;
});

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
        var setPost = new Promise(function(resolve, reject){
          models.messages.post(parsed.username, parsed.roomname, parsed.message);
          resolve();
        });
        var setPage = new Promise(function(resolve, reject){
          models.messages.get(function(data) {
            storage.results = data;
            resolve();
          });
        });
        Promise.all([setPost, setPage]).then(function(results){
          res.end(JSON.stringify(storage)); 
        });
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

