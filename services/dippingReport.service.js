const { client } = require("../dbConnection");
const { formatDate } = require("../utils/formatDate");

exports.datewiseReportService = async (filter) => {

    let query = ` SELECT 
            TO_CHAR(DATE(delivery_date), 'YYYY-MM-DD') as delivery_date,
            SUM(sms_count) AS sms_count,
            SUM(dipping_count) AS dipping_count
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
    query += ' ORDER BY delivery_date ASC';

    try {
        const datewiseReport = await client.query(query, values);

        // Convert `sms_count` and `dipping_count` from text to numbers
        const processedData = datewiseReport.rows.map(row => ({
            delivery_date: row.delivery_date,
            sms_count: Number(row.sms_count),   // Convert from string to number
            dipping_count: Number(row.dipping_count)  // Convert from string to number
        }));

        return processedData;
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err?.message;
    }
}

exports.aggregatorwiseReportService = async (filter) => {

    let query = `SELECT 
    TO_CHAR(DATE(delivery_date), 'YYYY-MM-DD') as delivery_date,
    client_id,
    SUM(sms_count) as sms_count,
    SUM(dipping_count) as dipping_count
FROM 
    dipping_summary_tbl`;

    // Array to hold the conditions
    const conditions = [];
    // Array to hold the parameter values
    const values = [];

    // Build the conditions and values array dynamically
    if (filter?.client_id) {
        conditions.push(`client_id = $${conditions.length + 1}`);
        values.push(filter?.client_id);
    }
    if (filter?.start_date && filter?.end_date) {
        conditions.push(`delivery_date BETWEEN $${conditions.length + 1} AND $${conditions.length + 2}`);
        values.push(formatDate(filter?.start_date), formatDate(filter?.end_date));
    }

    // If there are conditions, append them to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ') + ' ';
    }

    // Append the GROUP BY clause
    query += 'GROUP BY DATE(delivery_date), client_id ';

    // Append the ORDER BY clause
    query += ' ORDER BY delivery_date ASC';


    try {
        const aggregatorwiseReport = await client.query(query, values);

        // return aggregatorwiseReport.rows;

        // Convert `sms_count` and `dipping_count` from text to numbers
        const processedData = aggregatorwiseReport.rows.map(row => ({
            ...row,
            sms_count: Number(row.sms_count),   // Convert from string to number
            dipping_count: Number(row.dipping_count)  // Convert from string to number
        }));

        return processedData;
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err?.message;
    }
}

exports.answiseReportService = async (filter) => {

    let query = `SELECT 
        TO_CHAR(DATE(delivery_date), 'YYYY-MM-DD') as delivery_date,
        ans_type,
        operator,
        SUM(sms_count) as sms_count,
        SUM(dipping_count) as dipping_count
    FROM 
        dipping_summary_tbl`;

    // Array to hold the conditions
    const conditions = [];
    // Array to hold the parameter values
    const values = [];

    // Build the conditions and values array dynamically
    if (filter?.ans_type) {
        conditions.push(`ans_type = $${conditions.length + 1}::text`);
        values.push(filter?.ans_type);
    }
    if (filter?.operator) {
        conditions.push(`operator = $${conditions.length + 1}::text`);
        values.push(filter?.operator);
    }
    if (filter?.start_date && filter?.end_date) {
        conditions.push(`delivery_date BETWEEN $${conditions.length + 1} AND $${conditions.length + 2}`);
        values.push(formatDate(filter?.start_date), formatDate(filter?.end_date));
    }

    // If there are conditions, append them to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ') + ' ';
    }

    // Append the GROUP BY clause
    query += 'GROUP BY DATE(delivery_date), ans_type, operator ';

    // Append the ORDER BY clause
    query += ' ORDER BY delivery_date ASC';

    try {
        const answiseReport = await client.query(query, values);

        // return answiseReport.rows;

        // Convert `sms_count` and `dipping_count` from text to numbers
        const processedData = answiseReport.rows.map(row => ({
            ...row,
            sms_count: Number(row.sms_count),   // Convert from string to number
            dipping_count: Number(row.dipping_count)  // Convert from string to number
        }));

        return processedData;

    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err?.message;
    }

}

exports.cliwiseReportService = async (filter) => {

    let query = `SELECT 
        TO_CHAR(DATE(delivery_date), 'YYYY-MM-DD') as delivery_date,
        client_id,
        cli,
        operator,
        SUM(sms_count) as sms_count,
        SUM(dipping_count) as dipping_count
    FROM
        dipping_summary_tbl`;

    // Array to hold the conditions
    const conditions = [];
    // Array to hold the parameter values
    const values = [];

    // Build the conditions and values array dynamically
    if (filter?.cli) {
        conditions.push(`cli = $${conditions.length + 1}`);
        values.push(filter?.cli);
    }
    if (filter?.start_date && filter?.end_date) {
        conditions.push(`delivery_date BETWEEN $${conditions.length + 1} AND $${conditions.length + 2}`);
        values.push(formatDate(filter?.start_date), formatDate(filter?.end_date));
    }

    // If there are conditions, append them to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ') + ' ';
    }

    // Append the GROUP BY clause
    query += 'GROUP BY DATE(delivery_date), client_id, operator, cli ';

    // Append the ORDER BY clause
    query += ' ORDER BY delivery_date ASC';

    try {
        const cliwiseReport = await client.query(query, values);

        // return cliwiseReport.rows;

        // Convert `sms_count` and `dipping_count` from text to numbers
        const processedData = cliwiseReport.rows.map(row => ({
            ...row,
            sms_count: Number(row.sms_count),   // Convert from string to number
            dipping_count: Number(row.dipping_count)  // Convert from string to number
        }));

        return processedData;

    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err?.message;
    }
}


exports.messagetypewiseReportService = async (filter) => {

    let query = `SELECT 
        TO_CHAR(DATE(delivery_date), 'YYYY-MM-DD') as delivery_date,
        message_type,
        SUM(sms_count) as sms_count,
        SUM(dipping_count) as dipping_count
    FROM 
        dipping_summary_tbl`;

    // Array to hold the conditions
    const conditions = [];
    // Array to hold the parameter values
    const values = [];

    // Build the conditions and values array dynamically
    if (filter?.message_type) {
        conditions.push(`message_type = $${conditions.length + 1}::text`);
        values.push(filter?.message_type);
    }
    // if (filter?.operator) {
    //     conditions.push(`operator = $${conditions.length + 1}::text`);
    //     values.push(filter?.operator);
    // }
    if (filter?.start_date && filter?.end_date) {
        conditions.push(`delivery_date BETWEEN $${conditions.length + 1} AND $${conditions.length + 2}`);
        values.push(formatDate(filter?.start_date), formatDate(filter?.end_date));
    }

    // If there are conditions, append them to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ') + ' ';
    }

    // Append the GROUP BY clause
    query += 'GROUP BY DATE(delivery_date), message_type ';

    // Append the ORDER BY clause
    query += ' ORDER BY delivery_date, message_type ASC';

    try {
        const messagetypewiseReport = await client.query(query, values);
        const processedData = messagetypewiseReport.rows.map(row => ({
            ...row,
            sms_count: Number(row.sms_count),   // Convert from string to number
            dipping_count: Number(row.dipping_count)  // Convert from string to number
        }));

        return processedData;
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err?.message;
    }
}