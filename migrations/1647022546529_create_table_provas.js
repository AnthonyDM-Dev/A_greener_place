module.exports = {
    "up": "CREATE TABLE reports (id INT NOT NULL, PRIMARY KEY id (id), username VARCHAR(35) NOT NULL, state VARCHAR(60) NOT NULL, city VARCHAR(60) NOT NULL, address VARCHAR(200) NOT NULL, streetNumber VARCHAR(10), date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, pollutionStatus VARCHAR(30), image VARCHAR(255))",
    "down": "DROP TABLE reports"
};