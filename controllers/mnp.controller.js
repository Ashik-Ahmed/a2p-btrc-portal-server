
const { receiveMnpBroadcaseService, currentMNPStatusService, getMNPHistoryByMSISDNService } = require('../services/mnp.service');
const { parseBroadcastMessage, createSoapFault, validateBroadcastMessage, processBroadcastMessage, createAcknowledgeResponse } = require('../utils/mnp');

exports.receiveMnpBroadcaseController = async (req, res) => {


    // SOAP Client Setup (if needed for other operations)
    const wsdlUrl = 'http://172.17.10.150:8080/services/cdbService/numberPortability?wsdl';

    try {
        const xmlBody = req.body.toString();
        console.log('Received SOAP broadcast message:', xmlBody);

        // Parse the SOAP message with xml2js
        const broadcastData = await parseBroadcastMessage(xmlBody);

        if (!broadcastData) {
            return res.status(400).send(createSoapFault('Invalid broadcast message'));
        }

        // Validate required fields based on business rules
        const validationError = validateBroadcastMessage(broadcastData);
        if (validationError) {
            return res.status(400).send(createSoapFault(validationError));
        }

        // Process the broadcast message
        // await processBroadcastMessage(broadcastData);

        const result = await receiveMnpBroadcaseService(broadcastData);
        // console.log('Broadcast processing result:', result);

        // Send successful SOAP response
        const ackResponse = createAcknowledgeResponse(broadcastData.messageHeader.messageID);
        res.set('Content-Type', 'text/xml');
        res.send(ackResponse);
    } catch (error) {
        console.error('Error processing broadcast:', error);
        res.status(500).send(createSoapFault('Internal server error'));
    }
}

exports.currentMNPStatusController = async (req, res) => {
    try {
        const msisdn = req.params.msisdn;

        const result = await currentMNPStatusService(msisdn);
        res.status(200).json({
            status: "Success",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            error: error.message
        });
    }
}

exports.getMNPHistoryByMSISDNController = async (req, res) => {
    try {
        const msisdn = req.params.msisdn;
        const result = await getMNPHistoryByMSISDNService(msisdn);

        res.status(200).json({
            status: "Success",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            error: error.message
        });
    }
}