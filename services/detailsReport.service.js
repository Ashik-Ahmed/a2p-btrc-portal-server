const client = require("../dbConnection");
const { formatDate, formatDateAsPartition } = require("../utils/formatDate");


exports.getA2PDetailsReportService = async (filter, limit = 10, offset = 0) => {

    let query = `SELECT 
    delivery_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Dhaka' as delivery_date,
    client_id,
    msisdn,
    cli,
    bill_msisdn,
    message_type,
    operator,
    message_count,
    message_length,
    source_ip
    FROM public.cp_broadcast_history_btrc_tbl_${formatDateAsPartition(filter?.date)}`;


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
    if (filter.date) {
        conditions.push(`date(delivery_date) = $${conditions.length + 1}`);
        values.push(formatDate(filter?.date));
    }

    // If there are conditions, append them to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ') + ' ';
    }

    // Append the ORDER BY clause
    query += ' ORDER BY client_id ASC LIMIT $' + (conditions.length + 1) + ' OFFSET $' + (conditions.length + 2);
    values.push(limit, offset);

    try {
        const a2pDetailsReport = await client.query(query, values);
        // console.log(a2pDetailsReport.rows.length);
        return a2pDetailsReport.rows;
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err?.message;
    }
}

exports.getReportByMSISDNService = async (filter) => {

    let query = `SELECT 
    delivery_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Dhaka' as delivery_date,
    client_id,
    msisdn,
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


exports.getCliDetailsReportService = async (filter) => {

    let query = `SELECT 
        client_id, 
        cli, 
        bill_msisdn, 
        created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Dhaka' as created_at,
        updated_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Dhaka' as updated_at, 
        status, 
        operator, 
        registration_status
    FROM 
        aagregator_cli_tbl`;

    // Array to hold the conditions
    const conditions = [];
    // Array to hold the parameter values
    const values = [];

    if (filter?.client_id) {
        conditions.push(`client_id = $${conditions.length + 1}`);
        values.push(filter?.client_id);
    }

    if (filter?.cli) {
        conditions.push(`cli = $${conditions.length + 1}`);
        values.push(filter?.cli);
    }

    if (filter?.operator) {
        conditions.push(`operator = $${conditions.length + 1}`);
        values.push(filter?.operator);
    }

    if (filter?.registration_status) {
        conditions.push(`registration_status = $${conditions.length + 1}`);
        values.push(filter?.registration_status);
    }

    if (filter?.status) {
        conditions.push(`status = $${conditions.length + 1}`);
        values.push(filter?.status);
    }

    if (filter?.bill_msisdn) {
        conditions.push(`bill_msisdn = $${conditions.length + 1}`);
        values.push(filter?.bill_msisdn);
    }

    // If there are conditions, append them to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    // Append the ORDER BY clause
    query += ' ORDER BY created_at DESC';

    try {
        const cliDetailsReport = await client.query(query, values);
        console.log(cliDetailsReport.rows.length);
        return cliDetailsReport.rows;
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err?.message;
    }
}


exports.getIpDetailsReportService = async (filter) => {

    let query = `SELECT
            client_id, 
            ip_address, 
            created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Dhaka' as created_at, 
            updated_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Dhaka' as updated_at, 
            status 
        FROM 
            public.aagregator_ip_tbl`;

    // Array to hold the conditions
    const conditions = [];
    // Array to hold the parameter values
    const values = [];

    if (filter?.client_id) {
        conditions.push(`client_id = $${conditions.length + 1}`);
        values.push(filter?.client_id);
    }

    if (filter?.status) {
        conditions.push(`status = $${conditions.length + 1}`);
        values.push(filter?.status);
    }

    // If there are conditions, append them to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    // Append the ORDER BY clause
    query += ' ORDER BY created_at DESC';

    try {
        const ipDetailsReport = await client.query(query, values);

        return ipDetailsReport.rows;
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err?.message;
    }
}

exports.getDnDDetailsReportService = async (filter) => {

    let query = `SELECT
             id,
             msisdn,
             cli,
             dnd_flag,
             opt_in_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Dhaka' as opt_in_date,
             opt_out_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Dhaka' as opt_out_date,
             created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Dhaka' as created_at,
             updated_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Dhaka' as updated_at
        FROM 
            dnd_tbl`;

    // Array to hold the conditions
    const conditions = [];
    // Array to hold the parameter values
    const values = [];

    if (filter?.msisdn) {
        conditions.push(`msisdn = $${conditions.length + 1}`);
        values.push(filter?.msisdn);
    }

    if (filter?.cli) {
        conditions.push(`cli = $${conditions.length + 1}`);
        values.push(filter?.cli);
    }

    if (filter?.dnd_flag) {
        conditions.push(`dnd_flag = $${conditions.length + 1}`);
        values.push(filter?.dnd_flag);
    }

    if (filter?.opt_in_date) {
        conditions.push(`opt_in_date = $${conditions.length + 1}`);
        values.push(filter?.opt_in_date);
    }

    if (filter?.opt_out_date) {
        conditions.push(`opt_out_date = $${conditions.length + 1}`);
        values.push(filter?.opt_out_date);
    }

    // If there are conditions, append them to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    // Append the ORDER BY clause
    query += ' ORDER BY id ASC';

    try {
        const dndDetailsReport = await client.query(query, values);
        return dndDetailsReport.rows;
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err?.message;
    }

}