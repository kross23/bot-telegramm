process.env["NTBA_FIX_319"] = 1;
'use strict';
const TelegramApi = require('node-telegram-bot-api');

const token = '1894607358:AAGBdkEKlKWWF99pXzQoBgH2qXLYDWlg-HA';
const randomsNumber = () => {
   return Math.ceil(Math.random()*10);
}
const chats = {};
const gameOntyons = {
   reply_markup:JSON.stringify({
      inline_keyboard:[
         [{text:"техт кнопки1", callback_data:"1"},{text:"техт кнопки2", callback_data:"2"},{text:"техт кнопки3", callback_data:"3"}],
         [{text:"техт кнопки4", callback_data:"4"},{text:"техт кнопки5", callback_data:"5"},{text:"техт кнопки6", callback_data:"6"}],
         [{text:"техт кнопки7", callback_data:"7"},{text:"техт кнопки8", callback_data:"8"},{text:"техт кнопки9", callback_data:"9"}],
         {text:"техт кнопки10", callback_data:"10"}
         
      ]
   })
}
const start = () => {
    const bot = new TelegramApi(token, {polling:true});//
    bot.setMyCommands([{command:'/start', description:'начальное приветствие'},
                      {command:'/info',  description:'информация о пользователе'},
                      {command:'/game',  description:'game'}]);
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === "/start"){
           await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/055/2a1/0552a1f8-f015-4025-b093-0619dd13fdfc/5.webp');
           return bot.sendMessage(chatId, `добро пожаловать`);
        }
        if(text === "/info"){
           return bot.sendMessage(chatId, `тебя зовут ${msg.from.first_name}`);
        }
        if(text === 'урод'){
           return bot.sendMessage(chatId, 'сам урод');
        }
        if(text === '/game'){
         await bot.sendMessage(chatId, `сейчас я загадаю цифру от 1 до 10`);
         const numb = await randomsNumber();
         chats[chatId] = numb;
         console.log('chats[chatId]: ', chats[chatId]);
         return bot.sendMessage(chatId, `отгадывай время пошло ....`, gameOntyons);
        }
        return bot.sendMessage(chatId, 'извини я ограничен в ответах технолигиями мого времени,правильно задавай вопросы.');
    });
    bot.on('callback_query', msg => {
       const data = msg.data;
       const chatid = msg.message.chat.id;
       
       if(data == chats[chatid]){
        return bot.sendMessage(chatid, ` ${data} угадал поздравляю`);
       }else{
         return bot.sendMessage(chatid, `${data} не угадал загадана цифра ${chats[chatid]}`);
       }
       
       console.log(msg);
    })
};
start();