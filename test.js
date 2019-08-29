'use strict';

const BootBot = require('bootbot');
const bot = new BootBot({
    accessToken: '',
    verifyToken: 'berry-bot-boot',
    appSecret: ''
});

function firstEntity(nlp, name) {
    return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
}

bot.on('message', (payload, chat, data) => {
    console.log('A text message was received!');

    const userId = payload.sender.id;
    const greeting = firstEntity(payload.message.nlp, 'greeting');
    const datetime = firstEntity(payload.message.nlp, 'datetime');
    const location = firstEntity(payload.message.nlp, 'location');
    const text = payload.message.text;

    if (data.captured == false){

        if (greeting && greeting.confidence > 0.8) {
            chat.say('Hi there!')
        } else if (datetime && datetime.confidence > 0.8) {
            chat.say(`Oh a date time! Do you mean: ${datetime.value}`)
        }  else if (location && location.confidence > 0.8) {
            chat.say(`Location! ${location.value}`)
        } else {
            chat.say(`You said that: ${text}`);
            //bot.say(userId, 'Hello World');
        }
    }
});

bot.on('quick_reply', (payload, chat) => {
    //const text = payload.message.text;
    chat.say(`Oh that was quick!`);
});

bot.on('attachment', (payload, chat) => {
    //const text = payload.message.text;
    console.log('An attachment was received!');
    chat.say(`Thank you for the attachment!`);
});

bot.on('postback', (payload, chat) => {
    //console.log(`Postback has arrived: ${text}`);
    chat.say(`You sent your message with a postback!`);
});
bot.on('postback:HELP_ME', (payload, chat) => {
    console.log('The Help Me button was clicked!');
});

bot.on('delivery', (payload, chat) => {
    //const text = payload.message.text;
    console.log(`My message was arrived!`);
});

bot.on('read', (payload, chat) => {
    //const text = payload.message.text;
    console.log(`The user has read the message!`);
});

bot.on('authentication', (payload, chat) => {
    //const text = payload.message.text;
    console.log(`A user has started a conversation with the bot using a "Send to Messenger" button!`);
});

bot.on('referral', (payload, chat) => {
    //const text = payload.message.text;
    console.log(`Referral has occurred!`);
});

bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
    console.log('The user said "hello", "hi", "hey", or "hey there"');
    chat.say('Hello, human friend!').then(() => {
        chat.say('How are you today?', { typing: true });
    });
});
bot.hear([/how do you do?/], (payload, chat) => {
    // Passing an array will make subsequent calls to the .say() method
    // For example, calling:
    chat.say(['how', 'do', 'you', 'do', '?']);
});
bot.hear([/(good)?bye/i, /see (ya|you)/i, 'adios'], (payload, chat) => {
    // Matches: goodbye, bye, see ya, see you, adios
    chat.say('Bye, human!');
});

bot.hear(['food', 'hungry', /food/, /hungry/], (payload, chat) => {
    // Send a text message with quick replies
    chat.say({
        text: 'What do you want to eat today?',
        quickReplies: ['Mexican', 'Italian', 'American', 'Argentine']
    }, { typing: true });
});

bot.hear([/color/], (payload, chat) => {
    // Send a button template
    chat.say({
        text: 'What is your favorite color?',
        buttons: [
            { type: 'postback', title: 'Red', payload: 'FAVORITE_RED' },
            { type: 'postback', title: 'Blue', payload: 'FAVORITE_BLUE' },
            { type: 'postback', title: 'Green', payload: 'FAVORITE_GREEN' }
        ]
    }, { typing: true });
});

bot.hear([/cat/], (payload, chat) => {
    // Send a list template
    chat.say({
        elements: [
            { title: 'Cat 1', image_url: 'http://www.public-domain-photos.com/free-cliparts-1-big/animals/housecats/gatto_cat_architetto_fra_01.png', default_action: {} },
            { title: 'Cat 2', image_url: 'http://icons.iconarchive.com/icons/iconka/meow/256/cat-grumpy-icon.png', default_action: {} }
        ],
        buttons: [
            { type: 'postback', title: 'View More', payload: 'VIEW_MORE' }
        ]
    }, { typing: true });
});

bot.hear([/dog/], (payload, chat) => {
    // Send a generic template
    chat.say({
        cards: [
            { title: 'Dog 1', image_url: 'https://www.dog-breeds-expert.com/images/chihuahua-in-cup.jpg', default_action: {} },
            // { title: 'Dog 2', image_url: 'https://flavorwire.files.wordpress.com/2014/08/miniature-teacup-chihuahua-1.jpg', default_action: {} }
        ]
    }, { typing: true });
});

bot.hear([/random/], (payload, chat) => {
    // Send an attachment
    chat.say({
        attachment: 'video',
        url: 'https://www.youtube.com/watch?v=nG2rNBFzkGE'
    }, { typing: true });
});

bot.hear([/music/], (payload, chat) => {
    // Send an attachment
    chat.say('https://www.youtube.com/watch?v=NyEE0qpfeig', { typing: true });
});

bot.hear(['help'], (payload, chat) => {
    // Send a text message with buttons
    chat.say({
        text: 'What do you need help with?',
        buttons: [
            { type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
            { type: 'postback', title: 'FAQ', payload: 'HELP_FAQ' },
            { type: 'postback', title: 'Talk to a human', payload: 'HELP_HUMAN' }
        ]
    }, { typing: true });
});

bot.hear('image', (payload, chat) => {
    // Send an attachment
    chat.say({
        attachment: 'image',
        url: 'http://www.pngmart.com/files/2/Mario-Transparent-Background.png'
    }, { typing: true });
});

bot.hear('ask me something', (payload, chat) => {

    const askName = (convo) => {
        convo.ask(`What's your name?`, (payload, convo) => {
            const text = payload.message.text;
            convo.set('name', text);
            convo.say(`Oh, your name is ${text}`).then(() => askFavoriteFood(convo));
        });
    };

    const askFavoriteFood = (convo) => {
        convo.ask(`What's your favorite food?`, (payload, convo) => {
            const text = payload.message.text;
            convo.set('food', text);
            convo.say(`Got it, your favorite food is ${text}`).then(() => sendSummary(convo));
        });
    };

    chat.conversation((convo) => {
        askName(convo);
    });

    const sendSummary = (convo) => {
        convo.say(`Ok, here's what you told me about you:
	      - Name: ${convo.get('name')}
	      - Favorite Food: ${convo.get('food')}`);
        convo.end();
    };
});

bot.start();