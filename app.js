const express = require('express');
const app = express();
const cors = require('cors');


//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Server is Running!!')
})


const userRoute = require('./routes/user.route');
const dashboardRoute = require('./routes/dashboard.route');
const summaryReportRoute = require('./routes/summaryReport.route');
const dippingReportRoute = require('./routes/dippingReport.route');
const detailsReportRoute = require('./routes/detailsReport.route')
const roleRoute = require('./routes/roles.route');
const othersRoute = require('./routes/others.route');


app.use('/api/v1/user', userRoute);
app.use('/api/v1/dashboard', dashboardRoute);
app.use('/api/v1/summaryReport', summaryReportRoute);
app.use('/api/v1/dippingReport', dippingReportRoute);
app.use('/api/v1/detailsReport', detailsReportRoute);
app.use('/api/v1/roles', roleRoute);
app.use('/api/v1/others', othersRoute);

module.exports = app;