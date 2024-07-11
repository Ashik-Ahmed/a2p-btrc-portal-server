const { getCliListService } = require("../services/others.service");

exports.getCliList = async (req, res) => {
    try {
        const cliList = await getCliListService();
        if (cliList) {
            res.status(200).json({
                status: "Success",
                data: cliList
            })
        }

        else {
            res.status(400).json({
                status: "Failed",
                message: "No data found"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}