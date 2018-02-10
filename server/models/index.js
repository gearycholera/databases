var db = require('../db');

module.exports = {
  messages: {// a function which produces all the messages
    get: function (callback) { 
      var queryString = 'SELECT users.username,messages.message,rooms.roomname FROM users,messages,rooms WHERE users.userID = messages.userID AND rooms.id = messages.roomnameID;';
      var rows = []; // ADD ROOMS TO THIS ^---------------------
      db.con.query(queryString, function(err, results) { 
        if (err) {
          console.log('error received//'); 
        } else {
          console.log('SUCCESS');
          console.log('RESULTS-----' + JSON.stringify(results));
          for (var i = 0; i < results.length; i++) {
            rows.push(results[i]);
          }
        }
      });
      callback(rows);
    }, 
 
    post: function (username, message, roomname) {
      // check roomname if it exists already
      // if value at index already exists
      var userCheckQuery = "SELECT userID FROM users WHERE users.username = '" + username + "';";
      var userID;
      var roomID;
      db.con.query(userCheckQuery, function(err, result) {
        if (err) {
          console.log('error received 11 111111 1'); 
        } else if (result.length > 0) {
          if (result) {
            console.log('______' + result);
            userID = result[0];
          } else {
            console.log('sup? WTF');
          }
        } else {
          console.log('inserting user cause it hasnt been found');
          db.con.query("INSERT INTO users VALUES (0,'" + username +"');", function(err, result) {
            if (err) {
              console.log('error received222222'); 
            } else {
              db.con.query(userCheckQuery, function(err,result) {
                if (err) {
                  console.log('error');
                } else {
                  console.log('updated users');
                  userID = result[0];
                }
              });
            }
          });
        }
      });

      var roomCheckQuery = "SELECT id FROM rooms WHERE rooms.roomname = '" + roomname + "';";
      db.con.query(roomCheckQuery, function(err, result) {
        if (err) {
          console.log('room error1 received'); 
        } else if (result.length > 0) {
          if (result) {
            console.log('______' + result);
            roomID = result[0];
          } else {
            console.log('sup room? WTF');
          }
        } else {
          console.log('inserting room cause it hasnt been found');
          db.con.query("INSERT INTO rooms VALUES (0,'" + roomname +"');", function(err, result) {
            if (err) {
              console.log('room error received2'); 
            } else {
              db.con.query(roomCheckQuery, function(err, result) {
                if (err) {
                  console.log('error');
                } else {
                  console.log('updated rooms');
                  roomID = result[0];
                }
              });
            }
          });
        }
      });
     // 

     // var queryString = 'INSERT INTO messages VALUES (' + username + ',' + message + ',' + roomname + ');';

     /* db.con.query(queryString, function(err) { 
        if (err) {
          console.log('error received3333333'); 
        } else {
          console.log('SUCCESS');
        }
      });*/
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

