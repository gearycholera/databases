var db = require('../db');

module.exports = {
  messages: {// a function which produces all the messages
    get: function () {
      var queryString = 'SELECT users.username,messages.message FROM users,messages WHERE users.userID = messages.userID;';
      var rows = [];
     // db.con.connect();
      db.con.query(queryString, function(err, results) { 
        if (err) {
          console.log('error received'); 
        } else {
          console.log('SUCCESS');
          console.log('RESULTS-----'+JSON.stringify(results));
          for (var i = 0; i < results.length; i++) {
            rows.push(results[i]);
          }
        }
      });
      //db.con.end();
      return rows;
    }, 
 
    post: function (userID, message, roomnameID) {
      // check roomname if it exists already
      // if value at index already exists
      var queryString = 'INSERT INTO messages VALUES (' + userID + ',' + message + ',' + roomnameID + ');';

      db.con.query(queryString, function(err) { 
        if (err) {
          console.log('error received'); 
        } else {
          console.log('SUCCESS');
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

