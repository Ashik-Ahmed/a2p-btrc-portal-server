const { createNewUserService, getAllUserService, getUserByIdService, deleteUserByIdService, updateUserByIdService, userLoginService } = require("../services/user.service")
const bcrypt = require("bcrypt");

exports.createNewUser = async (req, res) => {
    try {
        const userData = req.body;
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        const newUser = await createNewUserService(userData);

        if (newUser) {
            res.status(200).json({
                status: "Success",
                data: newUser
            })
        }
        else {
            res.status(400).json({
                status: "Failed",
                message: "User creation failed"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const getAllUser = await getAllUserService(req.body);

        if (getAllUser) {
            res.status(200).json({
                status: "Success",
                data: getAllUser
            })
        }
        else {
            res.status(400).json({
                status: "Failed",
                message: "No user found"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await getUserByIdService(req.params.id);

        if (user) {
            res.status(200).json({
                status: "Success",
                data: user
            })
        }
        else {
            res.status(400).json({
                status: "Failed",
                message: "No user found"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

exports.updateUserById = async (req, res) => {
    try {
        console.log(req.params.id, req.body);
        const result = await updateUserByIdService(req.params.id, req.body);
        if (result?.rowCount > 0) {
            res.status(200).json({
                status: "Success",
                data: {
                    command: result.command,
                    rowCount: result.rowCount
                }
            })
        }
        else {
            res.status(400).json({
                status: "Failed",
                message: "No user found"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        const result = await deleteUserByIdService(req.params.id);

        if (result?.rowCount > 0) {
            res.status(200).json({
                status: "Success",
                data: {
                    command: result.command,
                    rowCount: result.rowCount
                }
            })
        }
        else {
            res.status(400).json({
                status: "Failed",
                message: "No user found"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.status(401).json({
                status: 'Failed',
                error: 'please provide email and password'
            })
        }

        const user = await userLoginService(email);


        if (user) {

            // remove password and address field
            const { password: pwd, address: addr, ...others } = user;
            console.log(others);

            // compare password
            const isPasswordMatched = await bcrypt.compare(password, user.password);

            if (isPasswordMatched) {
                res.status(200).json({
                    status: "Success",
                    data: others
                })
            }
            else {
                res.status(400).json({
                    status: "Failed",
                    message: "Wrong Password"
                })
            }
        }
        else {
            res.status(400).json({
                status: "Failed",
                message: "No user found"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}