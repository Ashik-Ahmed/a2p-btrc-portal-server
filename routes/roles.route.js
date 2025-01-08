const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { getRoleById, getAllRole, createNewRole, updateRoleById, deleteRoleById, getAllPage, createPage } = require('../controllers/roles.controller');

const router = express.Router();



router.route('/pages')
    .post(verifyToken, createPage)
    .get(verifyToken, getAllPage)

router.route('/')
    .post(verifyToken, createNewRole)
    .get(verifyToken, getAllRole)


router.route('/:id')
    .get(verifyToken, getRoleById)
    .patch(verifyToken, updateRoleById)
    .delete(verifyToken, deleteRoleById)



module.exports = router;