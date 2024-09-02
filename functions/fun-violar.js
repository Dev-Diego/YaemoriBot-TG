const fs = require('fs');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');

async function violar() {
    try {
        DC.command(['violar', 'fuck'], async (ctx) => { 
            logCommand(ctx);
            try {
 
                if (ctx.message && ctx.message.reply_to_message) {
                    const mentionedUser = ctx.message.reply_to_message.from.id;

                    const user = await ctx.telegram.getChatMember(ctx.chat.id, mentionedUser);
                    const victimName = user.user.username || user.user.first_name;

                    const senderName = ctx.from.username || ctx.from.first_name;
                    const message = `${senderName} violó fuertemente a ${victimName}`;

                    const videos = [
                        'https://telegra.ph/file/21543bac2383ce0fc6f51.mp4',
                        'https://telegra.ph/file/e2beba258ba83f09a34df.mp4',
                        'https://telegra.ph/file/1af11cf4ffeda3386324b.mp4',
                        'https://telegra.ph/file/66535b909845bd2ffbad9.mp4',
                        'https://telegra.ph/file/6ea4ddf2f9f4176d4a5c0.mp4',
                        'https://telegra.ph/file/e7078700d16baad953348.mp4',
                        'https://telegra.ph/file/1c7d59e637f8e5915dbbc.mp4',
                        'https://telegra.ph/file/7638618cf43e499007765.mp4',
                        'https://telegra.ph/file/80aa0e43656667b07d0b4.mp4',
                        'https://telegra.ph/file/1baf2e8577d5118c03438.mp4',
                        'https://telegra.ph/file/52c82a0269bb69d5c9fc4.mp4',
                        'https://telegra.ph/file/34e1fb2f847cbb0ce0ea2.mp4',
                        'https://telegra.ph/file/249518bf45c1050926d9c.mp4',
                        'https://telegra.ph/file/3b1d6ef30a5e53518b13b.mp4',
                        'https://telegra.ph/file/100ba1caee241e5c439de.mp4',
                        'https://telegra.ph/file/bbf6323509d48f4a76c13.mp4',
                        'https://telegra.ph/file/1dec277caf371c8473c08.mp4',
                        'https://telegra.ph/file/216b3ab73e1d98d698843.mp4',
                        'https://telegra.ph/file/8e94da8d393a6c634f6f9.mp4',
                        'https://telegra.ph/file/ca64bfe2eb8f7f8c6b12c.mp4',
                        'https://telegra.ph/file/58bcc3cd79cecda3acdfa.mp4',
                        'https://telegra.ph/file/b08996c47ff1b38e13df0.mp4',
                        'https://telegra.ph/file/a91d94a51dba34dc1bed9.mp4',
                        'https://telegra.ph/file/bd4d5a957466eee06a208.mp4',
                        'https://telegra.ph/file/f8e4abb6923b95e924724.mp4',
                        'https://telegra.ph/file/acdb5c2703ee8390aaf33.mp4',
                        'https://telegra.ph/file/8be835497e63430842dfc.mp4'
                    ];

                    const video = videos[Math.floor(Math.random() * videos.length)];

                    await ctx.replyWithVideo({ url: video }, { caption: message }); 
                } else {
 
                    ctx.reply('Por favor, responde a un mensaje para usar este comando.');
                }
            } catch (error) {
                dc.warn("Error en el comando violar:", error);
            }
        });
    } catch (error) {
        dc.error('Error en el manejo del comando violar:', error);
    }
}

module.exports = violar;