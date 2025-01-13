const express = require('express');
const { getTopAggregator, getTopANS, getDashboardMonthlyData } = require('../controllers/dashboard.controller');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();


router.route('/monthlyData')
    .get(verifyToken, getDashboardMonthlyData)

router.route('/topAggregator')
    .get(verifyToken, getTopAggregator)

router.route('/topANS')
    .get(verifyToken, getTopANS)


module.exports = router