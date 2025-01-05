const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { createNewRoleService, getAllRoleService } = require('../services/roles.service');

const router = express.Router();



router.route('/')
    .post(verifyToken, createNewRoleService)
    .get(verifyToken, getAllRoleService)
