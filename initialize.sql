CREATE DATABASE study_record;
USE study_record;

CREATE TABLE study_record (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_time DATETIME,
    end_time DATETIME,
	measured_time TIME,
	content text
);
