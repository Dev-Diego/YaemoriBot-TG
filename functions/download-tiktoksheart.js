const axios = require('axios');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const fetch = require('node-fetch'); 
const apikasu = "https://apikasu.onrender.com";
const apikey = "42ded262";

async function tiktoksearch() {
  DC.command(['tiktoksearch'], async (ctx) => {
    logCommand(ctx);
    const userText = ctx.message.text.slice(ctx.command.length + 1).trim();
    if (!userText) {
      ctx.reply(`Por favor, ingresa el texto a buscar`);
      return;
    }
    const searchingMessage = await ctx.reply('Buscando videos de TikTok...');
    try {
      const response = await fetch(`${apikasu}/api/search/tiktoksearch?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
      if (response.ok) {
        const textResponse = await response.json();
        const result = textResponse.result[0];
        const caption = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗧𝗶𝘁𝘂𝗹𝗼: ${result.title}
𝗗𝘂𝗿𝗮𝗰𝗶𝗼𝗻: ${result.duration} segundos
𝗥𝗲𝗽𝗿𝗼𝗱𝘂𝗰𝗰𝗶𝗼𝗻𝗲𝘀: ${result.play_count}
𝗟𝗶𝗸𝗲𝘀: ${result.digg_count}
𝗖𝗼𝗺𝗽𝗮𝗿𝘁𝗶𝗱𝗮𝘀: ${result.share_count}
𝗗𝗲𝘀𝗰𝗮𝗿𝗴𝗮𝘀: ${result.download_count}
𝗥𝗲𝗴𝗶𝗼𝗻: ${result.region}`;
        const video = `${result.play}`;
        ctx.replyWithVideo({ url: video }, { caption: caption });
        await ctx.telegram.editMessageText(ctx.chat.id, searchingMessage.message_id, null, 'Videos encontrados:');
      } else {
        ctx.reply('Hubo un error al obtener la información desde la API.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      ctx.reply('Hubo un error al procesar la solicitud.');
    }
  });
}
module.exports = tiktoksearch