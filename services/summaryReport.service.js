const { client } = require("../dbConnection");
const { formatDate } = require("../utils/formatDate");

exports.getSummaryReportService = async (filter) => {

    // Base query
    let query = `
        SELECT 
            TO_CHAR(DATE(delivery_date), 'DD-MM-YYYY') as delivery_date,
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

    try {
        const summaryReport = await client.query(query, values);

        return summaryReport.rows;
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err?.message;
    }
};


exports.getCliSummaryReportService = async (filter) => {

    let query = `
        SELECT 
            client_id,   
            status, 
            operator, 
            registration_status, 
            COUNT(cli) AS cli_count
        FROM 
            aagregator_cli_tbl
    `;

    // Array to hold the conditions
    const conditions = [];
    // Array to hold the parameter values
    const values = [];

    // Counter for parameter placeholders
    let paramIndex = 1;

    // Example conditions based on filter object
    if (filter.client_id) {
        conditions.push(`client_id = $${paramIndex}::text`);
        values.push(filter.client_id);
        paramIndex++;
    } else {
        conditions.push(`client_id != ''`);
    }

    if (filter.registration_status) {
        conditions.push(`registration_status = $${paramIndex}::text`);
        values.push(filter.registration_status);
        paramIndex++;
    }

    if (filter.operator) {
        conditions.push(`operator = $${paramIndex}::text`);
        values.push(filter.operator);
        paramIndex++;
    }

    if (filter.status) {
        conditions.push(`status = $${paramIndex}::text`);
        values.push(filter.status);
        paramIndex++;
    }

    // If there are conditions, append them to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    // Append the GROUP BY clause
    query += ' GROUP BY client_id, status, operator, registration_status';

    // Append the ORDER BY clause
    query += ' ORDER BY cli_count DESC';

    try {
        const cliSummaryReport = await client.query(query, values);

        return cliSummaryReport.rows;
    } catch (error) {
        return error?.message;
    }
};