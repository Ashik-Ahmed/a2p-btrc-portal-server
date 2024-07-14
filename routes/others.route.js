const express = require('express');
const { getCliList, getAggregatorList } = require('../controllers/others.controller');


const router = express.Router();


router.route('/aggregatorList')
    .get(getAggregatorList)

router.route('/cliList')
    .get(getCliList)

module.exports = router