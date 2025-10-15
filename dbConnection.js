const { Client } = require("pg");

// database connection 
const client = new Client({
    host: process.env.DATABASE_SERVER_IP,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT, // Default PostgreSQL port
});

const client2 = new Client({
    host: process.env.DATABASE2_SERVER_IP,
    user: process.env.DATABASE2_USER,
    password: process.env.DATABASE2_PASSWORD,
    database: process.env.DATABASE2_NAME,
    port: process.env.DATABASE2_PORT, // Default PostgreSQL port
});

module.exports = { client, client2 };