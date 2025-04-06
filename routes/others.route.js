const express = require('express');
const { getCliList, getAggregatorList, getANSList, getCliFromCliTable, getDailyDippingReport } = require('../controllers/others.controller');
const verifyToken = require('../middleware/verifyToken');


const router = express.Router();


router.route('/aggregatorList')
    .get(verifyToken, getAggregatorList)

router.route('/ansList')
    .get(verifyToken, getANSList)

router.route('/cliList')
    .get(verifyToken, getCliList)

router.route('/clifromclitable')
    .get(verifyToken, getCliFromCliTable)

router.route('/dailyDippingReport')
    .get(verifyToken, getDailyDippingReport)

module.exports = router