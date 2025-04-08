const { getCliListService, getAggregatorListService, getANSListService, getCliFromClitableService, getDailyDippingReportService } = require("../services/others.service");

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

        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
}

exports.getANSList = async (req, res) => {

    try {
        const filter = JSON.parse(req?.query?.filter) || {};

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


exports.getCliFromCliTable = async (req, res) => {
    try {
        const cliList = await getCliFromClitableService();

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


exports.getDailyDippingReport = async (req, res) => {

    try {
        const date = new Date(req?.query?.date);

        const formatted = date.toLocaleDateString('en-CA', {
            timeZone: 'Asia/Dhaka' // Ensures BD timezone
        });
        const dippingReport = await getDailyDippingReportService(formatted);

        if (dippingReport) {
            res.status(200).json({
                status: "Success",
                data: dippingReport
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