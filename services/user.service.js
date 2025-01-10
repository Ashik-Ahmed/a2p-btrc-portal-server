const client = require("../dbConnection")

exports.createNewUserService = async (userData) => {
    const newUser = await client.query("INSERT INTO users_tbl (name, email, password, phone, address, role, photo, status, page_access) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [userData?.name, userData?.email, userData?.password, userData?.phone, userData?.address, (userData?.role || 'user'), userData?.photo, (userData?.status || 'inactive'), userData?.page_access]);

    return newUser.rows[0];
}

exports.getAllUserService = async (data) => {
    // const users = await client.query("SELECT * FROM users_tbl");
    const users = await client.query("SELECT user_id, name, email, phone, address, role, photo, status, page_access, created_at FROM users_tbl ORDER BY created_at DESC");
    return users.rows;
}

exports.getUserByIdService = async (id) => {
    const user = await client.query("SELECT * FROM users_tbl WHERE user_id = $1", [id]);
    return user.rows[0];
}

exports.updatePasswordByIdService = async (id, password) => {
    // console.log("from service: ", id, password);
    const result = await client.query("UPDATE users_tbl SET password = $1 WHERE user_id = $2", [password, id]);
    return result;
}

exports.updateUserByIdService = async (id, userData) => {

    let query = "UPDATE users_tbl SET ";
    const conditions = [];
    const values = [];

    if (userData?.name) {
        conditions.push(`name = $${conditions.length + 1}`);
        values.push(userData?.name);
    }
    if (userData?.email) {
        conditions.push(`email = $${conditions.length + 1}`);
        values.push(userData?.email);
    }
    if (userData?.password) {
        conditions.push(`password = $${conditions.length + 1}`);
        values.push(userData?.password);
    }
    if (userData?.phone) {
        conditions.push(`phone = $${conditions.length + 1}`);
        values.push(userData?.phone);
    }
    if (userData?.address) {
        conditions.push(`address = $${conditions.length + 1}`);
        values.push(userData?.address);
    }
    if (userData?.role) {
        conditions.push(`role = $${conditions.length + 1}`);
        values.push(userData?.role);
    }
    if (userData?.photo) {
        conditions.push(`photo = $${conditions.length + 1}`);
        values.push(userData?.photo);
    }
    if (userData?.status) {
        conditions.push(`status = $${conditions.length + 1}`);
        values.push(userData?.status);
    }
    if (userData?.page_access) {
        conditions.push(`page_access = $${conditions.length + 1}`);
        values.push(userData?.page_access);
    }
    if (userData?.last_login) {
        conditions.push(`login_history = array_append(login_history, $${conditions.length + 1})`);
        values.push(userData?.last_login);
    }

    if (conditions.length > 0) {
        query += conditions.join(', ');
    }

    query += ` WHERE user_id = $${conditions.length + 1}`;
    values.push(id);
    // console.log(query, values);

    const result = await client.query(query, values);
    // console.log(result);

    return result;

    // const result = await client.query(" UPDATE users_tbl SET name = $1, email = $2, password = $3, phone = $4, address = $5, role = $6, photo = $7, status = $8, page_access = $9 WHERE user_id = $10", [userData?.name, userData?.email, userData?.password, userData?.phone, userData?.address, userData?.role, userData?.photo, userData?.status, userData?.page_access, id]);

    // console.log(result);
    // return result;
}

exports.deleteUserByIdService = async (id) => {
    const result = await client.query("DELETE FROM users_tbl WHERE user_id = $1", [id]);
    // console.log(result);
    return result;
}

exports.userLoginService = async (email) => {
    const user = await client.query("SELECT * FROM users_tbl WHERE email = $1", [email]);
    // console.log(user.rows[0]);
    return user.rows[0];
}