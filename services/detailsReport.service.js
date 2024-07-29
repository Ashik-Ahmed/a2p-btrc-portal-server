const client = require("../dbConnection");
const { formatDate, formatDateAsPartition } = require("../utils/formatDate");

exports.getReportByMSISDNService = async (filter) => {

    let query = `SELECT 
    delivery_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Dhaka' as delivery_date,
    client_id,
    cli,
    bill_msisdn,
    message_type,
    ans_type,
    operator,
    ans_business_code,
    source_ip
    FROM public.cp_broadcast_history_btrc_tbl_${formatDateAsPartition(filter?.filterDate)}`;

    // let query = `SELECT * FROM public.cp_broadcast_history_btrc_tbl_${formatDateAsPartition(filter?.filterDate)}`;
    // Array to hold the conditions
    const conditions = [];
    // Array to hold the parameter values
    const values = [];

    if (filter?.msisdn) {
        conditions.push(`MSISDN = $${conditions.length + 1}`);
        values.push(filter?.msisdn);
    }
    if (filter?.date) {
        conditions.push(`date(delivery_date) = $${conditions.length + 1}`);
        values.push(formatDate(filter?.date));
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    // Append the ORDER BY clause
    query += ' ORDER BY delivery_date DESC';
    // console.log(query, values);

    try {
        const msisdnReport = await client.query(query, values);

        return msisdnReport.rows;
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err?.message;
    }
}
