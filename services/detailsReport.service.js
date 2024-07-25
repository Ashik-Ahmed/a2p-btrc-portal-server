const { formatDate } = require("../utils/formatDate");

exports.getReportByMSISDNService = async (filter) => {
    let query = `SELECT * FROM public.cp_broadcast_history_btrc_tbl_2024_07_15`;

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
        // console.log(msisdnReport.rows);
        return msisdnReport.rows;
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err?.message;
    }

}
