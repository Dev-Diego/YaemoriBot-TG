const axios = require('axios');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const fetch = require('node-fetch');
async function facebook() {
  DC.command(['facebook', 'fb'], async (ctx) => {
    logCommand(ctx);
    const userText = ctx.message.text.slice(ctx.command.length + 1).trim();
    if (!userText) {
      ctx.reply(`Por favor, ingresa el enlace de Facebook`);
      return;
    }
    const downloadingMessage = await ctx.reply('Descargando archivo...');
    try {
      const response = await fetch(`https://api.diego-ofc.site/fbvideo?url=${userText}`);
      if (response.ok) {
        const textResponse = await response.json();
        if (textResponse.result && textResponse.result) {
          const result = textResponse.result;
          await ctx.telegram.editMessageText(ctx.chat.id, downloadingMessage.message_id, null, 'Completado disfrute su contenido.');
          ctx.replyWithVideo({ url: result.hd });
        } else {
          ctx.reply('La API no devolvió la información esperada o no se encontró el enlace HD.');
        }
      } else {
        ctx.reply('Hubo un error al obtener el texto desde la API.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      ctx.reply('Hubo un error al obtener el texto desde la API.');
    }
  });
}

module.exports = facebook;