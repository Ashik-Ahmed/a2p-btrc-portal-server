const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { getReportByMSISDN, getCliDetailsReport, getIpDetailsReport, getA2PDetailsReport } = require('../controllers/detsilsReport.controller');

const router = express.Router();

router.route("/a2pDetailsReport")
    .get(verifyToken, getA2PDetailsReport)

router.route("/msisdn")
    .get(verifyToken, getReportByMSISDN)

router.route("/cliDetailsReport")
    .get(verifyToken, getCliDetailsReport)

router.route("/ipDetailsReport")
    .get(verifyToken, getIpDetailsReport)



module.exports = router;