const { createNewUserService, getAllUserService } = require("../services/user.service")

exports.createNewUser = async (req, res) => {
    try {
        const newUser = await createNewUserService(req.body);

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