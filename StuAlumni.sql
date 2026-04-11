-- Auth table (credentials only (email & password))
CREATE TABLE authUsers (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--User profile table
CREATE TABLE Users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    auth_user_id INT(11) NOT NULL UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    regNumber BIGINT(20) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (auth_user_id)
        REFERENCES authUsers(id) ON DELETE CASCADE
);

-- Trigger to create user row on sign-up

CREATE TRIGGER after_auth_insert
AFTER INSERT ON authUsers
FOR EACH ROW
 INSERT INTO Users (auth_user_id)
 VALUES (NEW.id)
;

SELECT * FROM authUsers WHERE id = 2

SELECT * FROM Users;


SELECT name,COUNT(auth_user_id) FROM Users
GROUP BY name;