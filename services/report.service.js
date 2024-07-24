const client = require("../dbConnection");
const { formatDate } = require("../utils/formatDate");

exports.getSummaryReportService = async (filter) => {
    // console.log("filter service: ", formatDate(filter?.start_date), formatDate(filter?.end_date));
    // Base query
    let query = `
        SELECT 
            TO_CHAR(DATE(delivery_date), 'YYYY-MM-DD') as delivery_date,
            client_id,
            operator,
            ans_type,
            cli,
            message_type,
            sms_count,
            dipping_count,
            source_ip
        FROM 
            dipping_summary_tbl
    `;

    // Array to hold the conditions
    const conditions = [];
    // Array to hold the parameter values
    const values = [];

    // Build the conditions and values array dynamically
    if (filter.client_id) {
        conditions.push(`client_id = $${conditions.length + 1}`);
        values.push(filter.client_id);
    }
    if (filter.operator) {
        conditions.push(`operator = $${conditions.length + 1}`);
        values.push(filter.operator);
    }
    if (filter.ans_type) {
        conditions.push(`ans_type = $${conditions.length + 1}`);
        values.push(filter.ans_type);
    }
    if (filter.cli) {
        conditions.push(`cli = $${conditions.length + 1}`);
        values.push(filter.cli);
    }
    if (filter.message_type) {
        conditions.push(`message_type = $${conditions.length + 1}`);
        values.push(filter.message_type);
    }
    if (filter.start_date && filter.end_date) {
        conditions.push(`delivery_date BETWEEN $${conditions.length + 1} AND $${conditions.length + 2}`);
        values.push(formatDate(filter.start_date), formatDate(filter.end_date));
    }

    // If there are conditions, append them to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ') + ' ';
    }

    // Append the ORDER BY clause
    query += ' ORDER BY sms_count DESC';
    // console.log(query, values);
    try {
        const summaryReport = await client.query(query, values);
        // console.log(summaryReport.rows.length);
        return summaryReport.rows;
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err?.message;
    }
};


exports.datewiseReportService = async (filter) => {

    console.log(formatDate(filter.start_date), formatDate(filter.end_date));
    let query = ` SELECT 
            TO_CHAR(DATE(delivery_date), 'YYYY-MM-DD') as delivery_date,
            SUM(sms_count) as sms_count,
            SUM(dipping_count) as dipping_count
        FROM 
            dipping_summary_tbl`;

    // Array to hold the conditions
    const conditions = [];
    // Array to hold the parameter values
    const values = [];

    if (filter.start_date && filter.end_date) {
        conditions.push(`delivery_date BETWEEN $${conditions.length + 1} AND $${conditions.length + 2}`);
        values.push(formatDate(filter.start_date), formatDate(filter.end_date));
    }

    // If there are conditions, append them to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ') + ' ';
    }

    // Append the GROUP BY clause
    query += 'GROUP BY DATE(delivery_date) ';

    // Append the ORDER BY clause
    query += ' ORDER BY delivery_date DESC';
    // console.log(query, values);
    try {
        const datewiseReport = await client.query(query, values);
        // console.log(datewiseReport.rows);
        return datewiseReport.rows;
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err?.message;
    }
}

exports.aggregatorwiseReportService = async (aggregator) => {

    const aggregatorwiseReport = await client.query(`
        SELECT 
            TO_CHAR(DATE(delivery_date), 'YYYY-MM-DD') as delivery_date,
            sms_count,
            dipping_count
        FROM 
            dipping_summary_tbl
        WHERE
            operator = '${aggregator}'
    `);
    return aggregatorwiseReport.rows
}