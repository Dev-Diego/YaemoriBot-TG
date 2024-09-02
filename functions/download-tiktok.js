const axios = require('axios');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const fetch = require('node-fetch'); 

const apikasu = "https://apikasu.onrender.com";
const apikey = "42ded262";

async function tiktok() {
  DC.command(['tiktok'], async (ctx) => {
    logCommand(ctx);
    const userText = ctx.message.text.slice(ctx.command.length + 1).trim();
    if (!userText) {
      ctx.reply(`Por favor, ingresa el enlace del video de TikTok`);
      return;
    }
    
    const downloadingMessage = await ctx.reply('Descargando archivo...');
    try {
      const response = await fetch(`${apikasu}/api/dowloader/tikok?url=${userText}&apikey=${apikey}`);
      if (response.ok) {
        const textResponse = await response.json();
        if (textResponse.status && textResponse.result) {
          const result = textResponse.result;
          const videoUrl = result.video;
          const message = `👑 Tu video.. ✨️`;
          await ctx.telegram.editMessageText(ctx.chat.id, downloadingMessage.message_id, null, 'Comoletado disfrute del video.');
          ctx.replyWithVideo({ url: videoUrl }, { caption: message });
        } else {
          ctx.reply('La API no devolvió la información esperada.');
        }
      } else {     
        ctx.reply('Hubo un error al obtener el texto desde la API.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de TikTok');
      ctx.reply('Hubo un error al procesar la solicitud de TikTok.');
    }
  });
}

module.exports = tiktok