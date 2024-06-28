const { Client } = require("pg");

// database connection 
const client = new Client({
    host: process.env.DATABASE_SERVER_IP,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT, // Default PostgreSQL port
});

module.exports = client;