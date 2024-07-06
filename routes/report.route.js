const express = require('express');
const { getSummaryReport } = require('../controllers/report.controller');


const router = express.Router();


router.route('/summaryReport')
    .get(getSummaryReport)

module.exports = router