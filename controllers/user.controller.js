const { createNewUserService, getAllUserService, getUserByIdService, deleteUserByIdService, updateUserByIdService, userLoginService, updatePasswordByIdService } = require("../services/user.service")
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

exports.createNewUser = async (req, res) => {
    try {
        const userData = req.body;

        // if password not provided set default password
        if (!userData.password) {
            userData.password = '12345678';
        }
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
        const users = await getAllUserService(req.body);

        if (users) {
            res.status(200).json({
                status: "Success",
                data: users
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

        const { password, ...others } = user

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

exports.updatePasswordById = async (req, res) => {
    console.log(req.params, req.body);
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(401).json({
                status: "Failed",
                message: "Please provide current password and new password"
            })
        }

        if (newPassword.length < 8) {
            return res.status(402).json({
                status: "Failed",
                message: "Password must be at least 8 characters long"
            })
        }

        const user = await getUserByIdService(id);
        if (!user) {
            return res.status(403).json({
                status: "Failed",
                message: "No user found"
            })
        }
        // console.log(password, user);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(405).json({
                status: "Failed",
                message: "Current password didn't match"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const result = await updatePasswordByIdService(id, hashedPassword);
        if (result?.rowCount > 0) {
            return res.status(200).json({
                status: "Success",
                data: {
                    command: result.command,
                    rowCount: result.rowCount
                }
            })
        }
        else {
            return res.status(400).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

exports.updateUserById = async (req, res) => {
    // console.log(req.params.id, req.body);
    try {
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
    // console.log(req.body);
    try {
        const { email, password } = req.body;
        // console.log(email, password);
        if (!email || !password) {
            return res.status(401).json({
                status: 'Failed',
                error: 'please provide email and password'
            })
        }

        const user = await userLoginService(email);

        if (user?.user_id) {

            // remove password and address field
            const { password: pwd, address: addr, ...others } = user;

            // compare password
            const isPasswordMatched = await bcrypt.compare(password, user.password);

            if (isPasswordMatched) {
                // generate token
                const token = generateToken(others);
                res.status(200).json({
                    status: "Success",
                    data: {
                        ...others,
                        accessToken: token
                    }
                })

                // update user last login time
                // await updateUserByIdService(user.user_id, { last_login: new Date() });

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
        console.log(error);
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}