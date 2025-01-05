const { createNewRoleService } = require("../services/roles.service");

exports.createNewRole = (req, res) => {
    try {
        const roleData = req.body;

        const newRole = createNewRoleService(roleData);

        if (newRole) {
            res.status(200).json({
                status: "Success",
                data: newRole
            })
        }
        else {
            res.status(400).json({
                status: "Failed",
                message: "Failed! Please try again"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}