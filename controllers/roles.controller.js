const { createNewRoleService, getAllRoleService, getRoleByIdService, updateRoleByIdService, deleteRoleByIdService, getAllPageService, createPageService, deletePageByIdService, updatePageByIdService } = require("../services/roles.service");

exports.createNewRole = async (req, res) => {
    try {
        const roleData = req.body;

        const newRole = await createNewRoleService(roleData);
        console.log(newRole);
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


exports.deleteRoleById = async (req, res) => {
    try {
        const result = await deleteRoleByIdService(req.params.id);

        if (result?.rowCount > 0) {
            res.status(200).json({
                status: "Success",
                data: result
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


exports.createPage = async (req, res) => {
    try {
        const pageData = req.body;
        const result = await createPageService(pageData);

        if (result?.page_id > 0) {
            res.status(200).json({
                status: "Success",
                data: result
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

exports.getAllPage = async (req, res) => {


    function transformData(rows) {
        const groupedData = {};

        rows.forEach(row => {
            // Initialize group_label if not already present
            if (!groupedData[row.group_label]) {
                groupedData[row.group_label] = [];
            }

            // If the row has no parent_id, it's a top-level item
            if (row.parent_id === null) {
                groupedData[row.group_label].push({
                    ...row,
                    children: []
                });
            } else {
                // Find the parent item and add it to its children
                const parent = groupedData[row.group_label].find(item => item.page_id === row.parent_id);
                if (parent) {
                    parent.children.push(row);
                }
            }
        });

        return groupedData;
    }

    try {

        const pages = await getAllPageService(req.body);

        if (pages.length > 0) {
            res.status(200).json({
                status: "Success",
                data: transformData(pages)
            })
        }
        else {
            res.status(400).json({
                status: "Failed",
                message: "No page found"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

exports.updatePageById = async (req, res) => {
    try {
        const result = await updatePageByIdService(req.params.id, req.body);

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

exports.deletePageById = async (req, res) => {
    try {
        const result = await deletePageByIdService(req.params.id);

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