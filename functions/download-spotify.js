const axios = require('axios');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const fetch = require('node-fetch'); 

const apikasu = "https://apikasu.onrender.com";
const apikey = "42ded262";

async function spotify() {
  DC.command(['spotify', 'sp'], async (ctx) => {
    logCommand(ctx);
     const userText = ctx.message.text.slice(ctx.command.length + 1).trim();
    if (!userText) {
      ctx.reply(`Por favor, ingresa el enlace de Spotify`);
      return;
    }

    const downloadingMessage = await ctx.reply('Descargando archivo...');
    try {
      const response = await fetch(`${apikasu}/api/search/spotifyinfo?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
      if (response.ok) {
        const sptyInfo = await response.json();
        const result = sptyInfo.spotify.resultado;
        const audioBuffer = await fetch(`${apikasu}/api/dowloader/spotify?url=${result.url}&apikey=${apikey}`).then(res => res.buffer());
        const message = `
 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗧𝗶𝘁𝘂𝗹𝗼: ${result.title}
𝗔𝗿𝘁𝗶𝘀𝘁𝗮: ${result.artist}
𝗔𝗹𝗯𝘂𝗺: ${result.album}
𝗚𝗲𝗻𝗲𝗿𝗼: ${result.genre}
𝗣𝘂𝗯𝗹𝗶𝗰𝗮𝗱𝗼: ${result.year}`;

        await ctx.telegram.editMessageText(ctx.chat.id, downloadingMessage.message_id, null, 'Comoletado aqui tiene su cancion.');
        ctx.replyWithAudio({ source: audioBuffer }, { caption: message });
      } else {
        
        ctx.reply('Hubo un error al obtener información de Spotify desde la API.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de Spotify');
      ctx.reply('Hubo un error al procesar la solicitud de Spotify.');
    }
  });
}

module.exports = spotify