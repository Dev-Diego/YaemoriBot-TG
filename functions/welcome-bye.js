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
    const welcomeMessage = `Hola @${newUser.username || newUser.first_name} Bienvenido al grupo`;

    let welcomePhoto = 'https://telegra.ph/file/463f16729bffb12ca9525.jpg'; 
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
    const goodbyeMessage = `El usuario @${leftUser.username || leftUser.first_name} Salio recientemente del grupo`;

    let goodbyePhoto = 'https://telegra.ph/file/69a02dc67119e535849f3.jpg'; 
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