exports.formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}-${month}-${day}`;
}

exports.formatDateAsPartition = (inputDate) => {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JavaScript
    const day = String(date.getDate()).padStart(2, '0');
    // console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
}