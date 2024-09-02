const axios = require('axios');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const fetch = require('node-fetch'); 

const apikasu = "https://apikasu.onrender.com";
const apikey = "42ded262";

async function googledrive() {
  DC.command(['googledrive'], async (ctx) => {
    logCommand(ctx);
    const userText = ctx.message.text.slice(ctx.command.length + 1).trim();
    if (!userText) {
      ctx.reply(`Por favor, ingresa el enlace del archivo de Google Drive`);
      return;
    }
   
    const downloadingMessage = await ctx.reply('Descargando archivo...');
    try {
      const response = await fetch(`${apikasu}/api/dowloader/googledrive?url=${userText}&apikey=${apikey}`);
      if (response.ok) {
        const textResponse = await response.json();
        if (textResponse.status && textResponse.result) {
          const result = textResponse.result;
          const documentUrl = result.url;
          const message = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗡𝗼𝗺𝗯𝗿𝗲: ${result.fileName}
𝗽𝗲𝘀𝗼: ${result.fileSize}`;
          ctx.replyWithDocument({ url: documentUrl, filename: result.fileName, caption: message });

          await ctx.telegram.editMessageText(ctx.chat.id, downloadingMessage.message_id, null, 'Listo aqui tiene su archivo.');
        } else {
          
          ctx.reply('La API no devolvió la información esperada.');
        }
      } else {
        
        ctx.reply('Hubo un error al obtener el texto desde la API.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de Google Drive:', error);
      ctx.reply('Hubo un error al procesar la solicitud de Google Drive.');
    }
  });
}

module.exports = googledrive