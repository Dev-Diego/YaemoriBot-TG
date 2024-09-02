const axios = require('axios');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const fetch = require('node-fetch');

const apikasu = "https://apikasu.onrender.com";
const apikey = "42ded262";

async function youtubechannel() {
  DC.command(['youtubechannel'], async (ctx) => {
    logCommand(ctx);
    const userText = ctx.message.text.slice(ctx.command.length + 1).trim();
    if (!userText) {
      ctx.reply(`Por favor, ingresa el nombre del canal de YouTube`);
      return;
    }
    const searchingMessage = await ctx.reply('Buscando canales de YouTube...');
    try {
      const response = await fetch(`${apikasu}/api/search/youtubechannel?channel=${encodeURIComponent(userText)}&apikey=${apikey}`);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.status && jsonResponse.result && jsonResponse.result.length > 0) {
          const channels = jsonResponse.result.slice(0, 2);
          channels.forEach(channel => {
            const message = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗡𝗼𝗺𝗯𝗿𝗲: ${channel.channel_name}
𝗖𝗮𝗻𝗮𝗹 𝗜𝗗: ${channel.channel_id}
𝗔𝗰𝗲𝗿𝗰𝗮 𝗗𝗲𝗹 𝗖𝗮𝗻𝗮𝗹: ${channel.channel_about}
𝗖𝗿𝗲𝗮𝗱𝗼 𝗘𝗻: ${new Date(channel.channel_created).toDateString()}`;
            ctx.replyWithPhoto({ url: channel.channel_picture.medium.url }, { caption: message });
          });
          await ctx.telegram.editMessageText(ctx.chat.id, searchingMessage.message_id, null, 'Canales encontrados:');
        } else {
          ctx.reply('No se encontraron canales de YouTube con ese nombre.');
        }
      } else {
        ctx.reply('Hubo un error al obtener la información desde la API.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de YouTube Channel');
      ctx.reply('Hubo un error al procesar la solicitud de YouTube Channel.');
    }
  });
}

module.exports = youtubechannel