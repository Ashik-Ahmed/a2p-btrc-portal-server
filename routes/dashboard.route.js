const express = require('express');
const { getDashboardWeeklyData, getTopAggregator, getTopANS } = require('../controllers/dashboard.controller');

const router = express.Router();


router.route('/weeklyData')
    .get(getDashboardWeeklyData)

router.route('/topAggregator')
    .get(getTopAggregator)

router.route('/topANS')
    .get(getTopANS)


module.exports = router