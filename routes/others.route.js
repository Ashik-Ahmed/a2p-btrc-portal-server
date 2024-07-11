const express = require('express');
const { getCliList } = require('../controllers/others.controller');


const router = express.Router();


router.route('/')
    .get(getCliList)

module.exports = router