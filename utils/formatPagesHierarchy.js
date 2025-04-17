exports.modifyAllowedPages = (rows) => {
    const groupedData = {};

    rows.forEach(row => {
        // Initialize group_label if not already present
        if (!groupedData[row.group_label]) {
            groupedData[row.group_label] = [];
        }

        // If the row has no parent_id, it's a top-level item
        if (row.parent_id === null) {
            groupedData[row.group_label].push({
                ...row,
                children: []
            });
        } else {
            // Find the parent item and add it to its children
            const parent = groupedData[row.group_label].find(item => item.page_id === row.parent_id);
            if (parent) {
                parent.children.push(row);
            }
        }
    });

    return groupedData;
}