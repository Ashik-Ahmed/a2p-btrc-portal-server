const express = require('express');
const { getDashboardWeeklyData, getTopAggregator, getTopANS } = require('../controllers/dashboard.controller');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();


router.route('/weeklyData')
    .get(verifyToken, getDashboardWeeklyData)

router.route('/topAggregator')
    .get(verifyToken, getTopAggregator)

router.route('/topANS')
    .get(verifyToken, getTopANS)


module.exports = router