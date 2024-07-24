const { getSummaryReportService, datewiseReportService, aggregatorwiseReportService } = require("../services/report.service");

exports.getSummaryReport = async (req, res) => {
    try {
        const filter = JSON.parse(req.query?.filter) || {};

        const summaryReport = await getSummaryReportService(filter);
        // console.log(summaryReport);
        if (summaryReport) {
            res.status(200).json({
                status: "Success",
                data: summaryReport
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

exports.datewiseReport = async (req, res) => {
    try {
        const filter = JSON.parse(req.query?.filter) || {};
        // console.log(filter);
        if (!filter.start_date || !filter.end_date) {
            return res.status(403).json({
                status: "Failed",
                message: "Please provide start_date and end_date"
            })
        }


        const datewiseReport = await datewiseReportService(filter);

        if (datewiseReport) {
            res.status(200).json({
                status: "Success",
                data: datewiseReport
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


exports.aggregatorwiseReport = async (req, res) => {
    try {
        const filter = JSON.parse(req.query?.filter) || {};

        // console.log(filter);

        if (!filter.start_date || !filter.end_date) {
            return res.status(403).json({
                status: "Failed",
                message: "Please provide start_date and end_date"
            })
        }

        const aggregatorwiseReport = await aggregatorwiseReportService(filter);

        if (aggregatorwiseReport) {
            res.status(200).json({
                status: "Success",
                data: aggregatorwiseReport
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