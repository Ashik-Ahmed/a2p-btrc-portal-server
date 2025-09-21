const express = require('express');
const { processBroadcastMessage } = require('../utils/mnp');


const router = express.Router();

// router.route('/test').get((req, res) => {
//     res.send('MNP route is working');
// });

router.route('/').post((req, res) => {

    res.send('MNP route is working');

});

router.post('/test-broadcast', async (req, res) => {
    try {
        // Example test endpoint to simulate broadcast processing
        const testData = {
            messageHeader: {
                messageID: 'test-' + Date.now(),
                messageName: 'Broadcast',
                messageType: 'Broadcast',
                senderID: 'CRDB',
                receiverID: 'TEST_OPERATOR',
                timestamp: new Date().toISOString()
            },
            processType: 'MOBILE',
            processName: 'All',
            portedDate: new Date().toISOString(),
            singleNumber: [
                {
                    number: '38640123456',
                    recipientRC: 'RECIPIENT_RC',
                    donorRC: 'DONOR_RC',
                    nrhRC: 'NRH_RC',
                    portedAction: 'INSERT'
                }
            ]
        };

        await processBroadcastMessage(testData);
        res.json({ success: true, message: 'Test broadcast processed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;