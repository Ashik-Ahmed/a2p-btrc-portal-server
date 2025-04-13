const express = require('express');
const { createNewUser, getAllUser, getUserById, deleteUserById, updateUserById, userLogin, updatePasswordById, getSidebar } = require('../controllers/user.controller');
const verifyToken = require('../middleware/verifyToken');


const router = express.Router();

router.route('/login')
    .post(userLogin)

router.route('/sidebar/:id')
    .get(verifyToken, getSidebar)

router.route('/updatePassword/:id')
    .patch(verifyToken, updatePasswordById)


router.route('/')
    .post(verifyToken, createNewUser)
    .get(verifyToken, getAllUser)

router.route('/:id')
    .get(verifyToken, getUserById)
    .patch(verifyToken, updateUserById)
    .delete(verifyToken, deleteUserById)


module.exports = router;