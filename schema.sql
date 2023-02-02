DROP DATABASE IF EXISTS auth_app;
CREATE DATABASE auth_app;
USE auth_app;

DROP USER IF EXISTS 'auth_app_user'@'localhost';
CREATE USER 'auth_app_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'MyPassword1!';
GRANT ALL PRIVILEGES ON auth_app.* TO 'auth_app_user'@'localhost';

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  displayName VARCHAR(255) NOT NULL,
  profileImage VARCHAR(255)
);
