const { getCliListService } = require("../services/others.service");

exports.getCliList = async (req, res) => {
    try {
        const filter = JSON.parse(req?.query?.filter) || {};
        const cliList = await getCliListService(filter);
        // console.log(cliList);
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
        // console.log(error);
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}