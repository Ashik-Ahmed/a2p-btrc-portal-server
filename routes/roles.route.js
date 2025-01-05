const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { createNewRoleService, getAllRoleService } = require('../services/roles.service');
const { getRoleById } = require('../controllers/roles.controller');

const router = express.Router();



router.route('/')
    .post(verifyToken, createNewRoleService)
    .get(verifyToken, getAllRoleService)


router.route('/:id')
    .get(verifyToken, getRoleById)



module.exports = router;