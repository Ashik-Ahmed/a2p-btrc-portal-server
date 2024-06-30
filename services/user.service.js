const client = require("../dbConnection")

exports.createNewUserService = async (userData) => {
    const newUser = await client.query("INSERT INTO users_tbl (name, email, password, phone, address, role, photo, status, page_access) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [userData.name, userData.email, userData.password, userData.phone, userData.address, userData.role, userData.photo, userData.status, userData.page_access]);

    return newUser.rows[0];
}

exports.getAllUserService = async (data) => {
    const users = await client.query("SELECT * FROM users_tbl");
    return users.rows;
}

exports.getUserByIdService = async (id) => {
    const user = await client.query("SELECT * FROM users_tbl WHERE user_id = $1", [id]);
    return user.rows[0];
}

// exports.getUserByEmailService = async (email) => {
//     const user = await client.query("SELECT * FROM users_tbl WHERE email = $1", [email]);
//     return user.rows[0];
// }

exports.updateUserByIdService = async (id, userData) => {
    const result = await client.query(" UPDATE users_tbl SET name = $1, email = $2, password = $3, phone = $4, address = $5, role = $6, photo = $7, status = $8, page_access = $9 WHERE user_id = $10", [userData?.name, userData?.email, userData?.password, userData?.phone, userData?.address, userData?.role, userData?.photo, userData?.status, userData?.page_access, id]);

    console.log(result);
    return result;
}

exports.deleteUserByIdService = async (id) => {
    const result = await client.query("DELETE FROM users_tbl WHERE user_id = $1", [id]);
    // console.log(result);
    return result;
}

exports.userLoginService = async (email) => {
    const user = await client.query("SELECT * FROM users_tbl WHERE email = $1", [email]);
    console.log(user.rows[0]);
    return user.rows[0];
}