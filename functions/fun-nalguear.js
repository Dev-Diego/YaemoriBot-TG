const fs = require('fs');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');

async function nalguear() {
    try {
        DC.command('nalguear', async (ctx) => {
            logCommand(ctx);
            try {
                if (ctx.message && ctx.message.reply_to_message) {
                    const mentionedUser = ctx.message.reply_to_message.from.id;

                    const user = await ctx.telegram.getChatMember(ctx.chat.id, mentionedUser);
                    const victimName = user.user.username || user.user.first_name;

                    const senderName = ctx.from.username || ctx.from.first_name;
                    const message = `@${senderName} nalgueó a @${victimName}`;

                   
                    const videos = [
                        'https://telegra.ph/file/d4b85856b2685b5013a8a.mp4',
                        'https://telegra.ph/file/e278ca6dc7d26a2cfda46.mp4',
                        'https://telegra.ph/file/f830f235f844e30d22e8e.mp4',
                        'https://telegra.ph/file/07fe0023525be2b2579f9.mp4',
                        'https://telegra.ph/file/99e036ac43a09e044a223.mp4'
                    ];


                    const video = videos[Math.floor(Math.random() * videos.length)];

    
                    await ctx.replyWithVideo({ url: video }, { caption: message });
                } else {

                    ctx.reply('Por favor, responde a un mensaje para usar este comando.');
                }
            } catch (error) {
                cx.warn("Error en el comando nalguear:", error);
            }
        });
    } catch (error) {
        cx.error('Error en el manejo del comando nalguear:', error);
    }
}

module.exports = nalguear;