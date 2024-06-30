const client = require("../dbConnection")

exports.createNewUserService = async (data) => {
    return await data
}

exports.getAllUserService = async (data) => {
    const users = await client.query("SELECT * FROM users_tbl");
    console.log(users);
    return users.rows;
}