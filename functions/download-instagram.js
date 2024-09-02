const axios = require('axios');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const fetch = require('node-fetch'); 

const apikasu = "https://apikasu.onrender.com";
const apikey = "42ded262";

async function instagram() {
  DC.command(['instagram', 'ig'], async (ctx) => {
    logCommand(ctx);
    const userText = ctx.message.text.slice(ctx.command.length + 1).trim();
    if (!userText) {
      ctx.reply(`Por favor, ingresa el enlace del video de Instagram`);
      return;
    }

    const downloadingMessage = await ctx.reply('Descargando archivo...');
    try {
      const response = await fetch(`${apikasu}/api/dowloader/instagram?url=${userText}&apikey=${apikey}`);
      if (response.ok) {
        const apiResponse = await response.json();
        if (apiResponse.status && apiResponse.result && apiResponse.result.length > 0) {
          const mediaArray = apiResponse.result;
          for (const mediaUrl of mediaArray) {
            if (mediaUrl.includes('.mp4')) {
              ctx.replyWithVideo({ url: mediaUrl });
            } else if (mediaUrl.includes('.jpg') || mediaUrl.includes('.png')) {
              ctx.replyWithPhoto({ url: mediaUrl });
            }
          }

          await ctx.telegram.editMessageText(ctx.chat.id, downloadingMessage.message_id, null, 'Completado disfrute del video');
        } else {

          ctx.reply('La API no devolvió resultados válidos.');
        }
      } else {
 
        ctx.reply('Hubo un error al obtener los medios desde la API.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de Instagram');
      ctx.reply('Hubo un error al procesar la solicitud de Instagram.');
    }
  });
}

module.exports = instagram