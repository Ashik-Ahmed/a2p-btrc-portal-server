const express = require('express');
const { getDashboardWeeklyData } = require('../controllers/dashboard.controller');

const router = express.Router();


router.route('/weeklyData')
    .get(getDashboardWeeklyData)


module.exports = router