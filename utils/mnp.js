import xml2js from 'xml2js';
// Initialize xml2js parser
const parser = new xml2js.Parser({
    explicitArray: false,
    ignoreAttrs: false,
    trim: true
});

// Parse SOAP broadcast message using xml2js
export async function parseBroadcastMessage(xmlBody) {
    try {
        const result = await parser.parseStringPromise(xmlBody);

        // Extract the broadcast data from the SOAP envelope
        const envelope = result['soapenv:Envelope'] || result.Envelope;
        const body = envelope['soapenv:Body'] || envelope.Body;
        const broadcast = body['por:Broadcast'] || body.Broadcast;

        if (!broadcast) {
            throw new Error('Broadcast element not found');
        }

        // Extract message header
        const messageHeader = broadcast.messageHeader;
        if (!messageHeader) {
            throw new Error('messageHeader not found');
        }

        // Extract singleNumber (could be array or single object)
        let singleNumber = broadcast.singleNumber;
        if (singleNumber && !Array.isArray(singleNumber)) {
            singleNumber = [singleNumber];
        }

        return {
            messageHeader: {
                messageID: messageHeader.messageID,
                messageName: messageHeader.messageName,
                messageType: messageHeader.messageType,
                senderID: messageHeader.senderID,
                receiverID: messageHeader.receiverID,
                timestamp: messageHeader.timestamp
            },
            processID: broadcast.processID,
            processType: broadcast.processType,
            processVersion: broadcast.processVersion,
            processName: broadcast.processName,
            relatedProcessID: broadcast.relatedProcessID,
            portedDate: broadcast.portedDate,
            singleNumber: singleNumber || []
        };
    } catch (error) {
        console.error('Error parsing XML with xml2js:', error);
        return null;
    }
}

// Validate broadcast message according to rules
export function validateBroadcastMessage(broadcastData) {
    const { messageHeader, processType, processName, portedDate, singleNumber } = broadcastData;

    // Required field validation
    if (!messageHeader?.messageID) return 'messageID is required';
    if (messageHeader.messageName !== 'Broadcast') return 'messageName must be "Broadcast"';
    if (messageHeader.messageType !== 'Broadcast') return 'messageType must be "Broadcast"';
    if (messageHeader.senderID !== 'CRDB') return 'senderID must be "CRDB"';
    if (!messageHeader.receiverID) return 'receiverID is required';

    // Forbidden fields validation
    if (broadcastData.processID && broadcastData.processID !== '?') {
        return 'processID should not be present or should be "?"';
    }

    if (broadcastData.processVersion) {
        return 'processVersion should not be present';
    }

    if (broadcastData.relatedProcessID && broadcastData.relatedProcessID !== '?') {
        return 'relatedProcessID should not be present or should be "?"';
    }

    // Required fields validation
    if (processType !== 'MOBILE') return 'processType must be "MOBILE"';
    if (processName !== 'All') return 'processName must be "All"';
    if (!portedDate) return 'portedDate is required';

    if (!singleNumber || singleNumber.length === 0) return 'At least one singleNumber is required';

    // Validate each number
    for (const numberInfo of singleNumber) {
        if (!numberInfo.number) return 'Number is required in singleNumber';
        if (!numberInfo.recipientRC) return 'recipientRC is required';
        if (!numberInfo.donorRC) return 'donorRC is required';
        if (!numberInfo.nrhRC) return 'nrhRC is required';
        if (!numberInfo.portedAction) return 'portedAction is required';

        if (!['INSERT', 'UPDATE', 'DELETE'].includes(numberInfo.portedAction)) {
            return 'portedAction must be INSERT, UPDATE, or DELETE';
        }

        // Validate forbidden fields in singleNumber
        if (numberInfo.lrn) return 'lrn should not be present';
        if (numberInfo.serviceTypeSource) return 'serviceTypeSource should not be present';
        if (numberInfo.serviceTypeDestination) return 'serviceTypeDestination should not be present';
        if (numberInfo.imsi) return 'imsi should not be present';
        if (numberInfo.extension) return 'extension should not be present';
    }

    // Validate forbidden extension at broadcast level
    if (broadcastData.extension) {
        return 'extension should not be present at broadcast level';
    }

    return null; // No errors
}

// Process broadcast message (implement your database logic here)
export async function processBroadcastMessage(broadcastData) {
    try {
        console.log('Processing broadcast message:', {
            messageID: broadcastData.messageHeader.messageID,
            sender: broadcastData.messageHeader.senderID,
            receiver: broadcastData.messageHeader.receiverID,
            portedDate: broadcastData.portedDate,
            numberCount: broadcastData.singleNumber.length
        });

        // Process each ported number
        for (const numberInfo of broadcastData.singleNumber) {
            console.log('Processing number:', {
                number: numberInfo.number,
                recipientRC: numberInfo.recipientRC,
                donorRC: numberInfo.donorRC,
                nrhRC: numberInfo.nrhRC,
                portedAction: numberInfo.portedAction
            });

            // TODO: Implement your database storage logic here
            // Example: await storePortedNumber(numberInfo, broadcastData);
        }

        console.log(`Broadcast message ${broadcastData.messageHeader.messageID} processed successfully`);

    } catch (error) {
        console.error('Error in processBroadcastMessage:', error);
        throw error;
    }
}

// Create SOAP acknowledge response
export function createAcknowledgeResponse(messageID) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                  xmlns:por="http://portability.teletech.si">
  <soapenv:Header/>
  <soapenv:Body>
    <por:AcknowledgeMessage>
      <messageID>${messageID}</messageID>
      <status>
        <code>0</code>
        <description>OK</description>
      </status>
    </por:AcknowledgeMessage>
  </soapenv:Body>
</soapenv:Envelope>`;
}

// Create SOAP fault response
export function createSoapFault(message) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    <soapenv:Fault>
      <faultcode>soapenv:Server</faultcode>
      <faultstring>${message}</faultstring>
    </soapenv:Fault>
  </soapenv:Body>
</soapenv:Envelope>`;
}