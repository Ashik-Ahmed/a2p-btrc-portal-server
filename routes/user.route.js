const express = require('express');
const { createNewUser, getAllUser, getUserById, deleteUserById, updateUserById, userLogin, updatePasswordById } = require('../controllers/user.controller');


const router = express.Router();

router.route('/login')
    .post(userLogin)

router.route('/updatePassword/:id')
    .patch(updatePasswordById)


router.route('/')
    .post(createNewUser)
    .get(getAllUser)

router.route('/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById)


module.exports = router;