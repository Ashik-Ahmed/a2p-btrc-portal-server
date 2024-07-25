const { getReportByMSISDNService } = require("../services/detailsReport.service");

exports.getReportByMSISDN = (req, res) => {
    try {

        const filter = JSON.parse(req.query?.filter) || {};

        if (!filter?.msisdn) {
            return res.status(403).json({
                status: "Failed",
                message: "Please provide msisdn"
            })
        }
        if (!filter?.date) {
            return res.status(403).json({
                status: "Failed",
                message: "Please provide date"
            })
        }

        const msisdnDetailsReport = getReportByMSISDNService(filter);

        if (msisdnDetailsReport) {
            res.status(200).json({
                status: "Success",
                data: msisdnDetailsReport
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