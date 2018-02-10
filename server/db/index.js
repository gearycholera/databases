var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "student", password 'student',
// and to the database "chat".
exports.con = mysql.createConnection({
  database: 'chat',
  user: 'student',
  password: 'student'
});
