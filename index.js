'use strict';
const BootBot = require('bootbot');
const config = require('config');
const starterModule = require('./modules/starter');
const fetch = require('node-fetch');
const GIPHY_URL = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=';

const bot = new BootBot({
    accessToken: config.get('access_token'),
    verifyToken: config.get('verify_token'),
    appSecret: config.get('app_secret')
});
function firstEntity(nlp, name) {
    return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
}

bot.module(starterModule);

bot.hear(/gif (.*)/i, (payload, chat, data) => {
    const query = data.match[1];
    chat.say('Searching for the perfect gif...');
    fetch(GIPHY_URL + query)
        .then(res => res.json())
        .then(json => {
            chat.say({
                attachment: 'image',
                url: json.data.image_url
            }, {
                typing: true
            });
        });
});

bot.setGreetingText('Berry-bot vagyok és szívesen megtanítalak programmozni! Csak kattínts a lent található "Get Started" gombra!');
bot.setPersistentMenu([
    {
        type: 'postback',
        title: 'emlékeztető beállítása',
        payload: 'PERSISTENT_MENU_REMINDER'
    },
    {
        type: 'postback',
        title: 'HTML alapok',
        payload: 'PERSISTENT_MENU_HTML'
    },
    {
        type: 'postback',
        title: 'CSS alapok',
        payload: 'PERSISTENT_MENU_CSS'
    }
]);
bot.on('postback:PERSISTENT_MENU_REMINDER', (payload, chat) => {
    chat.say('postback:PERSISTENT_MENU_REMINDER');
});
bot.on('postback:PERSISTENT_MENU_HTML', (payload, chat) => {
    chat.say('postback:PERSISTENT_MENU_HTML');
});
bot.on('postback:PERSISTENT_MENU_CSS', (payload, chat) => {
    chat.say('postback:PERSISTENT_MENU_CSS');
});
//bot.deletePersistentMenu();

bot.setGetStartedButton('Szia Berry-bot!');

bot.start();