const client = require("../dbConnection");

exports.getDashboardWeeklyDataService = async () => {
    const dashboardWeeklyData = await client.query(`SELECT 
    DATE(date) as date,
    SUM(smscount) as total_sms,
    SUM(dippingcount) as total_dipping
FROM 
    public.dashboard_tbl
WHERE 
    date >= TIMESTAMP '2024-06-29T18:00:00.000Z' - INTERVAL '6 days' 
    AND date < TIMESTAMP '2024-06-29T18:00:00.000Z' + INTERVAL '1 day'
GROUP BY 
    DATE(date)
ORDER BY 
    DATE(date) ASC`);

    return dashboardWeeklyData.rows;
}


exports.getTopAggregatorService = async (interval) => {

    const topAggregator = await client.query(`SELECT clientId, SUM(smscount) AS total_smscount, SUM(dippingcount) AS total_dippingcount
FROM dashboard_tbl
WHERE date >= current_date - INTERVAL '${interval}'
GROUP BY clientId
ORDER BY total_smscount DESC
LIMIT 10`);
    return topAggregator.rows;
}

exports.getTopANSService = async (interval) => {

    const topANS = await client.query(`SELECT ansname, SUM(smscount) AS total_smscount, SUM(dippingcount) AS total_dippingcount
FROM dashboard_tbl
WHERE date >= current_date - INTERVAL '${interval}'
GROUP BY ansname
ORDER BY total_smscount DESC
LIMIT 10`);
    return topANS.rows;
}