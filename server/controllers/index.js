var models = require('../models');
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var headers = defaultCorsHeaders;
var statusCode = 200;

module.exports = {
  messages: { // a function which handles a get request for all messages
    get: function (req, res) { 
      var rows = models.messages.get();
      console.log('++++++++++'+rows);
      res.end(JSON.stringify(rows));
    },
    post: function (req, res) {
      

    },
    options: function (req, res) {
    
    }
  },
// a function which handles posting a message to the database

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

