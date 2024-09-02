const axios = require('axios');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const fetch = require('node-fetch'); 

const apikasu = "https://apikasu.onrender.com";
const apikey = "42ded262";

async function applemusic() {
  DC.command(['applemusic'], async (ctx) => {
    logCommand(ctx);
    function formatDuration(milliseconds) {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    const userText = ctx.message.text.slice(ctx.command.length + 1).trim();
    if (!userText) {
      ctx.reply(`Por favor, ingresa el enlace de Apple Music`);
      return;
    }

    const downloadingMessage = await ctx.reply('Descargando archivo...');
    try {
      const response = await fetch(`${apikasu}/api/dowloader/apple-music?url=${encodeURIComponent(userText)}&apikey=${apikey}`);
      if (response.ok) {
        const applemusic = await response.json();
        const result = applemusic.result;
        const message = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗧𝗶𝘁𝘂𝗹𝗼: ${result.name}
𝗔𝗿𝘁𝗶𝘀𝘁𝗮: ${result.artists}
𝗗𝘂𝗿𝗮𝗰𝗶𝗼𝗻: ${formatDuration(result.duration_ms)} Minutos
𝗧𝗶𝗽𝗼: ${result.type}`;
        const audioUrl = result.url;

        await ctx.telegram.editMessageText(ctx.chat.id, downloadingMessage.message_id, null, 'Aguarde un momento...');
        ctx.replyWithAudio({ url: audioUrl }, { caption: message });
      } else {
  
        ctx.reply('Hubo un error al obtener información de Apple Music desde la API.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de Apple Music');
      ctx.reply('Hubo un error al procesar la solicitud de Apple Music.');
    }
  });
}

module.exports = applemusic