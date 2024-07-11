const express = require('express');
const app = express();
const cors = require('cors');


//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Server is Running!!')
    console.log('api hit');
})


const userRoute = require('./routes/user.route');
const dashboardRoute = require('./routes/dashboard.route');
const reportRoute = require('./routes/report.route');
const othersRoute = require('./routes/others.route');


app.use('/api/v1/user', userRoute);
app.use('/api/v1/dashboard', dashboardRoute);
app.use('/api/v1/report', reportRoute);
app.use('/api/v1/others', othersRoute);


module.exports = app;