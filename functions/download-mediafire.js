const axios = require('axios');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const fetch = require('node-fetch'); 

async function mediafire() {
  DC.command(['mediafire'], async (ctx) => {
    logCommand(ctx);
    const userText = ctx.message.text.slice(ctx.command.length + 1).trim();
    if (!userText) {
      ctx.reply(`Por favor, ingresa el enlace del archivo de MediaFire`);
      return;
    }

    const downloadingMessage = await ctx.reply('Descargando archivo...');
    try {
      const response = await fetch(`https://api.diego-ofc.site/v2/mediafire-dl?url=${userText}`);
      if (response.ok) {
        const textResponse = await response.json();
        if (textResponse.status && textResponse.result) {
          const result = textResponse.result;
          const downloadUrl = result.url;
          const extension = result.ext.toLowerCase();
          const allowedExtensions = ['mp4', 'mp3', 'jpg', 'jpeg', 'png', 'gif', 'pdf', 'rar', 'zip'];
          if (allowedExtensions.includes(extension)) {
            const document = `${downloadUrl}.${extension}`;
            const message = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗡𝗼𝗺𝗯𝗿𝗲: ${result.filename}
𝗧𝗶𝗽𝗼: ${result.filetype}
𝗽𝗲𝘀𝗼: ${result.filesizeH}`;
            if (['mp4'].includes(extension)) {
              ctx.replyWithVideo({ url: document }, { caption: message, supports_streaming: true });
            } else if (['mp3'].includes(extension)) {
              ctx.replyWithAudio({ url: document }, { caption: message, supports_streaming: true });
            } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
              ctx.replyWithPhoto({ url: document }, { caption: message });
            } else if (['pdf', 'rar', 'zip'].includes(extension)) {
              ctx.replyWithDocument({ url: document, filename: result.filename });
            } else {
              ctx.reply('Extensión no admitida.');
            }
 
            await ctx.telegram.editMessageText(ctx.chat.id, downloadingMessage.message_id, null, 'Completado aqui tienes tu archivo de mediafire.');
          } else {
            ctx.reply('Extensión no admitida.');
          }
        } else {
 
          ctx.reply('La API no devolvió la información esperada.');
        }
      } else {
 
        ctx.reply('Hubo un error al obtener el texto desde la API.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de MediaFire');
      ctx.reply('Hubo un error al procesar la solicitud de MediaFire.');
    }
  });
}

module.exports = mediafire