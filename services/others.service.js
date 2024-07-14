const client = require("../dbConnection");

exports.getAggregatorListService = async () => {
    const aggregatorList = await client.query("SELECT DISTINCT client_id FROM dipping_summary_tbl");
    return aggregatorList.rows;
}

exports.getCliListService = async (filter) => {

    let query = "SELECT DISTINCT cli FROM dipping_summary_tbl";

    // Array to hold the conditions
    const conditions = [];
    // Array to hold the parameter values
    const values = [];

    // Build the conditions and values array dynamically
    if (filter.client_id) {
        conditions.push(`client_id = $${conditions.length + 1}`);
        values.push(filter.client_id);
    }
    if (filter.ans_type) {
        console.log("inside ans type");
        conditions.push(`ans_type = $${conditions.length + 1}`);
        values.push(filter.ans_type);
    }
    if (filter.operator) {
        conditions.push(`operator = $${conditions.length + 1}`);
        values.push(filter.operator);
    }

    // If there are conditions, append them to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    // Append the ORDER BY clause
    query += ' ORDER BY cli DESC';
    // console.log(query, values);
    try {
        const clList = await client.query(query, values);
        // console.log(clList.rows.length);
        return clList.rows;
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err;
    }
}