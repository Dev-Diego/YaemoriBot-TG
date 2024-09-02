const logCommand = require('../log/logcommand');
const DC = require("../global");
const cx = require('consola');
const isModoHornyEnabled  = require('./enable-modohorny');

async function videosxxxc2(message) {
    try {
        DC.command('videosxxxc2', async (ctx) => {
            logCommand(ctx);
                            const chatId = ctx.message.chat.id;
    const modoHornyEnabled = ctx.message.chat.type !== 'supergroup' || isModoHornyEnabled(chatId);
    if (!modoHornyEnabled) {
        ctx.reply('El comando está desactivado debido al modo +18.Si eres admin usa /modohorny on');
        return;
    }
            try {
                const url = global.videosxxxc2[Math.floor(Math.random() * global.videosxxxc2.length)]; 
                await ctx.replyWithVideo(url, { caption: '_🥵 /videosxxxc2 🥵_' }); 
            } catch (error) {
                cx.warn('❌ Debe ser el enlace de pack');
            }
        });

    } catch (error) {
        cx.error('Hubo un error en pack:', error);
    }
};
global.videosxxxc2 = [
"https://telegra.ph/file/2dfb1ad0cab22951e30d1.mp4",
"https://telegra.ph/file/c430651857023968d3a76.mp4",
"https://telegra.ph/file/1ba17f6230dd1ea2de48c.mp4",
"https://telegra.ph/file/e04b802f12aafee3d314e.mp4",
"https://telegra.ph/file/a58661697d519d3d0acbd.mp4",
"https://telegra.ph/file/9ed60b18e79fcfebcd76c.mp4",
"https://telegra.ph/file/d58096000ad5eaef0b05e.mp4",
"https://telegra.ph/file/60b4c8ebeadebb7e0da06.mp4"
];

module.exports = videosxxxc2;