-- @block
CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    bio TEXT,
    regNumber INT UNIQUE
);
-- @block
INSERT INTO Users (name,email, regNumber )
VALUES(
    'Victor Obiano',
    'obianovictor11@gmail.com',
    2023364000
)


-- @block
INSERT INTO Users (name,email, regNumber )
VALUES(
    'miracle',
    'obiekwem@gmail.com',
    2023264156
)

DELETE FROM Users
        WHERE id = 25;



SELECT * FROM authUsers;