CREATE DATABASE users;
USE users;
CREATE TABLE users (
  user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username varchar(20) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  password varchar(60) DEFAULT NULL
);

CREATE DATABASE study_record;
USE study_record;
CREATE TABLE study_record (
  id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT NOT NULL,
  study_date DATE NOT NULL,
	measurement_time TIME NOT NULL,
	content text NOT NULL
);

CREATE DATABASE seats;
USE seats;
CREATE TABLE seats (
  id INT PRIMARY KEY AUTO_INCREMENT,
  seat_number INT UNIQUE,
  user_id INT
);
INSERT INTO seats (seat_number) VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),(21),(22),(23),(24),(25);