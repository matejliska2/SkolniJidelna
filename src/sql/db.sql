create database hodnoceni_obedu;
use hodnoceni_obedu;

CREATE TABLE Lunches(
    id INT PRIMARY KEY AUTO_INCREMENT,
    lunch_date DATE NOT NULL,
    content VARCHAR(100) NOT NULL
);

CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Reviews(
    id INT PRIMARY KEY AUTO_INCREMENT,
    lunch_id INT NOT NULL,
    user_id INT NOT NULL,
    cook_soup ENUM('yes', 'no') NOT NULL,
    cook_food ENUM('yes', 'no') NOT NULL,
    cook_dessert ENUM('yes', 'no') NOT NULL,
    pay INT NOT NULL CHECK(pay >= 0 AND pay <= 200),
    portion_size ENUM('small', 'enough', 'too much') NOT NULL,
    temperature ENUM('cold', 'optimal', 'hot') NOT NULL,
    look ENUM('bad', 'okay', 'good') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(lunch_id) REFERENCES Lunches(id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Comments(
    id INT PRIMARY KEY AUTO_INCREMENT,
    lunch_id INT NOT NULL,
    user_id INT NOT NULL,
    content VARCHAR(255),
    profanity ENUM('yes', 'no') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY(lunch_id) REFERENCES Lunches(id) ON DELETE CASCADE
);