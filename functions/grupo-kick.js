const { Telegraf } = require('telegraf');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');


async function kick() {
        DC.command(['kick', 'ban'], async (ctx) => {
            logCommand(ctx);
    if (ctx.chat.type !== 'supergroup' && ctx.chat.type !== 'group') {
        return ctx.reply('Este comando solo es para grupos');
    }

    const isAdmin = await ctx.getChatMember(ctx.from.id).then((member) => member.status === 'administrator' || member.status === 'creator');
    if (!isAdmin) {
        return ctx.reply('No eres Admin 😂🫵 no puedes usar este comando');
    }

    const botInfo = await ctx.getChatMember(ctx.botInfo.id);
    if (botInfo.status !== 'administrator') {
        return ctx.reply('Eh !? Que no soy admin! Dame admin para eliminar al usuario');
    }

    const mentionedUser = ctx.message.reply_to_message?.from || ctx.message.entities?.find(entity => entity.type === 'mention');
    if (!mentionedUser) {
        return ctx.reply('Por favor, responde al mensaje de un usuario o menciona a un usuario para expulsarlo.');
    }

    await ctx.kickChatMember(mentionedUser.id);
    return ctx.reply('Órdenes recibidas. Usuario eliminado del grupo.');
});
         }

module.exports = kick;
