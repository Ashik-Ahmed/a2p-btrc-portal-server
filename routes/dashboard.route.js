const express = require('express');
const { getDashboardWeeklyData, getTopAggregator } = require('../controllers/dashboard.controller');

const router = express.Router();


router.route('/weeklyData')
    .get(getDashboardWeeklyData)

router.route('/topAggregator')
    .get(getTopAggregator)


module.exports = router