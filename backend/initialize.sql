CREATE DATABASE boost_study_lounge;
CREATE TABLE users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(60) UNIQUE NOT NULL
);

CREATE TABLE study_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    measurement_time INT NOT NULL,
    contents VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE seats (
  id INT PRIMARY KEY AUTO_INCREMENT,
  seat_number INT UNIQUE,
  user_id INT
);
INSERT INTO seats (seat_number, user_id) VALUES (1, 0),(2, 0),(3, 0),(4, 0),(5, 0),(6, 0),(7, 0),(8, 0),(9, 0),(10, 0),(11, 0),(12, 0),(13, 0),(14, 0),(15, 0),(16, 0),(17, 0),(18, 0),(19, 0),(20, 0),(21, 0),(22, 0),(23, 0),(24, 0),(25, 0);