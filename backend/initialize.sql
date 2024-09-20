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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE seats (
  seat_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
INSERT INTO seats (seat_id, user_id) VALUES (1, NULL),(2, NULL),(3, NULL),(4, NULL),(5, NULL),(6, NULL),(7, NULL),(8, NULL),(9, NULL),(10, NULL),(11, NULL),(12, NULL),(13, NULL),(14, NULL),(15, NULL),(16, NULL),(17, NULL),(18, NULL),(19, NULL),(20, NULL),(21, NULL),(22, NULL),(23, NULL),(24, NULL),(25, NULL);