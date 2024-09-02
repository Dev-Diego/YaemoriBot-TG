/*const fetch = require('node-fetch');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');
let data;
let buff;
let mimeType;
let fileName;
let apiUrl;
let enviando = false;

DC.command('play', async (ctx) => {
  logCommand(ctx);
  await handlePlayCommand(ctx, 'play').catch(error => {
    enviando = false;
    throw `*[❗] Error: ${error.message || 'Ocurrió un error inesperado'}.*`;
  });
});

DC.command('play2', async (ctx) => {
  logCommand(ctx);
  await handlePlayCommand(ctx, 'play2').catch(error => {
    enviando = false;
    throw `*[❗] Error: ${error.message || 'Ocurrió un error inesperado'}.*`;
  });
});

async function handlePlayCommand(ctx, command) {
  const text = ctx.message.text.slice(ctx.command.length + 1).trim();
  if (!text) {
    enviando = false;
    return ctx.reply("[❗] Nombre de la canción/video faltante, por favor ingrese el comando más el nombre, título o link de alguna canción o video de YouTube.");
  }
  try {
    const apiUrls = [
      `https://api-brunosobrino.zipponodes.xyz/api/ytplay?text=${text}`,
      `https://api-brunosobrino.onrender.com/api/ytplay?text=${text}`
    ];

    for (const url of apiUrls) {
      try {
        const res = await fetch(url);
        data = await res.json();
        if (data.resultado && data.resultado.url) {
          break;
        }
      } catch (error) {}
    }

    if (!data.resultado || !data.resultado.url) {
      enviando = false;
      return `*[❗] No se pudo obtener la URL del video/canción.*`;
    } else {
      try {
        if (command === 'play') {
          apiUrl = `https://api-brunosobrino.zipponodes.xyz/api/v1/ytmp3?url=${data.resultado.url}`;
          mimeType = 'audio/mpeg';
          fileName = 'error.mp3';
          buff = await fetch(apiUrl).then(res => res.buffer()).catch(error => {
            throw error;
          });
        } else if (command === 'play2') {
          apiUrl = `https://api-brunosobrino.zipponodes.xyz/api/v1/ytmp4?url=${data.resultado.url}`;
          mimeType = 'video/mp4';
          fileName = 'error.mp4';
          buff = await fetch(apiUrl).then(res => res.buffer()).catch(error => {
            throw error;
          });
        }
      } catch (error) {
        try {
          if (command === 'play') {
            apiUrl = `https://api-brunosobrino.onrender.com/api/v1/ytmp3?url=${data.resultado.url}`;
            mimeType = 'audio/mpeg';
            fileName = 'error.mp3';
            buff = await fetch(apiUrl).then(res => res.buffer()).catch(error => {
              throw error;
            });
          } else if (command === 'play2') {
            apiUrl = `https://api-brunosobrino.onrender.com/api/v1/ytmp4?url=${data.resultado.url}`;
            mimeType = 'video/mp4';
            fileName = 'error.mp4';
            buff = await fetch(apiUrl).then(res => res.buffer()).catch(error => {
              throw error;
            });
          }
        } catch (error) {
          enviando = false;
          return `*[❗] Error al descargar el video/canción desde las APIs disponibles.*`;
        }
      }
    }

    const dataMessage = `*=> Título:* ${data.resultado.title}\n*=> Canal:* ${data.resultado.channel}\n*=> URL:* ${data.resultado.url}\n*=> Publicado:* ${data.resultado.publicDate}`;
    await ctx.replyWithMarkdown(dataMessage);

    if (buff) {
      await ctx.replyWithVideo({ source: buff }, { filename: fileName });
      enviando = false;
    } else {
      enviando = false;
      return `*[❗] Error al descargar el video/canción desde las APIs disponibles.*`;
    }
  } catch (error) {
    enviando = false;
    return `*[❗] Error: ${error.message || 'Ocurrió un error inesperado'}.*`;
  }
}

module.exports = DC;*/