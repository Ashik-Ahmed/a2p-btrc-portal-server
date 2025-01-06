const client = require("../dbConnection");

exports.createNewRoleService = async (roleData) => {

    const { role_name, created_by, created_at, updated_by, updated_at } = roleData;

    let query = `INSERT INTO roles_tbl (role_name, created_by, created_at, updated_by, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    const result = await client.query(query, [role_name, created_by, created_at, updated_by, updated_at]);

    return result.rows[0];
}


exports.getAllRoleService = async () => {
    const result = await client.query("SELECT * FROM roles_tbl");
    return result.rows;
}


exports.getRoleByIdService = async (id) => {
    const result = await client.query("SELECT * FROM roles_tbl WHERE role_id = $1", [id]);
    return result.rows[0];
}


exports.updateRoleByIdService = async (id, roleData) => {
    console.log("update role called");
    // let query = "UPDATE roles_tbl SET ";
    // const conditions = [];
    // const values = [];

    // if (roleData?.role_name) {
    //     conditions.push(`role_name = $${conditions.length + 1}`);
    //     values.push(roleData?.role_name);
    // }
    // if (roleData?.users) {
    //     conditions.push(`users = $${conditions.length + 1}`);
    //     values.push(roleData?.users);
    // }
    // if (roleData?.page_access) {
    //     conditions.push(`page_access = $${conditions.length + 1}`);
    //     values.push(roleData?.page_access);
    // }
    // if (roleData?.updated_by) {
    //     conditions.push(`updated_by = $${conditions.length + 1}`);
    //     values.push(roleData?.updated_by);
    // }
    // if (roleData?.updated_at) {
    //     conditions.push(`updated_at = $${conditions.length + 1}`);
    //     values.push(roleData?.updated_at);
    // }

    // if (conditions.length > 0) {
    //     query += conditions.join(", ");
    // }

    // query += ` WHERE role_id = $${conditions.length + 1}`;
    // values.push(id);

    // const result = await client.query(query, values);

    // return result;
}