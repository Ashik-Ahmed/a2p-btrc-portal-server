const express = require('express');
const { getReportByMSISDN, getCliDetailsReport } = require('../controllers/detsilsReport.controller');

const router = express.Router();

router.route("/msisdn")
    .get(getReportByMSISDN)

router.route("/cliDetailsReport")
    .get(getCliDetailsReport)



module.exports = router;