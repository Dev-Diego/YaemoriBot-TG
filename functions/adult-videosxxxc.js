const logCommand = require('../log/logcommand');
const DC = require("../global");
const cx = require('consola');
const isModoHornyEnabled  = require('./enable-modohorny');

async function videosxxxc(message) {
    try {
        DC.command('videosxxxc', async (ctx) => {
            logCommand(ctx);
                            const chatId = ctx.message.chat.id;
    const modoHornyEnabled = ctx.message.chat.type !== 'supergroup' || isModoHornyEnabled(chatId);
    if (!modoHornyEnabled) {
        ctx.reply('El comando está desactivado debido al modo +18.Si eres admin usa /modohorny on');
        return;
    }
            try {
                const url = global.videosxxxc[Math.floor(Math.random() * global.videosxxxc.length)]; // Acceder directamente al arreglo global.videosxxxc
                await ctx.replyWithVideo(url, { caption: '_🥵 /videosxxxc 🥵_' }); // Enviar directamente la URL como argumento
            } catch (error) {
                cx.warn('❌ Debe ser el enlace de pack');
            }
        });

    } catch (error) {
        cx.error('Hubo un error en pack:', error);
    }
};
global.videosxxxc = [
  'https://telegra.ph/file/4a270d9945ac46f42d95c.mp4',
  'https://telegra.ph/file/958c11e84d271e783ea3f.mp4',
  'https://telegra.ph/file/f753759342337c4012b3f.mp4',
  'https://telegra.ph/file/379cee56c908dd536dd33.mp4',
  'https://telegra.ph/file/411d8f59a5cefc2a1d227.mp4',
  'https://telegra.ph/file/ee2cf1b359d6eef50d7b7.mp4',
  'https://telegra.ph/file/1e316b25c787f94a0f8fd.mp4',
  'https://telegra.ph/file/c229d33edce798cde0ca4.mp4',
  'https://telegra.ph/file/b44223e72dd7e80e415f2.mp4',
  'https://telegra.ph/file/61486d45a8a3ea95a7c86.mp4',
  'https://telegra.ph/file/76ba0dc2a07f491756377.mp4',
  'https://telegra.ph/file/831bb88f562bef3f1a15d.mp4',
  'https://telegra.ph/file/ee2cf1b359d6eef50d7b7.mp4',
  'https://telegra.ph/file/598857924f3a29ffd37ae.mp4',
  'https://telegra.ph/file/528caef6ea950ec45aeef.mp4',
  'https://telegra.ph/file/4a270d9945ac46f42d95c.mp4',
  'https://telegra.ph/file/958c11e84d271e783ea3f.mp4',
  'https://telegra.ph/file/f753759342337c4012b3f.mp4',
  'https://telegra.ph/file/379cee56c908dd536dd33.mp4',
  'https://telegra.ph/file/411d8f59a5cefc2a1d227.mp4',
  'https://telegra.ph/file/76ba0dc2a07f491756377.mp4',
  'https://telegra.ph/file/831bb88f562bef3f1a15d.mp4',
];

module.exports = videosxxxc;