const axios = require('axios');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const fetch = require('node-fetch'); 
const apikasu = "https://apikasu.onrender.com";
const apikey = "42ded262";

async function tiktokimg() {
  DC.command(['tiktokimg'], async (ctx) => {
    logCommand(ctx);
    const userText = ctx.message.text.slice(ctx.command.length + 1).trim();
    if (!userText) {
      ctx.reply(`Por favor, ingresa el enlace del TikTok con fotos`);
      return;
    }
    const downloadingMessage = await ctx.reply('Descargando archivo...');
    try {
      const response = await fetch(`${apikasu}/api/dowloader/tikok?url=${userText}&apikey=${apikey}`);
      if (response.ok) {
        const textResponse = await response.json();
        if (textResponse.status && textResponse.result) {
          const result = textResponse.result;
          if (result.photo && result.photo.length > 0) {
            for (const photo of result.photo) {
              ctx.replyWithPhoto({ url: photo.url_download });
            }
            await ctx.telegram.editMessageText(ctx.chat.id, downloadingMessage.message_id, null, 'Completado aqui tiene su archivo.');
          }
        } else {
          ctx.reply('La API no devolvió la información esperada.');
        }
      } else {
        ctx.reply('Hubo un error al obtener el contenido desde la API.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de TikTok con imágenes');
      ctx.reply('Hubo un error al procesar la solicitud de TikTok con imágenes.');
    }
  });
}

module.exports = tiktokimg