const client = require("../dbConnection");

exports.getDashboardWeeklyDataService = async () => {
    const dashboardData = await client.query(`SELECT 
    DATE(date) as date,
    SUM(smscount) as total_sms,
    SUM(dippingcount) as total_dipping
FROM 
    public.dashboard_tbl
WHERE 
    date >= current_date - INTERVAL '7 days' 
    AND date < current_date + INTERVAL '1 day'
GROUP BY 
    DATE(date)
ORDER BY 
    DATE(date) ASC`);

    return dashboardData.rows;
}