const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');

const token ='1137756877:AAHrKyiB0J1aBM3R49AFKUdMhO-d3PL0L-8';

const bot = new TelegramBot(token, { polling: true} );

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;
    
    if (dfResponse.intent === 'Treino Especifico'){
        responseText =  await youtube.searchVideoURL(responseText, dfResponse.fields.corpo.stringValue);
    }

    bot.sendMessage(chatId, responseText);
});