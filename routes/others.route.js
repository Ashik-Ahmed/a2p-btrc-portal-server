const express = require('express');
const { getCliList, getAggregatorList, getANSList } = require('../controllers/others.controller');
const verifyToken = require('../middleware/verifyToken');


const router = express.Router();


router.route('/aggregatorList')
    .get(verifyToken, getAggregatorList)


router.route('/ansList')
    .get(verifyToken, getANSList)

router.route('/cliList')
    .get(verifyToken, getCliList)

module.exports = router