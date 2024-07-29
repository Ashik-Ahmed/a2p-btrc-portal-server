const { aggregatorwiseReportService, datewiseReportService, answiseReportService, cliwiseReportService } = require("../services/dippingReport.service");

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
        // console.log(aggregatorwiseReport);
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

exports.answiseReport = async (req, res) => {
    try {

        const filter = JSON.parse(req.query?.filter) || {};

        console.log(filter);

        if (!filter.start_date || !filter.end_date) {
            return res.status(403).json({
                status: "Failed",
                message: "Please provide start_date and end_date"
            })
        }

        const answiseReport = await answiseReportService(filter);

        if (answiseReport.length > 0) {
            res.status(200).json({
                status: "Success",
                data: answiseReport
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

exports.cliwiseReport = async (req, res) => {
    // console.log(req.query);
    try {
        const filter = JSON.parse(req.query?.filter) || {};

        // console.log(filter);

        if (!filter.start_date || !filter.end_date) {
            return res.status(403).json({
                status: "Failed",
                message: "Please provide start_date and end_date"
            })
        }

        const cliwiseReport = await cliwiseReportService(filter);

        if (cliwiseReport.length > 0) {
            res.status(200).json({
                status: "Success",
                data: cliwiseReport
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