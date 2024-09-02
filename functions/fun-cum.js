const fs = require('fs');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');

async function cum() {
    try {
        DC.command('cum', async (ctx) => {
            logCommand(ctx);
            try {               
                if (ctx.message && ctx.message.reply_to_message) {
                    let mentionedUser = ctx.message.reply_to_message.from.id;

                    const user = await ctx.telegram.getChatMember(ctx.chat.id, mentionedUser);
                    const victimName = user.user.username || user.user.first_name;

                    const senderName = ctx.from.username || ctx.from.first_name;
                    const message = `@${senderName} se vino en @${victimName}`;

                    const videos = [
                        'https://telegra.ph/file/9243544e7ab350ce747d7.mp4',
                        'https://telegra.ph/file/fadc180ae9c212e2bd3e1.mp4',
                        'https://telegra.ph/file/79a5a0042dd8c44754942.mp4',
                        'https://telegra.ph/file/035e84b8767a9f1ac070b.mp4',
                        'https://telegra.ph/file/0103144b636efcbdc069b.mp4',
                        'https://telegra.ph/file/4d97457142dff96a3f382.mp4',
                        'https://telegra.ph/file/b1b4c9f48eaae4a79ae0e.mp4',
                        'https://telegra.ph/file/5094ac53709aa11683a54.mp4'
                    ];

                    const video = videos[Math.floor(Math.random() * videos.length)];

                    await ctx.replyWithVideo({ url: video }, { caption: message });
                } else {
                    ctx.reply('Por favor, responde a un mensaje para usar este comando.');
                }
            } catch (error) {
                dc.warn("Error en el comando cum:", error);
            }
        });
    } catch (error) {
        dc.error('Error en el manejo del comando cum:', error);
    }
}

module.exports = cum;