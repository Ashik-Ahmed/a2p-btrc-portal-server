const dotenv = require('dotenv').config();
const colors = require('colors');


const app = require('./app');
const client = require('./dbConnection');


client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Connection error', err));


//server
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`.yellow.bold);
})