const dotenv = require('dotenv').config();
const colors = require('colors');


const app = require('./app');
const { client } = require('./dbConnection');
const { client2 } = require('./dbConnection');


client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Connection error', err));

client2.connect()
    .then(() => console.log('Connected to the database-2'))
    .catch(err => console.error('Connection error db-2', err));


//server
const port = process.env.PORT || 8080;

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port: ${port}`.yellow.bold);
})