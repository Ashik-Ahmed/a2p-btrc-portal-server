const express = require('express');
const { getSummaryReport } = require('../controllers/report.controller');


const router = express.Router();


router.route('/a2pSummaryReport')
    .get(getSummaryReport)

module.exports = router