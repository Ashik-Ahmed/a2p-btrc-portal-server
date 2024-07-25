const express = require('express');
const { getReportByMSISDN } = require('../controllers/detsilsReport.controller');

const router = express.Router();

router.route("/msisdn")
    .get(getReportByMSISDN)



module.exports = router;