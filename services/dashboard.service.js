const client = require("../dbConnection");

exports.getDashboardMonthlyDataService = async () => {
    const dashboardMonthlyData = await client.query(`SELECT 
    TO_CHAR(DATE(date), 'YYYY-MM-DD') as date,
    SUM(smscount) as total_sms,
    SUM(dippingcount) as total_dipping
FROM 
    public.dashboard_tbl
WHERE 
    date >= current_date - 30 
    AND date <= current_date
GROUP BY 
    DATE(date)
ORDER BY 
    DATE(date) DESC`);

    return dashboardMonthlyData.rows;
}


exports.getTopAggregatorService = async (interval) => {

    const topAggregator = await client.query(`SELECT clientId, SUM(smscount) AS total_smscount, SUM(dippingcount) AS total_dippingcount
FROM dashboard_tbl
WHERE date >= current_date - ${interval}
GROUP BY clientId
ORDER BY total_smscount DESC
LIMIT 10`);
    return topAggregator.rows;
}

exports.getTopANSService = async (interval) => {

    const topANS = await client.query(`SELECT ansname, SUM(smscount) AS total_smscount, SUM(dippingcount) AS total_dippingcount
FROM dashboard_tbl
WHERE date >= current_date - ${interval}
GROUP BY ansname
ORDER BY total_smscount DESC
LIMIT 10`);
    return topANS.rows;
}