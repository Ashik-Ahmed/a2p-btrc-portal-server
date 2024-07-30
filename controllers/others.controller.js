const { getCliListService, getAggregatorListService, getANSListService } = require("../services/others.service");

exports.getAggregatorList = async (req, res) => {
    try {
        const aggregatorList = await getAggregatorListService();
        if (aggregatorList) {
            res.status(200).json({
                status: "Success",
                data: aggregatorList
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

exports.getANSList = async (req, res) => {
    console.log("query filter: ", req.query?.filter);
    try {
        const filter = JSON.parse(req?.query?.filter) || {};
        console.log(filter);
        const ansList = await getANSListService(filter);
        if (ansList) {
            res.status(200).json({
                status: "Success",
                data: ansList
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