const express = require('express');
const { createNewUser, getAllUser, getUserById, deleteUserById, updateUserById, userLogin } = require('../controllers/user.controller');


const router = express.Router();

router.route('/login')
    .post(userLogin)

router.route('/')
    .post(createNewUser)
    .get(getAllUser)

router.route('/:id')
    .get(getUserById)
    // .patch(updateUserById)
    .delete(deleteUserById)


module.exports = router;