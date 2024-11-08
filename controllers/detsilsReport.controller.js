const { getReportByMSISDNService, getCliDetailsReportService, getIpDetailsReportService, getA2PDetailsReportService, getDnDDetailsReportService } = require("../services/detailsReport.service");


exports.getA2PDetailsReport = async (req, res) => {
    try {

        const filter = JSON.parse(req?.query?.filter) || {};
        console.log(filter);
        if (!filter?.date) {
            {
                return res.status(403).json({
                    status: "Failed",
                    message: "Please provide date"
                })
            }
        }

        const report = await getA2PDetailsReportService(filter);

        if (report.length > 0) {
            res.status(200).json({
                status: "Success",
                data: report
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

exports.getReportByMSISDN = async (req, res) => {
    try {

        const filter = JSON.parse(req?.query?.filter) || {};

        if (!filter?.msisdn) {
            return res.status(403).json({
                status: "Failed",
                message: "Please provide msisdn"
            })
        }
        if (!filter?.filterDate) {
            return res.status(403).json({
                status: "Failed",
                message: "Please provide date"
            })
        }

        const msisdnDetailsReport = await getReportByMSISDNService(filter);
        // console.log(msisdnDetailsReport);
        if (msisdnDetailsReport.length > 0) {
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


exports.getCliDetailsReport = async (req, res) => {
    try {

        const filter = JSON.parse(req?.query?.filter) || {};

        const cliDetailsReport = await getCliDetailsReportService(filter);
        // console.log(cliDetailsReport);
        if (cliDetailsReport.length > 0) {
            res.status(200).json({
                status: "Success",
                data: cliDetailsReport
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


exports.getIpDetailsReport = async (req, res) => {
    try {

        const filter = JSON.parse(req?.query?.filter) || {};

        const ipDetailsReport = await getIpDetailsReportService(filter);

        if (ipDetailsReport.length > 0) {
            res.status(200).json({
                status: "Success",
                data: ipDetailsReport
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

exports.getDnDDetailsReport = async (req, res) => {
    try {

        let filter = {};

        if (req?.query?.filter) {
            filter = JSON.parse(req?.query?.filter)
        }

        const dndDetailsReport = await getDnDDetailsReportService(filter);

        if (dndDetailsReport.length > 0) {
            res.status(200).json({
                status: "Success",
                data: dndDetailsReport
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