const express = require('express');
const { getSummaryReport, datewiseReport, aggregatorwiseReport } = require('../controllers/report.controller');
const verifyToken = require('../middleware/verifyToken');


const router = express.Router();


router.route('/a2pSummaryReport')
    .get(verifyToken, getSummaryReport)

router.route('/datewiseReport')
    .get(verifyToken, datewiseReport)

router.route('/aggregatorwiseReport')
    .get(verifyToken, aggregatorwiseReport)

module.exports = router