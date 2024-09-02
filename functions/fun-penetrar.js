const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand')

DC.command(['penetrar', 'penetrado'], async (ctx) => {
	logCommand(ctx);
    const mentionedUser = ctx.message.mentions[0] || (ctx.message.reply_to_message && ctx.message.reply_to_message.from);
    const text = ctx.message.text.split(' ').slice(1).join(' ');

    if (!text) {
        throw '*Ingrese el @ o el nombre de la persona que quieras saber si te puedes penetrar*';
    }

    if (!mentionedUser) {
        throw '*No se ha mencionado a ningún usuario válido*';
    }

    await ctx.replyWithMarkdown(`
TE HAN LLENADO LA CARA DE SEMEN POR PUTA Y ZORRA!

Le han metido el pene a ${text} con todo y condón hasta quedar seco. Has dicho "por favor más duroooooo!, ahhhhhhh, ahhhhhh, hazme un hijo que sea igual de pitudo que tú!" mientras te penetraban y luego te han dejado en silla de ruedas!

*${text}* 
🔥 *YA TE HAN PENETRADO!* `, { reply_to_message_id: ctx.message.message_id });
});

module.exports = DC;