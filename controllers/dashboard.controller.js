const { getTopAggregatorService, getTopANSService, getDashboardMonthlyDataService } = require("../services/dashboard.service");

exports.getDashboardMonthlyData = async (req, res) => {
    try {
        const dashboardData = await getDashboardMonthlyDataService();

        if (dashboardData) {
            res.status(200).json({
                status: "Success",
                data: dashboardData
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


exports.getTopAggregator = async (req, res) => {
    try {
        const { interval } = req.query || 7;
        const topAggregator = await getTopAggregatorService(interval);

        if (topAggregator) {
            res.status(200).json({
                status: "Success",
                data: topAggregator
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

exports.getTopANS = async (req, res) => {
    try {
        const { interval } = req.query || 7;
        const topANS = await getTopANSService(interval);

        if (topANS) {
            res.status(200).json({
                status: "Success",
                data: topANS
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