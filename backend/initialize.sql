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

INSERT INTO study_records (user_id, start_date, end_date, measurement_time, contents)
VALUES (10, '2023-09-14 10:00:00', '2023-09-14 12:00:00', 7200, '英語の勉強'),
(10, '2024-08-01 10:00:00', '2024-08-01 12:30:00', 10000 , '数学の勉強'),
(10, '2024-09-10 10:00:00', '2024-09-10 12:00:00', 7200 , 'プログラミング');

CREATE TABLE seats (
  id INT PRIMARY KEY AUTO_INCREMENT,
  seat_number INT UNIQUE,
  user_id INT
);
INSERT INTO seats (seat_number, user_id) VALUES (1, 0),(2, 0),(3, 0),(4, 0),(5, 0),(6, 0),(7, 0),(8, 0),(9, 0),(10, 0),(11, 0),(12, 0),(13, 0),(14, 0),(15, 0),(16, 0),(17, 0),(18, 0),(19, 0),(20, 0),(21, 0),(22, 0),(23, 0),(24, 0),(25, 0);