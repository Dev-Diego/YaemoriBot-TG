const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');
const dc = require("consola");
const DC = require("../global");
const logCommand = require("../log/logcommand");

async function chatgpt() {
    DC.command(['chatgpt', 'ia', 'yaemori'], async (ctx) => {
        logCommand(ctx);
        const userText = ctx.message.text.slice(['chatgpt', 'ia', 'kotori'].length + 1).trim();
        if (!userText) {
            ctx.reply(`Por favor, ingresa un texto`);
            return;
        }
        try {
            const response = await fetch(`https://api-for-canvas-brunosobrino.koyeb.app/api/chatgpt?text=${encodeURIComponent(userText)}&prompt=null`);

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if (data && data.resultado) {
                    ctx.reply(data.resultado);
                } else {
                    ctx.reply('No se recibió una respuesta válida de la API.');
                }
            } else {
                ctx.reply('Hubo un error al obtener la respuesta de la API.');
            }
        } catch (error) {
            cx.error('Hubo un error en chatgpt:', error);
            ctx.reply('Hubo un error al procesar tu solicitud.');
        }
    });
}

module.exports = chatgpt;