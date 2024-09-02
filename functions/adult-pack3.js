const logCommand = require('../log/logcommand');
const DC = require("../global");
const dc = require('consola');
const isModoHornyEnabled  = require('./enable-modohorny');

async function pack3(message) {
    try {
        DC.command('pack3', async (ctx) => {
            logCommand(ctx);
                const chatId = ctx.message.chat.id;
    const modoHornyEnabled = ctx.message.chat.type !== 'supergroup' || isModoHornyEnabled(chatId);
    if (!modoHornyEnabled) {
        ctx.reply('El comando está desactivado debido al modo +18.Si eres admin usa /modohorny on');
        return;
    }
            try {
                const url = global.pack3[Math.floor(Math.random() * global.pack3.length)]; // Acceder directamente al arreglo global.pack3
                await ctx.replyWithPhoto(url, { caption: '_🥵 /pack3 🥵_' }); // Enviar directamente la URL como argumento
            } catch (error) {
                dc.warn('❌ Debe ser el enlace de pack');
            }
        });

    } catch (error) {
        dc.error('Hubo un error en pack:', error);
    }
};
global.pack3 = [
  'https://telegra.ph/file/bf303b19b9834f90e9617.jpg',
  'https://telegra.ph/file/36ef2b807251dfccd17c2.jpg',
  'https://telegra.ph/file/bcc34403d16de829ea5d2.jpg',
  'https://telegra.ph/file/5c6b7615662fb53a39e53.jpg',
  'https://telegra.ph/file/1a8183eff48671ea265c2.jpg',
  'https://telegra.ph/file/f9745dcd22f67cbc62e08.jpg',
  'https://telegra.ph/file/02219f503317b0596e101.jpg',
  'https://telegra.ph/file/470c8ec30400a73d03207.jpg',
  'https://telegra.ph/file/c94fa8ed20f2c0cf16786.jpg',
  'https://telegra.ph/file/1b02a1ca6a39e741faec7.jpg',
  'https://telegra.ph/file/eea58bf7043fd697cdb43.jpg',
  'https://telegra.ph/file/ee3db7facdfe73c8df05a.jpg',
  'https://telegra.ph/file/d45b4e4af4f2139507f8c.jpg',
  'https://telegra.ph/file/d176e7fc8720f98f6b182.jpg',
  'https://telegra.ph/file/ce1e072829d1fa5d99f5f.jpg',
  'https://telegra.ph/file/a947933701be6d579c958.jpg',
  'https://telegra.ph/file/9027e5a464ec88e8ab5c1.jpg',
  'https://telegra.ph/file/049a8c611a838ea2f6daa.jpg',
  'https://telegra.ph/file/37b35fbc7e2ee73482ee1.jpg',
  'https://telegra.ph/file/9bcfade24ae85cd417f06.jpg',
  'https://telegra.ph/file/ac0c711585f4300c54355.jpg',
];

module.exports = pack3;