const fs = require('fs');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');

async function kiss() {
    try {
        DC.command(['kiss', 'beso', 'besar'], async (ctx) => {
            logCommand(ctx);
            try {
                
                if (ctx.message && ctx.message.reply_to_message) {
                    let mentionedUser = ctx.message.reply_to_message.from.id;

                    const user = await ctx.telegram.getChatMember(ctx.chat.id, mentionedUser);
                    const victimName = user.user.username || user.user.first_name;

                    const senderName = ctx.from.username || ctx.from.first_name;
                    const message = `@${senderName} Le dio besos a @${victimName}`;

                    const videos = [
                        'https://telegra.ph/file/d6ece99b5011aedd359e8.mp4',
                        'https://telegra.ph/file/ba841c699e9e039deadb3.mp4',
                        'https://telegra.ph/file/6497758a122357bc5bbb7.mp4',
                        'https://telegra.ph/file/8c0f70ed2bfd95a125993.mp4',
                        'https://telegra.ph/file/826ce3530ab20b15a496d.mp4',
                        'https://telegra.ph/file/f66bcaf1effc14e077663.mp4',
                        'https://telegra.ph/file/e1dbfc56e4fcdc3896f08.mp4',
                        'https://telegra.ph/file/0fc525a0d735f917fd25b.mp4',
                        'https://telegra.ph/file/68643ac3e0d591b0ede4f.mp4',
                        'https://telegra.ph/file/af0fe6eb00bd0a8a9e3a0.mp4'
                    ];

                    const video = videos[Math.floor(Math.random() * videos.length)];

                    await ctx.replyWithVideo({ url: video }, { caption: message });
                } else {
                    
                    ctx.reply('Por favor, responde a un mensaje para usar este comando.');
                }
            } catch (error) {
                dc.warn("Error en el comando kiss:", error);
                throw 'Ocurrió un error al obtener el vídeo. Por favor, inténtalo de nuevo más tarde.';
            }
        });
    } catch (error) {
        dc.error('Error en el manejo del comando kiss:', error);
    }
}

module.exports = kiss;