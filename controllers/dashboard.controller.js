const { getDashboardWeeklyDataService, getTopAggregatorService, getTopANSService } = require("../services/dashboard.service");

exports.getDashboardWeeklyData = async (req, res) => {
    try {
        const dashboardData = await getDashboardWeeklyDataService();
        console.log(dashboardData);
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
        const { interval } = req.query;
        const topAggregator = await getTopAggregatorService(interval);
        console.log(topAggregator);
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
        const { interval } = req.query;
        const topANS = await getTopANSService(interval);
        console.log(topANS);
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