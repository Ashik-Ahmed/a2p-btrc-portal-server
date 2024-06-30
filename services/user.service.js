const client = require("../dbConnection")

exports.createNewUserService = async (userData) => {
    const newUser = await client.query("INSERT INTO users_tbl (name, email, password, phone, address, role, photo, status, page_access) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [userData.name, userData.email, userData.password, userData.phone, userData.address, userData.role, userData.photo, userData.status, userData.page_access]);

    console.log(newUser.rows[0]);
    return newUser.rows[0];
}

exports.getAllUserService = async (data) => {
    const users = await client.query("SELECT * FROM users_tbl");
    return users.rows;
}