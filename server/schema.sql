CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  roomname varchar(255) NOT NULL
);

CREATE TABLE users (
  userID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(15) NOT NULL
);

CREATE TABLE messages (
  msgID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userID int NOT NULL,
  message varchar(255) NOT NULL,
  roomnameID int NOT NULL,
  FOREIGN KEY (roomnameID) REFERENCES rooms(id),
  FOREIGN KEY (userID) REFERENCES users(userID)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

