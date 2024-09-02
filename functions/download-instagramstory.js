const axios = require('axios');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const fetch = require('node-fetch'); 

const apikasu = "https://apikasu.onrender.com";
const apikey = "42ded262";

async function instagramstory() {
  DC.command(['instagramstory'], async (ctx) => {
    logCommand(ctx);
    const userText = ctx.message.text.slice(ctx.command.length + 1).trim();
    if (!userText) {
      ctx.reply(`Por favor, ingresa el usuario de Instagram para descargar sus historias`);
      return;
    }

    const downloadingMessage = await ctx.reply('Descargando archivo...');
    try {
      const response = await fetch(`${apikasu}/api/dowloader/igstory?username=${userText}&apikey=${apikey}`);
      if (response.ok) {
        const textResponse = await response.json();
        if (textResponse.status && textResponse.result && textResponse.result.length > 0) {
          for (const videoUrl of textResponse.result) {
            ctx.replyWithVideo({ url: videoUrl });
          }

          await ctx.telegram.editMessageText(ctx.chat.id, downloadingMessage.message_id, null, 'Completado aquí tiene su instagramstory');
        } else {
   
          ctx.reply('La API no devolvió URLs de video válidas.');
        }
      } else {
 
        ctx.reply('Hubo un error al obtener las historias desde la API.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de Instagram Stories');
      ctx.reply('Hubo un error al procesar la solicitud de Instagram Stories.');
    }
  });
}

module.exports = instagramstory