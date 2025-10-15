const { client2 } = require("../dbConnection");


exports.receiveMnpBroadcaseService = async (broadcastData) => {
    console.log("Broadcast Data: ", broadcastData);

    const query = "INSERT INTO mnp_broadcast (message_id, ported_date, number, recipient_rc, donor_rc, nrh_rc, ported_action, received_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())";


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

        return result.rows[0];


        // TODO: Implement your database storage logic here
        // Example: await storePortedNumber(numberData, broadcastData);

        // Handle portedAction based on business rules
        // switch (numberInfo.portedAction) {
        //     case 'INSERT':
        //         // New porting - store new record

        //         break;
        //     case 'UPDATE':
        //         // Number ported again to different operator - update existing record
        //         break;
        //     case 'DELETE':
        //         // Number returned to NRH - delete or mark as inactive
        //         break;
        // }
    }
}