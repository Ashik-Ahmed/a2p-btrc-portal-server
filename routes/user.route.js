const express = require('express');
const { createNewUser, getAllUser } = require('../controllers/user.controller');


const router = express.Router();

router.route('/')
    .post(createNewUser)
    .get(getAllUser)


module.exports = router;