CREATE DATABASE study_record;
USE study_record;

CREATE TABLE study_record (
    id INT AUTO_INCREMENT PRIMARY KEY,
    study_day DATE,
	measurement_time TIME,
	content text
);
