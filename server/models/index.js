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
 
    post: function (username, roomname, message) {
      // check roomname if it exists already
      // if value at index already exists
      var userCheckQuery = "SELECT userID FROM users WHERE users.username = '" + username + "';";
      var userID;
      var roomID;

      var roomCheckQuery = "SELECT id FROM rooms WHERE rooms.roomname = '" + roomname + "';";

      var setRoom = new Promise(function(resolve,reject){
        db.con.query(roomCheckQuery, function(err, result) {
          if (err) {
            console.log('room error1 received'); 
          } else if (result.length > 0) {
            if (result) {
              roomID = result[0]['id'];
              resolve(roomID);
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
                    roomID = result[0]['id'];
                    resolve(roomID);
                  }
                });
              }
            });
          }
        });
      });

      var setUser = new Promise(function(resolve,reject){
        db.con.query(userCheckQuery, function(err, result) {
          if (err) {
            console.log('error received 11 111111 1'); 
          } else if (result.length > 0) {
            if (result) {
              userID = result[0]['userID'];
              resolve(userID);
            }
          } else {
            console.log('inserting user cause it hasnt been found');
            db.con.query("INSERT INTO users VALUES (0,'" + username +"');", function(err, result) {
              if (err) {
                console.log('error received2'); 
              } else {
                db.con.query(userCheckQuery, function(err,result) {
                  if (err) {
                    console.log('error');
                  } else {
                    userID = result[0]['userID'];
                    resolve(userID);
                  }
                });
              }
            });
          }
        });

      });

      Promise.all([setRoom, setUser]).then(function(results){
        var messageQuery = "INSERT INTO messages VALUES (0," + results[1] + ", '" + message + "'," + results[0] + ");";
        console.log('msg'+messageQuery);
        db.con.query(messageQuery, function(err, result) {
          if (err) {
            console.log('userID: ' +userID);
            console.log('roomID: ' +roomID);
            console.log('msg error1 received'); 
          } else {
            console.log('message added to db');
          }
        });
      });


/**/
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

