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