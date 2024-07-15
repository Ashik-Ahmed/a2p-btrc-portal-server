const express = require('express');
const { getSummaryReport } = require('../controllers/report.controller');
const verifyToken = require('../middleware/verifyToken');


const router = express.Router();


router.route('/a2pSummaryReport')
    .get(verifyToken, getSummaryReport)

module.exports = router