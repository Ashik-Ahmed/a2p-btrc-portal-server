const client = require("../dbConnection")

exports.createNewUserService = async (userData) => {
    // Extract keys and values from userData
    const keys = Object.keys(userData);
    const values = Object.values(userData);

    // Generate column names dynamically
    const columns = keys.join(", "); // e.g., "name, email, password"

    // Generate parameter placeholders dynamically
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(", "); // e.g., "$1, $2, $3"

    // Construct the query dynamically
    const query = `INSERT INTO users_tbl (${columns}) VALUES (${placeholders}) RETURNING *`;

    // Execute query with values
    const newUser = await client.query(query, values);

    return newUser.rows[0];
};


exports.getAllUserService = async (data) => {
    // const users = await client.query("SELECT * FROM users_tbl");
    // const users = await client.query("SELECT user_id, name, email, phone, address, role, photo, status, page_access, login_history, created_at FROM users_tbl ORDER BY created_at DESC");
    const users = await client.query(`
        SELECT 
            u.user_id, 
            u.name, 
            u.email, 
            u.phone, 
            u.address, 
            TRIM(r.role_name) as role,
            jsonb_build_object(
                'role_id', r.role_id,
                'role_name', TRIM(r.role_name),
                'page_access', r.page_access
            ) as role_details,
            u.photo, 
            u.status, 
            u.page_access, 
            u.login_history, 
            u.created_at 
        FROM 
            users_tbl u
        LEFT JOIN 
            roles_tbl r 
        ON 
            u.role = r.role_id
        ORDER BY 
            u.created_at DESC
    `);
    return users.rows;
}

exports.getUserByIdService = async (id) => {
    const user = await client.query("SELECT * FROM users_tbl WHERE user_id = $1", [id]);
    return user.rows[0];
}

exports.updatePasswordByIdService = async (id, password) => {

    const result = await client.query("UPDATE users_tbl SET password = $1 WHERE user_id = $2", [password, id]);
    return result;
}

exports.updateUserByIdService = async (id, userData) => {
    console.log(id, userData);
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


    const result = await client.query(query, values);

    console.log(result);
    return result;

}

exports.deleteUserByIdService = async (id) => {
    const result = await client.query("DELETE FROM users_tbl WHERE user_id = $1", [id]);

    return result;
}

exports.userLoginService = async (email) => {
    // const user = await client.query("SELECT * FROM users_tbl WHERE email = $1", [email]);

    const user = await client.query(`
        SELECT 
            u.*,
            TRIM(r.role_name) as role
        FROM 
            users_tbl u
        LEFT JOIN 
            roles_tbl r 
        ON 
            u.role = r.role_id
        WHERE 
            u.email = $1
    `, [email]);

    return user.rows[0];
}


exports.getSidebarService = async (userId) => {

    const userRole = await client.query("SELECT role FROM users_tbl WHERE user_id = $1", [userId]);
    const role = userRole.rows[0]?.role;

    const result = await client.query(`SELECT 
        jsonb_agg(
            jsonb_build_object(
                'page_id', p.page_id,
                'label', p.label,
                'url', p.url,
                'parent_id', p.parent_id,
                'page_serial', p.page_serial,
                'group_serial', p.group_serial,
                'group_label', p.group_label
            )
            ORDER BY p.group_serial, p.page_serial -- Order inside jsonb_agg
        ) AS allowed_pages
    FROM 
        public.roles_tbl r
    LEFT JOIN 
        public.pages_tbl p
    ON 
        p.page_id = ANY(r.page_access::integer[])
    WHERE 
        role_id = $1
    GROUP BY 
        r.role_id, r.page_access -- Only group by role_id and page_access
    `, [4]);

    //     const result = await client.query(`SELECT 
    //     jsonb_agg(
    //         jsonb_build_object(
    //             'page_id', p.page_id,
    //             'label', p.label,  -- Use 'name' column as label
    //             'url', p.url,
    //             'parent_id', p.parent_id,
    //             'page_serial', p.page_serial,
    //             'group_serial', p.group_serial,
    //             'group_label', p.group_label  -- Use 'group_label' column
    //         )
    //         ORDER BY p.group_serial, p.page_serial
    //     ) AS allowed_pages
    // FROM 
    //     public.roles_tbl r
    // LEFT JOIN LATERAL (
    //     SELECT CAST(unnest(r.page_access) AS INTEGER) AS page_id
    // ) pa ON true
    // LEFT JOIN 
    //     public.pages_tbl p
    // ON 
    //     p.page_id = pa.page_id
    // WHERE 
    //     r.role_id = $1
    // GROUP BY 
    //     r.role_id;`, [4]);

    // console.log(result.rows[0]);
    return result.rows[0];
}
