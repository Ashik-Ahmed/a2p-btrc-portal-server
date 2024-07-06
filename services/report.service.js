const client = require("../dbConnection");

exports.getSummaryReportService = async () => {
    const summaryReport = await client.query("select * from dipping_summary_tbl_2024_06 order by sms_count desc limit 10");
    return summaryReport.rows;
}