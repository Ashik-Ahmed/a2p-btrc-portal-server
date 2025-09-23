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

        // Extract message header with all optional fields
        const messageHeader = broadcast.messageHeader;
        if (!messageHeader) {
            throw new Error('messageHeader not found');
        }

        // Handle singleNumber (could be array or single object)
        let singleNumber = broadcast.singleNumber;
        if (singleNumber) {
            if (!Array.isArray(singleNumber)) {
                singleNumber = [singleNumber];
            }
        } else {
            singleNumber = [];
        }

        // Handle extensions (could be array or single object)
        let extensions = broadcast.extension;
        if (extensions && !Array.isArray(extensions)) {
            extensions = [extensions];
        }

        return {
            messageHeader: {
                messageID: messageHeader.messageID,
                messageName: messageHeader.messageName,
                messageVersion: messageHeader.messageVersion,
                messageType: messageHeader.messageType,
                password: messageHeader.password,
                username: messageHeader.username,
                securityToken: messageHeader.securityToken,
                senderID: messageHeader.senderID,
                receiverID: messageHeader.receiverID,
                timestamp: messageHeader.timestamp,
                priority: messageHeader.priority,
                recipientNO: messageHeader.recipientNO,
                recipientSO: messageHeader.recipientSO,
                recipientBrand: messageHeader.recipientBrand,
                donorNO: messageHeader.donorNO,
                donorSO: messageHeader.donorSO,
                document: messageHeader.document,
                extension: messageHeader.extension
            },
            processID: broadcast.processID,
            processType: broadcast.processType,
            processVersion: broadcast.processVersion,
            processName: broadcast.processName,
            relatedProcessID: broadcast.relatedProcessID,
            portedDate: broadcast.portedDate,
            singleNumber: singleNumber,
            extension: extensions
        };
    } catch (error) {
        console.error('Error parsing XML with xml2js:', error);
        return null;
    }
}

// Validate broadcast message according to rules
export function validateBroadcastMessage(broadcastData) {
    const { messageHeader, processType, processName, portedDate, singleNumber } = broadcastData;

    // Required field validation based on business rules
    if (!messageHeader?.messageID) return 'messageID is required';
    if (!messageHeader?.messageType) return 'messageType is required';
    if (!messageHeader?.senderID) return 'senderID is required';
    if (!messageHeader?.receiverID) return 'receiverID is required';
    if (!messageHeader?.timestamp) return 'timestamp is required';

    // Business rule validations from documentation
    if (messageHeader.messageName && messageHeader.messageName !== 'Broadcast') {
        return 'messageName must be "Broadcast" if present';
    }

    if (messageHeader.messageType !== 'Broadcast') {
        return 'messageType must be "Broadcast"';
    }

    if (messageHeader.senderID !== 'CRDB') {
        return 'senderID must be "CRDB"';
    }

    // Process validation based on business rules
    if (processType && processType !== 'MOBILE') {
        return 'processType must be "MOBILE" if present';
    }

    if (processName !== 'All') {
        return 'processName must be "All"';
    }

    if (!portedDate) return 'portedDate is required';

    // SingleNumber validation
    if (!singleNumber || singleNumber.length === 0) {
        return 'At least one singleNumber is required';
    }

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

        // Business rule: These fields should not be present in broadcast
        if (numberInfo.lrn) {
            console.warn('lrn field present in broadcast - ignoring as per business rules');
        }
        if (numberInfo.serviceTypeSource) {
            console.warn('serviceTypeSource field present in broadcast - ignoring as per business rules');
        }
        if (numberInfo.serviceTypeDestination) {
            console.warn('serviceTypeDestination field present in broadcast - ignoring as per business rules');
        }
        if (numberInfo.imsi) {
            console.warn('imsi field present in broadcast - ignoring as per business rules');
        }
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
            timestamp: broadcastData.messageHeader.timestamp,
            processName: broadcastData.processName,
            portedDate: broadcastData.portedDate,
            numberCount: broadcastData.singleNumber.length
        });

        // Log optional fields if present
        if (broadcastData.processID) {
            console.log('processID:', broadcastData.processID);
        }
        if (broadcastData.processType) {
            console.log('processType:', broadcastData.processType);
        }
        if (broadcastData.relatedProcessID) {
            console.log('relatedProcessID:', broadcastData.relatedProcessID);
        }

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

            // TODO: Implement your database storage logic here
            // Example: await storePortedNumber(numberData, broadcastData);

            // Handle portedAction based on business rules
            switch (numberInfo.portedAction) {
                case 'INSERT':
                    // New porting - store new record
                    break;
                case 'UPDATE':
                    // Number ported again to different operator - update existing record
                    break;
                case 'DELETE':
                    // Number returned to NRH - delete or mark as inactive
                    break;
            }
        }

        console.log(`Broadcast message ${broadcastData.messageHeader.messageID} processed successfully`);

    } catch (error) {
        console.error('Error in processBroadcastMessage:', error);
        throw error;
    }
}

// Create SOAP acknowledge response
export function createAcknowledgeResponse(messageID) {
    const timestamp = new Date().toISOString();

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