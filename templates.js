
//https://emojipedia.org/

module.exports = (bot) => {

    const task = (convo) => {
        const question = {
            text: '',
            quickReplies: ['']
        };
        const say = '';
        const say = {
            text: 'What do you want to eat today?',
            quickReplies: ['Mexican', 'Italian', 'American', 'Argentine']
        };

        const answer1 = (payload, convo) => {convo.ask(question2, answer2, callbacks, options)};
        const answer2 = (payload, convo) => {convo.ask(question3, answer3, callbacks, options)};
        const answer3 = (payload, convo) => {convo.say(say1); convo.ask(question4, answer4, callbacks, options)};
        const answer4 = (payload, convo) => {convo.ask(question5, () => convo.end(), callbacks, options)};

        const callbacks = [];
        const options = {typing: 3000};

        convo.ask(question1, answer1, callbacks, options);
    };

    const task_1 = (convo) => {
        const text1 = '';
        const text2 = '';
        const text3 = '';
        const question4 = {
            text: '',
            quickReplies: ['']
        };

        const answer = (payload, convo) => {
            const text = payload.message.text;
            const sorry = 'Sajnálom de ezt nem értem, légyszíves kattints valamelyik gombra!';
            convo.say(sorry, options1).then(() => {
                convo.ask(question4, answer, callbacks, options2);
            });
        };
        const callbacks = [
            {
                event: 'quick_reply',
                callback: (payload, convo) => { task_2(convo) }
            }
        ];
        const options1 = {typing: 1000};
        const options2 = {typing: 3000};
        const options3 = {typing: 5000};

        convo.say(text1, options2).then(() => {
            convo.say(text2, options2).then(() => {
                convo.say(text3, options2).then(() => {
                    convo.ask(question4, answer, callbacks, options2);
                });
            });
        });
    };

    bot.on('message', (payload, chat, data) => {

        if (data.captured){ return; }

        chat.getUserProfile().then((user) => {
            chat.say(`Szia, ${user.first_name}! Örülök, hogy megtaláltál!`, {typing: 1000});
        });
        chat.conversation((convo) => {
            console.log('starting conversation with user: ' + convo.userId);
            convo.sendTypingIndicator(3000).then(() => task(convo));
        });

    });
};
