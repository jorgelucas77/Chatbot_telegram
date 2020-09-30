const dialogflow = require('dialogflow');
const configs = require('./diojl-bot.json');

const sessionClient = new dialogflow.SessionsClient({
    projectId: configs.project_id,
    credentials: {
        private_key: configs.private_key,
        client_email: configs.client_email
    }
});

async function sendMessage(chatId, message){
    const sessionPath = sessionClient.sessionPath(configs.project_id, chatId);
    const request = {
        session: sessionPath,
        queryImput: {}
    };

    const textQueryInput = { text: { text: message, languageCode: 'pt-PT' } };
    const eventQueryInput = { event: { name: 'start', languageCode: 'pt-PT' } };

    request.queryInput = message === '/start' ?  eventQueryInput : textQueryInput;
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    return { text: result.fulfillmentText, intent: result.intent.displayName, fields: result.parameters.fields };

};

module.exports.sendMessage = sendMessage;