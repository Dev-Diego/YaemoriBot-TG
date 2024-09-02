const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const fs = require('fs');

const folderPath = '/home/container/paquete';

function getRandomImage() {
  const files = fs.readdirSync(folderPath);
  const randomIndex = Math.floor(Math.random() * files.length);
  return `${folderPath}/${files[randomIndex]}`;
}

DC.command('hentai', (ctx) => {
  const randomImage = getRandomImage();
  ctx.replyWithPhoto({ source: fs.createReadStream(randomImage) }, {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🥵 𝐒𝐢𝐠𝐮𝐢𝐞𝐧𝐭𝐞 🥵', callback_data: 'next' }]
      ]
    }
  });
});

DC.action('next', (ctx) => {
  const randomImage = getRandomImage();
  ctx.replyWithPhoto({ source: fs.createReadStream(randomImage) }, {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🥵 𝐒𝐢𝐠𝐮𝐢𝐞𝐧𝐭𝐞 🥵', callback_data: 'next' }]
      ]
    }
  });
});
module.exports = DC