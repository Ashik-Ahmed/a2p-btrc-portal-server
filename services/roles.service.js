exports.createNewRoleService = async (roleData) => {

    const { role_name, created_by, created_at, updated_by, updated_at } = roleData;

    let query = `INSERT INTO roles_tbl (role_name, created_by, created_at, updated_by, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    const result = await client.query(query, [role_name, created_by, created_at, updated_by, updated_at]);

    return result.rows[0];
}