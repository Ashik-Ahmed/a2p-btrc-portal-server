const { createNewRoleService, getAllRoleService, getRoleByIdService, updateRoleByIdService } = require("../services/roles.service");

exports.createNewRole = async (req, res) => {
    try {
        const roleData = req.body;

        const newRole = await createNewRoleService(roleData);

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

exports.getAllRole = async (req, res) => {
    try {
        const roles = await getAllRoleService(req.body);

        if (roles) {
            res.status(200).json({
                status: "Success",
                data: roles,
            })
        }
        else {
            res.status(400).json({
                status: "Failed",
                message: "No role found"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}


exports.getRoleById = async (req, res) => {
    try {
        const role = await getRoleByIdService(req.params.id);
        if (role?.role_id) {
            res.status(200).json({
                status: "Success",
                data: role,
            })
        }
        else {
            res.status(400).json({
                status: "Failed",
                message: "No role found"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

exports.updateRoleById = async (req, res) => {
    try {
        const result = await updateRoleByIdService(req.params.id, req.body);
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
                message: "No role found"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}