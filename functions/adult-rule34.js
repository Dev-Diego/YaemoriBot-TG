const fetch = require('node-fetch');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const isModoHornyEnabled = require('./enable-modohorny');

DC.command(['rule34', 'rule'], async (ctx) => {
  logCommand(ctx);
  const chatId = ctx.message.chat.id;
  const modoHornyEnabled = ctx.message.chat.type !== 'supergroup' || isModoHornyEnabled(chatId);
  if (!modoHornyEnabled) {
    ctx.reply('El comando está desactivado debido al modo +18. Si eres admin usa /modohorny on');
    return;
  }
  const text = ctx.message.text.split(' ').slice(1).join(' ');
  if (!text) {
    return ctx.reply('Por favor, proporciona un texto');
  }
  try {
        const apiUrl = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${encodeURIComponent(text)}&json=1`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (response.ok && Array.isArray(data) && data.length > 0) {
      const itemsToDownload = data.slice(0, 3);
      const downloadedItems = await Promise.all(itemsToDownload.map(async (item) => {
        const fileUrl = item.file_url;
        const fileType = fileUrl.split('.').pop().toLowerCase();
        const fileResponse = await fetch(fileUrl);
        const fileBuffer = await fileResponse.buffer();
        return { buffer: fileBuffer, fileName: fileUrl.split('/').pop(), fileType: fileType };
      }));

      downloadedItems.forEach(({ buffer, fileName, fileType }) => {
        if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
          ctx.replyWithPhoto({ source: buffer }, { filename: fileName });
        } else if (fileType === 'mp4' || fileType === 'webm') {
          ctx.replyWithVideo({ source: buffer }, { filename: fileName });
        }
      });
    } else {
      throw new Error('No se pudo obtener una respuesta válida');
    }
  } catch (error) {
    console.error(error);
    ctx.reply('Ocurrió un error al procesar la solicitud');
  }
});

module.exports = DC;