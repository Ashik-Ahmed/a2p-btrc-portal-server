const express = require('express');
const { getReportByMSISDN } = require('../controllers/detsilsReport.controller');

const router = express.Router();

router.route("/msisdn/:id")
    .get(getReportByMSISDN)



module.exports = router;