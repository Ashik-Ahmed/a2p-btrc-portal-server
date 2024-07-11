const client = require("../dbConnection");

exports.getCliListService = async () => {
    const cliList = await client.query("SELECT DISTINCT cli FROM dipping_summary_tbl");
    console.log(cliList.rows.length);
    return cliList.rows;
}