const { client2 } = require("../dbConnection");


exports.receiveMnpBroadcaseService = async (broadcastData) => {
    console.log("Broadcast Data: ", broadcastData);

    const query = "INSERT INTO mnp_broadcast (message_id, ported_date, number, recipient_rc, donor_rc, nrh_rc, ported_action, received_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW() AT TIME ZONE 'Asia/Dhaka')";

    const results = []

    // Process each ported number
    for (const numberInfo of broadcastData.singleNumber) {
        const numberData = {
            number: numberInfo.number,
            recipientRC: numberInfo.recipientRC,
            donorRC: numberInfo.donorRC,
            nrhRC: numberInfo.nrhRC,
            portedAction: numberInfo.portedAction
        };

        console.log('Processing number:', numberData);


        const values = [
            broadcastData.messageHeader.messageID,
            broadcastData.portedDate,
            numberData.number,
            numberData.recipientRC,
            numberData.donorRC,
            numberData.nrhRC,
            numberData.portedAction
        ];

        const result = await client2.query(query, values);
        console.log('Inserted broadcast record ID:', result);

        results.push(result.rows[0]);
    }

    return results
}


exports.currentMNPStatusService = async (msisdn) => {
    const query = "SELECT * FROM mnp_broadcast WHERE number = $1 ORDER BY ported_date DESC LIMIT 1";

    const values = [msisdn];

    const result = await client2.query(query, values);

    return result.rows;
}

exports.getMNPHistoryByMSISDNService = async (msisdn) => {

    const query = "SELECT * FROM mnp_broadcast WHERE number = $1 ORDER BY ported_date DESC";

    const values = [msisdn];
    const result = await client2.query(query, values);

    return result.rows;
}