const express = require('express');
const { getSummaryReport, getCliSummaryReport } = require('../controllers/summaryReport.controller');
const verifyToken = require('../middleware/verifyToken');


const router = express.Router();


router.route('/a2pSummaryReport')
    .get(verifyToken, getSummaryReport)

router.route('/cliSummaryReport')
    .get(verifyToken, getCliSummaryReport)


module.exports = router