-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS smart_university;
USE smart_university;

-- Drop tables if they exist to avoid errors during creation
DROP TABLE IF EXISTS queues;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS students;

-- Unified Users table supporting roles
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student',
    roll VARCHAR(50),
    department VARCHAR(100),
    year VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Queues table to track tokens
CREATE TABLE queues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    department ENUM('registrar', 'transport', 'dean', 'canteen') NOT NULL,
    token_number VARCHAR(20) NOT NULL,
    status ENUM('waiting', 'serving', 'completed', 'cancelled') DEFAULT 'waiting',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
