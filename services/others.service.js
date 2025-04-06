const client = require("../dbConnection");

exports.getAggregatorListService = async () => {
    // const aggregatorList = await client.query("SELECT DISTINCT client_id FROM dipping_summary_tbl");
    const aggregatorList = await client.query("SELECT DISTINCT client_id FROM aagregator_cli_tbl WHERE client_id != '' ORDER BY client_id ASC");

    // console.log(aggregatorList.rows.length);
    return aggregatorList.rows;
}

exports.getANSListService = async (filter) => {
    console.log(filter);
    let query = `SELECT DISTINCT operator, ans_type FROM aagregator_cli_tbl`;

    // Array to hold the conditions
    const conditions = [];
    // Array to hold the parameter values
    const values = [];

    // Manually remove the empty operator value
    filter.operator == undefined ? filter.operator = "" : filter.operator
    conditions.push(`operator != $${conditions.length + 1}`);
    values.push(filter?.operator)

    if (filter?.ans_type) {
        conditions.push(`ans_type = $${conditions.length + 1}`);
        values.push(filter?.ans_type);
    }

    // If there are conditions, append them to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    // Append the ORDER BY clause
    query += ' ORDER BY operator ASC';

    try {
        const ansList = await client.query(query, values);
        console.log(ansList.rows.length);
        return ansList.rows;
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err;
    }
}

exports.getCliListService = async (filter) => {
    // console.log("cli filter: ", filter);
    let query = `
        SELECT DISTINCT cli,
        CASE
            WHEN cli ~ '^[A-Za-z]' THEN 1
            ELSE 2
        END AS cli_type
        FROM aagregator_cli_tbl`;

    // Array to hold the conditions
    const conditions = [];
    // Array to hold the parameter values
    const values = [];

    // Counter for parameter placeholders
    let paramIndex = 1;

    if (filter?.client_id) {
        // If client_id is provided, add the equality condition
        conditions.push(`client_id = $${paramIndex}::text`);
        values.push(filter.client_id);
        paramIndex++;
    } else {
        // If client_id is not provided, add the inequality condition to exclude empty client_id
        conditions.push(`client_id != ''`);
    }

    if (filter?.ans_type) {
        conditions.push(`ans_type = $${paramIndex}::text`);
        values.push(filter.ans_type);
        paramIndex++;
    }
    if (filter?.operator) {
        conditions.push(`operator = $${paramIndex}::text`);
        values.push(filter.operator);
        paramIndex++;
    }

    // If there are conditions, append them to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    // Append the ORDER BY clause to first sort alphabetically and then numerically
    query += ` ORDER BY 
     CASE 
        WHEN cli ~ '^[A-Za-z]' THEN 1 
        ELSE 2 
     END, 
     cli ASC`;

    // console.log(query, values);
    try {
        const cliList = await client.query(query, values);
        return cliList.rows.map(row => ({ cli: row.cli }));
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err;
    }
};


exports.getCliFromClitableService = async () => {
    const cliList = await client.query("SELECT * FROM aagregator_cli_tbl");
    // return cliList.rows;
    const cliArray = cliList.rows.map(row => row.cli);
    return cliArray;
}


exports.getDailyDippingReportService = async (date) => {

    let query = `SELECT 
                client_id,
                    operator, 
                    SUM(dipping_count) AS total_dipping_count
                FROM 
                    public.dipping_summary_tbl
                WHERE
                    delivery_date=$1
                GROUP BY 
                    client_id,
                    delivery_date,
                    operator
                ORDER BY 
                    total_dipping_count DESC`;

    try {
        const ansList = await client.query(query, [date]);
        return ansList.rows;
    } catch (err) {
        console.error('Error executing query', err.message, err.stack);
        return err;
    }
}