
const DC = require('../global');
const logCommand = require('../log/logcommand');
const fetch = require('node-fetch');
const apikasu = "https://apikasu.onrender.com";
const apikey = '42ded262';
/*async function loading(ctx, response) {
    const hawemod = [
        "⌏⌌  Ca꯭rg꯭an꯭do.   ⌍⌎",
        "⌍⌎  Carg꯭ando..  ⌏⌌",
        "⌏⌌  Ca꯭rg꯭an꯭do... ⌍⌎",
        "⌍⌎  Carg꯭ando.   ⌏⌌",
        "⌏⌌  Ca꯭rg꯭an꯭do..  ⌍⌎"
    ];

    const message = await ctx.reply('💫 ¡Analizando! 💫', { mentions: ctx.message });

    for (let i = 0; i < hawemod.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await ctx.telegram.editMessageText(ctx.chat.id, message.message_id, null, hawemod[i], { parse_mode: "Markdown" });
    }
    await ctx.telegram.editMessageText(ctx.chat.id, message.message_id, null, response, { parse_mode: "Markdown" });
}*/

DC.command(['imagina2', 'dalle2'], async (ctx) => {
    logCommand(ctx);
    const text = ctx.message.text.split(' ').slice(1).join(' ');
    if (!text) {
        return ctx.reply(`Ingresa un texto para realizar la imagen`);
    }
    const apiUrl = `${apikasu}/api/tools/imagine2?text=${encodeURIComponent(text)}&apikey=${apikey}`;
    try {
        const loadingMessage = await ctx.reply('💫 ¡Analizando! 💫', { mentions: ctx.message });
        const response = await fetch(apiUrl);
        if (response.ok) {
            await ctx.telegram.editMessageText(ctx.chat.id, loadingMessage.message_id, null, "Completado enviando resultado...", { parse_mode: "Markdown" });
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