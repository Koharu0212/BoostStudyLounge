CREATE DATABASE users;
USE users;

CREATE TABLE users (
  user_id int NOT NULL AUTO_INCREMENT PRIMARY  KEY,
  username varchar(20) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  password varchar(60) DEFAULT NULL
);

CREATE DATABASE study_record;
USE study_record;

CREATE TABLE study_record (
    id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
    study_date DATE NOT NULL,
	measurement_time TIME NOT NULL,
	content text NOT NULL
);
