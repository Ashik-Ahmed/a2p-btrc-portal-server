const client = require("../dbConnection");

exports.getSummaryReportService = async () => {
    // const summaryReport = await client.query("select * from dipping_summary_tbl_2024_06 order by sms_count desc limit 10"); 
    const summaryReport = await client.query(`select 
        TO_CHAR(DATE(delivery_date), 'YYYY-MM-DD') as delivery_date,
        client_id,
        operator,
        ans_type,
        cli,
        message_type,
        sms_count,
        source_ip
        from dipping_summary_tbl_2024_06 order by sms_count desc`);
    return summaryReport.rows;
}