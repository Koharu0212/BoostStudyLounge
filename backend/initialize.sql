CREATE DATABASE boost_study_lounge;
CREATE TABLE users (
  user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username varchar(20) UNIQUE NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  password varchar(60) UNIQUE NOT NULL
);

CREATE TABLE study_record (
  id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  study_date DATE NOT NULL,
	measurement_time TIME NOT NULL,
	content text NOT NULL
);

CREATE TABLE seats (
  id INT PRIMARY KEY AUTO_INCREMENT,
  seat_number INT UNIQUE,
  user_id INT
);
INSERT INTO seats (seat_number, user_id) VALUES (1, 0),(2, 0),(3, 0),(4, 0),(5, 0),(6, 0),(7, 0),(8, 0),(9, 0),(10, 0),(11, 0),(12, 0),(13, 0),(14, 0),(15, 0),(16, 0),(17, 0),(18, 0),(19, 0),(20, 0),(21, 0),(22, 0),(23, 0),(24, 0),(25, 0);