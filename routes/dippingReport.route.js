const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { datewiseReport, aggregatorwiseReport, answiseReport, cliwiseReport } = require('../controllers/dippingReport.controller');


const router = express.Router();

router.route('/datewiseReport')
    .get(verifyToken, datewiseReport)

router.route('/aggregatorwiseReport')
    .get(verifyToken, aggregatorwiseReport)

router.route('/answiseReport')
    .get(verifyToken, answiseReport)

router.route('/cliwiseReport')
    .get(verifyToken, cliwiseReport)



module.exports = router