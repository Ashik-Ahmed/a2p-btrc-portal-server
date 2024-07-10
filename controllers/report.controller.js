const { getSummaryReportService } = require("../services/report.service");

exports.getSummaryReport = async (req, res) => {
    try {
        const filter = JSON.parse(req.query.filter) || {};

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