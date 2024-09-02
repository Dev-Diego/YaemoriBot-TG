const fs = require('fs');
const path = require('path');
const { Telegraf } = require('telegraf');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const welcomeStickerPath = path.join('/home/container/src/welc.webp');
const goodbyeStickerPath = path.join('/home/container/src/bye.webp');

DC.on('new_chat_members', async (ctx) => {
    const newUser = ctx.message.new_chat_member;
    const welcomeMessage = `┌─★ 𝚈𝚊𝚎𝚖𝚘𝚛𝚒𝙱𝚘𝚝-𝙼𝙳 🌱 
│「 𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗼 ☁ 」
└┬★ 「 @${newUser.username || newUser.first_name} 」
 │🌺  𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗼/𝗮
 │🌺  ${groupMetadata.subject}
 └───────────────┈ ⳹`;

    let welcomePhoto = 'https://telegra.ph/file/89f5d91864bb5d02f50cd.jpg'; 
    if (newUser.photo && newUser.photo.length > 0) {
        const photoFileId = newUser.photo[newUser.photo.length - 1].file_id;
        welcomePhoto = await ctx.telegram.getFileLink(photoFileId);
    }

    await ctx.replyWithPhoto({ url: welcomePhoto }, { caption: welcomeMessage, parse_mode: 'Markdown' });

    const keyboard = {
        reply_markup: {
            inline_keyboard: [[
                { text: 'Bienvenida', callback_data: 'welcome' }
            ]]
        }
    };

    await ctx.reply('¿Quieres dar la bienvenida?', keyboard);
});

DC.on('left_chat_member', async (ctx) => {
    const leftUser = ctx.message.left_chat_member;
    const goodbyeMessage = `┌─★ 𝚈𝚊𝚎𝚖𝚘𝚛𝚒𝙱𝚘𝚝-𝙼𝙳 🌱 
│「 𝗔𝗗𝗜𝗢𝗦 🌸 」
└┬★ 「 @${leftUser.username || leftUser.first_name} 」   
 │🌺  𝗦𝗲 𝗳𝘂𝗲  
 │🌺 𝗡𝘂𝗻𝗰𝗮 𝘁𝗲 𝗾𝘂𝗶𝘀𝗶𝗺𝗼𝘀 𝗮𝗾𝘂𝗶
 └───────────────┈ ⳹`;

    let goodbyePhoto = 'https://telegra.ph/file/b5a775dd27714fdeaee57.jpg'; 
    if (leftUser.photo && leftUser.photo.length > 0) {
        const photoFileId = leftUser.photo[leftUser.photo.length - 1].file_id;
        goodbyePhoto = await ctx.telegram.getFileLink(photoFileId); 
    }

    await ctx.replyWithPhoto({ url: goodbyePhoto }, { caption: goodbyeMessage, parse_mode: 'Markdown' });

    const keyboard = {
        reply_markup: {
            inline_keyboard: [[
                { text: 'Despedida', callback_data: 'goodbye' }
            ]]
        }
    };

    await ctx.reply('¿Quieres despedirte?', keyboard);
});

DC.action('welcome', async (ctx) => {
    await ctx.replyWithSticker({ source: fs.createReadStream(welcomeStickerPath) });
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id); 
});

DC.action('goodbye', async (ctx) => {
    await ctx.replyWithSticker({ source: fs.createReadStream(goodbyeStickerPath) });
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id); 
});

module.exports = DC;