const fetch = require('node-fetch');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const apikasu = "https://apikasu.onrender.com";
const apikey = '42ded262';

DC.command(['imagina', 'dalle'], async (ctx) => {
    logCommand(ctx);
    const text = ctx.message.text.split(' ').slice(1).join(' ');
    if (!text) {
        return ctx.reply(`Ingresa un texto para realizar la imagen.`);
    }
    const apiUrl = `${apikasu}/api/tools/imagine?text=${encodeURIComponent(text)}&apikey=${apikey}`;
    try {
        const loadingMessage = await ctx.reply('💫 ¡Analizando! 💫', { mentions: ctx.message });
        const response = await fetch(apiUrl);
        if (response.ok) {
            await ctx.telegram.editMessageText(ctx.chat.id, loadingMessage.message_id, null, "Completado creando y enviando resultado...", { parse_mode: "Markdown" });
            const photoBuffer = await response.buffer();
            ctx.replyWithPhoto({ source: photoBuffer });
        } else {
            await ctx.telegram.editMessageText(ctx.chat.id, loadingMessage.message_id, null, "Error en la solicitud", { parse_mode: "Markdown" });
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        ctx.reply('Error en la solicitud');
    }
});

module.exports = DC;