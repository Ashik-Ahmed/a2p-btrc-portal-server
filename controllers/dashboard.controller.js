const { getDashboardWeeklyDataService, getTopAggregatorService } = require("../services/dashboard.service");

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