const DC = require('../global');
const logCommand = require('../log/logcommand');
const dc = require('consola');

async function sexo() {
    try {
        DC.command(['sexo'], async (ctx) => {
            logCommand(ctx);
            try {
      
                if (ctx.message && ctx.message.reply_to_message) {
                    let mentionedUser = ctx.message.reply_to_message.from.id;

                    const user = await ctx.telegram.getChatMember(ctx.chat.id, mentionedUser);
                    const victimName = user.user.username || user.user.first_name;

                    const senderName = ctx.from.username || ctx.from.first_name;
                    const message = `@${senderName} tiene sexo con @${victimName}`;

                    const videos = [
                        'https://telegra.ph/file/3246f62c61a0ebebcb5c8.mp4',
                        'https://telegra.ph/file/9c4b894e034c290df75e4.mp4',
                        'https://telegra.ph/file/c5be4a906531c6731cd41.mp4',
                        'https://telegra.ph/file/e3abb2e79cd1ccf709e91.mp4',
                        'https://telegra.ph/file/a2ad1dd463a935d5dfd17.mp4',
                        'https://telegra.ph/file/6f66fd1974e8df1496768.mp4',
                        'https://telegra.ph/file/22d0ef801c93c1b2ac074.mp4',
                        'https://telegra.ph/file/2072f260302c6bb97682a.mp4',
                        'https://telegra.ph/file/820460f05d76bb2329bbc.mp4'
                    ];

                    const video = videos[Math.floor(Math.random() * videos.length)];

                    await ctx.replyWithVideo({ url: video }, { caption: message });
                } else {
 
                    ctx.reply('Por favor, responde a un mensaje para usar este comando.');
                }
            } catch (error) {
                dc.warn("Error en el comando sexo:", error);
                throw 'Ocurrió un error al obtener el vídeo. Por favor, inténtalo de nuevo más tarde.';
            }
        });
    } catch (error) {
        dc.error('Error en el manejo del comando sexo:', error);
    }
}

module.exports = sexo;