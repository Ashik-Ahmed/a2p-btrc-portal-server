const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { getRoleById, getAllRole, createNewRole } = require('../controllers/roles.controller');

const router = express.Router();



router.route('/')
    .post(verifyToken, createNewRole)
    .get(verifyToken, getAllRole)


router.route('/:id')
    .get(verifyToken, getRoleById)



module.exports = router;