const express = require('express');
const { processBroadcastMessage } = require('../utils/mnp');
const { receiveMnpBroadcaseController, currentMNPStatusController } = require('../controllers/mnp.controller');
const { receiveMnpBroadcaseService } = require('../services/mnp.service');


const router = express.Router();


router.route('/').get((req, res) => {

    res.send('MNP route is working');

});

// MNP Broadcast Receive
router.route('/cdbService/broadcast').post(receiveMnpBroadcaseController);

router.route('/current-status/:msisdn')
    .get(currentMNPStatusController);












// router.post('/test-broadcast', async (req, res) => {
//     try {
//         // Example test endpoint to simulate broadcast processing
//         const testData = {
//             messageHeader: {
//                 messageID: 'test-' + Date.now(),
//                 messageName: 'Broadcast',
//                 messageType: 'Broadcast',
//                 senderID: 'CRDB',
//                 receiverID: 'TEST_OPERATOR',
//                 timestamp: new Date().toISOString()
//             },
//             processType: 'MOBILE',
//             processName: 'All',
//             portedDate: new Date().toISOString(),
//             singleNumber: [
//                 {
//                     number: '38640123456',
//                     recipientRC: '51',
//                     donorRC: '71',
//                     nrhRC: '51',
//                     portedAction: 'INSERT'
//                 }
//             ]
//         };

//         const result = await processBroadcastMessage(testData);
//         // const result = await receiveMnpBroadcaseService(testData)
//         // console.log("test result:", result);
//         res.json({ success: true, message: 'Test broadcast processed' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

module.exports = router;