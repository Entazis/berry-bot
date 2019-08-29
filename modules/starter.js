'use strict';

//TODO: cut long texts with reactions
//TODO: cut long quick/postback answers with numbering solution
//TODO: remove texting answers
//TODO: fix chat typing times

//https://emojipedia.org/
//https://photos.google.com/share/AF1QipOBDKpvyhQlGhT10QLj2K1Al5HD9cq3lwNEY5ibRMf1jP3r63QSHV3Tx2Bu_yADXA?key=RXBsMXdfU0hhQmFCRVhkU3V6RVV2czY4eHlIakZ3
module.exports = (bot) => {

    const startIntro = (convo) => {
        const text1 = 'Berry bot vagyok, egy robot és megtanítalak programozni! 🍓';
        const text2 = 'Sajnos nem vagyok túl okos robot, nem értek meg mindent, amit az emberek írnak nekem 😞';
        const text3 = 'Adok majd mindig válasz gombokat, amiket megértek.';
        const question4 = {
            text: 'Kattínts ezekre és így könnyedén megérthetjük egymást!',
            quickReplies: ['Rendben!']
        };

        const answer = (payload, convo) => {
            const text = payload.message.text;
            const sorry = 'Sajnálom de ezt nem értem, légyszíves kattints valamelyik gombra!';
            convo.say(sorry, options2).then(() => {
                convo.ask(question4, answer, callbacks, options2);
            });
        };
        const callbacks = [
            {
                event: 'quick_reply',
                callback: (payload, convo) => { askGoal(convo) }
            }
        ];
        const options1 = {
            typing: 1000
        };
        const options2 = {
            typing: 3000
        };
        const options3 = {
            typing: 5000
        };

        convo.say(text1, options2).then(() => {
            convo.say(text2, options2).then(() => {
                convo.say(text3, options2).then(() => {
                    convo.ask(question4, answer, callbacks, options2);
                });
            });
        });
    };

    const askGoal = (convo) => {
        const text1 = 'Mi a célod a programozással?';
        const question2 = {
            text: '1) Programozóként szeretnék dolgozni\n'+
            '2) Egy új hobbit szeretnék találni\n'+'3) Csak kíváncsi vagyok',
            quickReplies: ['️1) 🖥','2) ⚽','3) ❓']
        };

        const answer = (payload, convo) => {
            const text = payload.message.text;
            const sorry = 'Sajnálom de ezt nem értem, légyszíves kattints valamelyik gombra!';
            convo.set('goal', text);
            convo.say(sorry, options1).then(() => {
                convo.ask(question2, answer, callbacks, options1);
            });
        };
        const callbacks = [
            {
                event: 'quick_reply',
                callback: (payload, convo) => { askUsecase(convo) }
            }
        ];
        const options1 = {typing: 2000};
        const options2 = {typing: 3000};
        const options3 = {typing: 5000};

        convo.say(text1, options1).then(() => {
            convo.ask(question2, answer, callbacks, options1);
        });

    };

    const askUsecase = (convo) => {
        const text1 = 'Mire szeretnéd használni?';
        const question2 = {
            text: '1) Weblapkészítés\n'+'2) Mobilalkalmazások fejlesztése\n'+
            '3) Játékok készítése\n'+'4) Önálló kis eszközök bütykölése (okos otthon, Raspberry Pi)\n'+'5) Még nem tudom',
            quickReplies: [
                {
                    "content_type":"text",
                    "title":'1)',
                    "image_url":"http://www.admission.interculturel.org/wp-content/uploads/2016/04/WWW-Icon-2400px.png",
                    "payload":"USECASE_WEBPAGE"
                },
                {
                    "content_type":"text",
                    "title":"2)",
                    "image_url":"https://i.ebayimg.com/thumbs/images/g/fmgAAOSwNRdX2tiA/s-l225.jpg",
                    "payload":"USECASE_MOBILE"
                },
                {
                    "content_type":"text",
                    "title":"3)",
                    "image_url":"https://image.freepik.com/free-icon/game-controller_318-2146.jpg",
                    "payload":"USECASE_GAME"
                },
                {
                    "content_type":"text",
                    "title":"4)",
                    "image_url":"https://userscontent2.emaze.com/images/f74b9cf1-e19c-4f6a-8329-77c9d2a6da10/c660cd841de311d0992cccc7b31b3ce8.png",
                    "payload":"USECASE_IOT"
                },
                {
                    "content_type":"text",
                    "title":"5)",
                    "image_url":"https://image.freepik.com/free-icon/question-mark_318-52837.jpg",
                    "payload":"USECASE_UNKNOWN"
                }]
        };

        const answer = (payload, convo) => {
            const text = payload.message.text;
            const sorry = 'Sajnálom de ezt nem értem, légyszíves kattints valamelyik gombra!';
            convo.set('usecase', text);
            convo.say(sorry, options1).then(() => {
                convo.ask(question2, answer, callbacks, options2);
            });
        };
        const callbacks = [
            {
                event: 'quick_reply',
                callback: (payload, convo) => { endIntro(convo) }
            }
        ];
        const options1 = {typing: 1000};
        const options2 = {typing: 3000};
        const options3 = {typing: 5000};

        convo.say(text1, options2).then(() => {
            convo.ask(question2, answer, callbacks, options2);
        });
    };

    const endIntro = (convo) => {
        const text1 = 'Menő! :D';
        const text2 = 'Mindegy, hogy mi a végső célod, a programozás az egyik legjobb eszköz, amivel csak rendelkezhetsz. ⌨️️';
        const text3 = 'Ha tudsz kódolni, bármikor építhetsz weboldalakat, automatizálhatod az otthonod, vagy akár elküldheted a saját kis robotod a Marsra. ✈️';
        const question4 = {
            attachment: 'image',
            url: 'https://lh3.googleusercontent.com/ZnLOLCWEQZEE-n9LTW4BvyfNBBr6JYNM0smUZounc0HUtCUf2yJVXBfGEtAc-D-IKpoDuRRFh1WWA-9Nf_ZLGFO65UVavg65XosTpd-YKhmeqE5xSJmqHy6e69coXLEazRZgMLbS4urBjrXNGJt1tKfauaD_6muWHTD7RS_tMA22UHji6vL_kLOBNCGLOjaC3MN5sau-z6Re2sHpwdMjPBHMfFE-sQyEFMVlXi9SdmJP6UYhcpN_R5D2quSzOdYmQGa8yKah72F688pL4L3xtwp7jjq3-9VVNON4KkoN1SJD24j1wpvGYFkBbktl9fVTLzyVu96GBZ69ENMTDOHqf1xJKTbnDM6djNmohpWrSSLcVumYr3jKFyPnxEn66ZjQBWMcqSA3SMhmdxYWIG4CMjtqbQCi5HgG3lfZlpGx85vNxYd_LHSuMgFVu5ym3ILWh89WbjHVCyrwkkFuQ87FTn8NFn8EyLZvPIPa1nVxP_CaeR2rWTMARmKs9euI_Ko67GDrNcOHvkCXELLmfUTN7Hm2FxHX0rcPjSNbNew2NCJPMxSL-0QvPLjKcc9OYIbJ6c587aQLjK7ASSHF5TlF40XVWdpMgj1QX2CbDp7rG71Iaw7jEiCETWSqufIQC9zrOiN8CYJdu7n9lW9ivmV9IKI82ZJaLHfn=w360-h240-no',
            quickReplies: [
                {
                    "content_type":"text",
                    "title":'😯',
                    "payload": 'REACTION'
                },
                {
                    "content_type":"text",
                    "title":'😯',
                    "payload": 'REACTION'
                },
                {
                    "content_type":"text",
                    "title":'😯',
                    "payload": 'REACTION'
                }]
        };
        const text5 = 'Most, hogy a cél ott lebeg a szemed előtt, ideje megtenned az első lépéseket.';
        const question6 = {
            text: 'Készen állsz?😊',
            buttons: [
                {type: 'postback', title: 'Igeeen!', payload: 'READY_YES'},
                {type: 'postback', title: 'Nem', payload: 'READY_NO'}
            ]
        };

        const answer = (payload, convo) => {
            const sorry = 'Sajnálom de ezt nem értem, légyszíves kattints valamelyik gombra!';
            convo.say(sorry, options1).then(() => {
                convo.ask(question4, answer, callbacks, options2);
            });
        };
        const callbacks = [
            {
                event: 'quick_reply:REACTION',
                callback: (payload, convo) => {
                    convo.say(text5, options2).then(() => {
                        convo.ask(question6, answer, callbacks, options1);
                    });
                }
            },
            {
                event: 'postback:READY_YES',
                callback: (payload, convo) => {
                    convo.say('Akkor vágjunk is bele!', options1).then(() => {
                        task2(convo)
                    });
                }
            },
            {
                event: 'postback:READY_NO',
                callback: (payload, convo) => {
                    convo.say('Rendben, akkor majd ha készen állsz, szólj! ;)').then(() => {
                        convo.end()
                    });
                }
            }
        ];
        const options1 = {typing: 1000};
        const options2 = {typing: 3000};
        const options3 = {typing: 5000};

        convo.say(text1, options1).then(() => {
            convo.say(text2, options2).then(() => {
                convo.say(text3, options2).then(() => {
                    convo.ask(question4, answer, callbacks, options2);
                });
            });
        });
    };

    const task2 = (convo) => {
        const question1 = {
            text: 'Tudod mit csinál pontosan egy programozó? \n',
            quickReplies: ['Programozik!', 'Mit csinál?']
        };
        const question2a = 'Némileg leegyszerűsítve, a programozó olyan ember, aki képes beszélni a gépekkel. 💻';
        const question2b = 'A számítógépeink és mi olyanok vagyunk, mint két különböző ország lakosai, akik nem ugyanazt a nyelvet beszélik. 😶';
        const question2 = {
            text: 'Mi magyarul értünk, ők pedig a nullák és egyesek nyelvén. 🇭🇺 <-> 0110101️️️',
            quickReplies: ['Különböző nyelvek!']
        };
        const question3 = {
            text: 'Sajnos nem tudod egyszerűen, magyarul megkérni a gépedet arra, hogy köszönjön neked. ',
            quickReplies: ['Hogy hogy nem?', 'Miért nem?']
        };
        const question4a = 'Próbáld ki nyugodtan!';
        const question4b = 'Gépeld be az alábbi linkre, hogy "Üdvözölj engem!", majd nyomd meg az Entert.';
        const question4c = 'https://jsconsole.com/';
        const question4 = {
            text: '(Ne lepődj meg, nem fog működni. Egy fura hibaüzenetet fogsz kapni, de ez most rendben van így.)',
            quickReplies: ['Tényleg hibát dobott', '😞']
        };
        const question5a = 'Látod?';
        const question5b = 'A számítógép nem értett meg.';
        const question5 = {
            text: 'Ne aggódj, ez hamarosan változni fog.',
            quickReplies: ['Akkor nem aggódom!']
        };

        const answer = (payload, convo) => {
            convo.say(question2a, {typing: 3000}).then(() => {
                convo.say(question2b, {typing: 3000}).then(() => {
                    convo.ask(question2, answer2, callbacks, options);
                });
            });
        };
        const answer2 = (payload, convo) => {convo.ask(question3, answer3, callbacks, options)};
        const answer3 = (payload, convo) => {
            convo.say(question4a, {typing: 3000}).then(() => {
                convo.say(question4b, {typing: 3000}).then(() => {
                    convo.say(question4c, {typing: 3000}).then(() => {
                        convo.ask(question4, answer4, callbacks, options);
                    });
                });
            });
        };
        const answer4 = (payload, convo) => {
            convo.say(question5a, {typing: 2000}).then(() => {
                convo.say(question5b, {typing: 2000}).then(() => {
                    convo.ask(question5, () => task3(convo), callbacks, options);
                });
            });
        };

        const callbacks = [];
        const options = {typing: 3000};

        convo.ask(question1, answer, callbacks, options);

    };

    const task3 = (convo) => {
        const question1 = {
            text: 'A nyelvi szakadék elméletileg két módon hidalható át.',
            quickReplies: ['Mi az a két mód?']
        };
        const question2a = 'Egy: megtanulhatunk mi az egyesek és nullák nyelvén "beszélni".';
        const question2 = {
            text: 'Ez a legtöbb ember számára azonban közel lehetetlen, és biztosan mindenkinek nagyon kényelmetlen lenne. 😐',
            quickReplies: ['Az biztos!', 'Nehéz lenne!']
        };
        const question3a = 'Kettő: a számítógépeket tanítjuk meg arra, hogy megértsék a mi nyelvünket.';
        const question3b = 'Ez lenne a végcél, amin most is rengeteg okos ember dolgozik. ⛏️';
        const question3c = 'Ehhez azonban még időre van szükség. ⏳';
        const question3d = 'Időközben szükségünk van egy közös nyelvre, amit mi is képesek vagyunk beszélni, és a gépek is képesek megérteni.';
        const question3 = {
            text: 'Több ilyen is létezik – ezeket nevezzük programozási nyelveknek.',
            quickReplies: ['Programozási nyelvek?']
        };
        const question4a = 'Térjünk vissza az üdvözlési problémánkra. 🔙';
        const question4b = 'Szeretnénk, ha a gép köszönne nekünk, és ahhoz, hogy ezt megértse, valamilyen programnyelven kell megkérnünk a feladatra.';
        const question4c = 'Most másold át a következő sort ismét ide: https://jsconsole.com/, majd nyomj egy Entert.';
        const question4 = {
            text: 'function greetMe() { return \'Hello, emberi barátom!\'; } greetMe();',
            quickReplies: ['Oh ez sikeres volt!', 'Megértett!']
        };
        const question5a = 'Nézd csak – a gép megértett, és köszönt neked!';
        const question5b = 'Miért?';
        const question5c = 'Mert a közös nyelven fogalmaztad meg az utasításaidat.';
        const question5 = {
            text: 'Gratulálok, épp most írtad meg életed első utasítását a JavaScript nevű programozási nyelven!',
            quickReplies: ['😎', '😎', '😎', '😎', '😎']
        };

        const answer1 = (payload, convo) => {
            convo.say(question2a, {typing: 3000}).then(() => {
                convo.ask(question2, answer2, callbacks, options);
            });
        };
        const answer2 = (payload, convo) => {
            convo.say(question3a, {typing: 3000}).then(() => {
                convo.say(question3b, {typing: 3000}).then(() => {
                    convo.say(question3c, {typing: 3000}).then(() => {
                        convo.say(question3d, {typing: 3000}).then(() => {
                            convo.ask(question3, answer3, callbacks, options);
                        });
                    });
                });
            });
        };
        const answer3 = (payload, convo) => {
            convo.say(question4a, {typing: 3000}).then(() => {
                convo.say(question4b, {typing: 3000}).then(() => {
                    convo.say(question4c, {typing: 3000}).then(() => {
                        convo.ask(question4, answer4, callbacks, options);
                    });
                });
            });
        };
        const answer4 = (payload, convo) => {
            convo.say(question5a, {typing: 3000}).then(() => {
                convo.say(question5b, {typing: 3000}).then(() => {
                    convo.say(question5c, {typing: 3000}).then(() => {
                        convo.ask(question5, () => task4(convo), callbacks, options);
                    });
                });
            });
        };

        const callbacks = [];
        const options = {typing: 3000};

        convo.ask(question1, answer1, callbacks, options);
    };

    const task4 = (convo) => {
        const question1a = 'A programozási nyelvek (mint a JavaScript) közted és a gép között állnak.';
        const question1b = 'Te leírod a gondolataid JavaScriptben, amelyet a gép aztán képes elolvasni, és egyesekké, illetve nullákká alakítva értelmezni.';
        const question1 = {
            text: 'A JavaScript a közös nyelv, amelyet mindketten beszéltek.',
            quickReplies: ['Aha!']
        };
        const question2a = 'Alapvetően ez az, amit a programozók csinálnak. 👨‍💻';
        const question2 = {
            text: 'Gondolhatsz rájuk úgy is, mint egyfajta nyelvészekre, akik a számítógépek nyelveivel foglalkoznak.',
            quickReplies: ['💻']
        };
        const question3 = {
            attachment: 'image',
            url: 'https://lh3.googleusercontent.com/nabOBQJ7IFWwDDhq1XeJtVVqBIEQdBt4z2mQuOW971IxqshlOq1l71mUnGgqFuGyKXm7tIEmrYXYFlw2gw51ZSiwgqCQ8aNFGHDNi8FCI2g34tnPIo3Nxu97Pc7EV6fHASie3XLriAWP6BVhYsLe9ju_qrzSEBRRMz-rPfB_HbYeIO-DBWJcnBpfU907cyvIo8AZlJRvifokkAGuKHjqf6WXvq2_vLM_-7oj8o13Q4sjJKfVGLPwAMEiNKl7jrXTQFW_wT7PI6KwznAUGVKFT4B-BsMKQWikGwvGNOWmCid11rjHXlfi6e8nL7U75cJdyGaVU-A9afmdblaiDcrvHocfApwYSF93wfxqoNDCnujpgIdutWd4t80nA8ag-qmsQTeUUjekx90RI0SKJvDS7A-EpGqmCro3Z6DVEwkgu4-EFZE1E5wvVkB___pn_Y0WMK9McksovxX5r3j66jz2OhvROgFOPXMEoTl44F_myvUoKDrAsrWpfISRss_7W1-6u8L00bLySkRaqeh36pNT4tclybgF3kQ8JYz65u87vZBpY99fLMFlfj_jiSoPNYzG1qoTCOhxBKP-ArhXjvLlwd2dfSpHqwhkpPMYuh-syDtekpscSWBKyb-bZ6avU5WldvqPe5XF9_MysykIKducNXpimdFPt0A6=w600-h450-no',
            quickReplies: ['😄']
        };
        const question4a = 'Több tucat különféle programozási nyelv létezik (például PHP, Python, Java és C#), de az alapvető logika ugyanaz mögöttük.';
        const question4 = {
            text: 'A kurzus során mi főként a JavaScriptről fogunk beszélni, de az alapelvek ugyanúgy érvényesek lennének bármelyik másik nyelvre is.',
            quickReplies: ['Rendben']
        };

        const answer1 = (payload, convo) => {
            convo.say(question2a, options).then(() => {
                convo.ask(question2, answer2, callbacks, options);
            });
        };
        const answer2 = (payload, convo) => {
            convo.ask(question3, answer3, callbacks, options)
        };
        const answer3 = (payload, convo) => {
            convo.say(question4a, options).then(() => {
                convo.ask(question4, () => task5(convo), callbacks, options);
            });
        };

        const callbacks = [];
        const options = {typing: 3000};

        convo.say(question1a, options).then(() => {
            convo.say(question1b, options).then(() => {
                convo.ask(question1, answer1, callbacks, options);
            });
        });
    };

    const task5 = (convo) => {
        const question1a = 'Ahogy az előbb már megállapítottuk, a programozó az az ember, aki ért a gépek nyelvén.';
        const question1 = {
            text: 'Gyakran fejlesztőknek hívjuk őket, mivel programokat fejlesztenek. 💻',
            quickReplies: ['💻']
        };
        const question2a = 'Sokféle fejlesztő van a világban, akik rengetegféle dolgot csinálnak.';
        const question2 = {
            text: 'A játékfejlesztők játékokat 🎮, az alkalmazásfejlesztők alkalmazásokat 🔁, és a webfejlesztők – igen, jól tippeltél – weboldalakat készítenek 🌐.',
            quickReplies: ['🎮', '🔁', '🌐']
        };
        const question3 = {
            text: 'Mi az utóbbira fogunk koncentrálni, és azt tanítjuk meg, hogyan legyél webfejlesztő.',
            quickReplies: ['😊']
        };
        const question4a = 'Egy gyors kérdés!';
        const question4b = 'Mit gondolsz, mire használjuk manapság a weboldalakat?';
        const question4 = {
            text:
            '1) Információ átadásra (mint egy személyes blog vagy egy kisebb üzleti weboldal)\n'+
            '2) Komplex feladatok megoldására (képek szerkesztése, azonnali üzenetküldésre stb.)\n'+
            '3) Játékokra',
            quickReplies: ['1) ℹ️','2) 💬','3) 🎮']
        };
        const question5a = 'Igen, erre is, de...';
        const question5b = '..az internet annyira erős lett az utóbbi pár évben, hogy most már majdnem minden alkalmazást el tudunk készíteni a neten. 💪';
        const question5c = 'Ezeket az összetett alkalmazásokat netes alkalmazásoknak (webappoknak) hívjuk. 🕸️';
        const question5d = 'Webfejlesztőként egyaránt képes leszel ilyen alkalmazások és egyszerűbb weboldalak készítésére is, mint például egy kis céges honlap vagy egy blog.';
        const question5 = {
            text: 'Jól hangzik?',
            quickReplies: ['Igen!', 'Nem igazán']
        };
        const question6a = 'Akkor haladjunk is tovább!';

        const answer1 = (payload, convo) => {
            convo.say(question2a, options).then(() => {
                convo.ask(question2, answer2, callbacks, options);
            });
        };
        const answer2 = (payload, convo) => {
            convo.ask(question3, answer3, callbacks, options)
        };
        const answer3 = (payload, convo) => {
            convo.say(question4a, options).then(() => {
                convo.say(question4b, options).then(() => {
                    convo.ask(question4, answer4, callbacks, options);
                });
            });
        };
        const answer4 = (payload, convo) => {
            convo.say(question5a, options).then(() => {
                convo.say(question5b, options).then(() => {
                    convo.say(question5c, options).then(() => {
                        convo.say(question5d, options).then(() => {
                            convo.ask(question5, answer5, callbacks, options);
                        });
                    });
                });
            });
        };
        const answer5 = (payload, convo) => {
            convo.say(question6a, options).then(() => convo.end()) ;
        };

        const callbacks = [];
        const options = {typing: 3000};

        convo.say(question1a, options).then(() => {
            convo.ask(question1, answer1, callbacks, options);
        });

    };

    bot.on(['message'], (payload, chat, data) => {

        if (data.captured){ return; }

        chat.getUserProfile().then((user) => {
            const text1 = `Szia, ${user.first_name}! Örülök, hogy megtaláltál! 🌞`;

            chat.say(text1, {typing: 1000}).then(() => {
                chat.conversation((convo) => {
                    console.log('starting conversation with user: ' + convo.userId);
                    startIntro(convo);
                });
            });
        });


    });

    bot.on('postback', (payload, chat) => {

        chat.getUserProfile().then((user) => {
            const text1 = `Szia, ${user.first_name}! Örülök, hogy megtaláltál! 🌞`;

            chat.say(text1, {typing: 1000}).then(() => {
                chat.conversation((convo) => {
                    console.log('starting conversation with user: ' + convo.userId);
                    startIntro(convo);
                });
            });
        });

    });

};