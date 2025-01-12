const client = require("../dbConnection");

exports.createNewRoleService = async (roleData) => {
    console.log(roleData);
    const { role_id = 1212, role_name, page_access, created_by, created_at } = roleData;

    let query = `INSERT INTO roles_tbl (role_id, role_name, page_access, created_by, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    const result = await client.query(query, [role_id, role_name, page_access, created_by, created_at]);
    console.log(result);
    return result.rows[0];
}


exports.getAllRoleService = async () => {
    const result = await client.query(`SELECT 
    r.*,
    jsonb_agg(
        jsonb_build_object(
            'page_id', p.page_id,
            'title', p.title,
            'url', p.url,
            'serial', p.page_serial
        )
    ) AS allowed_pages
FROM 
    public.roles_tbl r
LEFT JOIN 
    public.pages_tbl p
ON 
    p.page_id = ANY(r.page_access::integer[])
GROUP BY 
    r.role_id, r.page_access
    
ORDER BY 
    r.role_id ASC`);
    return result.rows;
}


exports.getRoleByIdService = async (id) => {
    const result = await client.query(`SELECT 
    r.*,
    jsonb_agg(
        jsonb_build_object(
            'page_id', p.page_id,
            'title', p.title,
            'url', p.url,
            'serial', p.page_serial
        )
    ) AS allowed_pages
FROM 
    public.roles_tbl r
LEFT JOIN 
    public.pages_tbl p
ON 
    p.page_id = ANY(r.page_access::integer[])
     WHERE role_id = $1
GROUP BY 
    r.role_id, r.page_access
    
ORDER BY 
    r.role_id ASC`, [id]);
    return result.rows[0];
}


exports.updateRoleByIdService = async (id, roleData) => {

    let query = "UPDATE roles_tbl SET ";
    const conditions = [];
    const values = [];

    if (roleData?.role_name) {
        conditions.push(`role_name = $${conditions.length + 1}`);
        values.push(roleData?.role_name);
    }
    if (roleData?.users) {
        conditions.push(`users = $${conditions.length + 1}`);
        values.push(roleData?.users);
    }
    if (roleData?.page_access) {
        conditions.push(`page_access = $${conditions.length + 1}`);
        values.push(roleData?.page_access);
    }
    if (roleData?.updated_by) {
        conditions.push(`updated_by = $${conditions.length + 1}`);
        values.push(roleData?.updated_by);
    }
    if (roleData?.updated_at) {
        conditions.push(`updated_at = $${conditions.length + 1}`);
        values.push(roleData?.updated_at);
    }

    if (conditions.length > 0) {
        query += conditions.join(", ");
    }

    query += ` WHERE role_id = $${conditions.length + 1}`;
    values.push(id);

    const result = await client.query(query, values);

    return result;
}


exports.deleteRoleByIdService = async (id) => {
    const result = await client.query("DELETE FROM roles_tbl WHERE role_id = $1", [id]);
    return result;
}


exports.createPageService = async (pageData) => {
    const { page_serial, title, url, child_pages, visibility, status, created_by, updated_by, updated_at } = pageData;

    let query = `INSERT INTO pages_tbl (page_serial, title, url, child_pages, visibility, status, created_by, updated_by, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

    const result = await client.query(query, [page_serial, title, url, child_pages, visibility, status, created_by, updated_by, updated_at]);

    return result.rows[0];
}

exports.getAllPageService = async () => {
    const result = await client.query(` 
        SELECT 
        p.*,
        u.name AS created_by_name
    FROM 
        pages_tbl p
    LEFT JOIN 
        users_tbl u 
    ON 
        p.created_by = u.user_id
        `);
    return result.rows;
}

exports.deletePageByIdService = async (id) => {
    const result = await client.query("DELETE FROM pages_tbl WHERE page_id = $1", [id]);
    return result;
}