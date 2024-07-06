const { getDashboardWeeklyDataService } = require("../services/dashboard.service");

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