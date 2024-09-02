const axios = require('axios');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const fetch = require('node-fetch');

const apikasu = "https://apikasu.onrender.com";
const apikey = "42ded262";

async function peliculainfo() {
  DC.command(['peliculainfo'], async (ctx) => {
    logCommand(ctx);
    const userText = ctx.message.text.slice(ctx.command.length + 1).trim();
    if (!userText) {
      ctx.reply(`Por favor, ingresa el nombre de la película`);
      return;
    }
  
    const searchingMessage = await ctx.reply('Buscando información de la película...');
    try {
      const response = await fetch(`${apikasu}/api/search/movieinfo?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
      if (response.ok) {
        const textResponse = await response.json();
        const result = textResponse.result;
        const caption = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗧𝗶𝘁𝘂𝗹𝗼: ${result.title}
𝗔𝗻̃𝗼: ${result._yearData}
𝗗𝘂𝗿𝗮𝗰𝗶𝗼𝗻: ${result.runtime}
𝗚𝗲𝗻𝗲𝗿𝗼: ${result.genres}
𝗔𝗰𝘁𝗼𝗿𝗲𝘀: ${result.actors}
𝗣𝗿𝗲𝗺𝗶𝗼𝘀: ${result.awards}
𝗖𝗼𝗻𝘁𝗶𝗻𝗲𝗻𝘁𝗲: ${result.country}
𝗖𝗮𝗹𝗶𝗳𝗶𝗰𝗮𝗰𝗶𝗼𝗻𝗲𝘀: ${result.rating}
𝗨𝗥𝗟: ${result.imdburl}`;
        const imageUrl = `${result.poster}`;
        ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });
 
        await ctx.telegram.editMessageText(ctx.chat.id, searchingMessage.message_id, null, 'Información encontrada:');
      } else {
   
        ctx.reply('Hubo un error al obtener la información desde la API.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      ctx.reply('Hubo un error al procesar la solicitud.');
    }
  });
}
module.exports = peliculainfo