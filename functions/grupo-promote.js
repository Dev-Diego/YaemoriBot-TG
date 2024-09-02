const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');

DC.command('promote', async (ctx) => {


    if (!ctx.message.chat.type || ctx.message.chat.type === 'private') {

        ctx.reply('Esto es solo para grupos 😑');

        return;

    }

    try {



        if (ctx.message && ctx.message.reply_to_message) {

            const isAdmin = await ctx.getChatMember(ctx.message.chat.id, ctx.message.from.id).then(member => member.status === 'administrator' || member.status === 'creator');

            const botIsAdmin = await ctx.getChatMember(ctx.message.chat.id, ctx.botInfo.id).then(member => member.status === 'administrator' || member.status === 'creator');

            if (!isAdmin || !botIsAdmin) {

                if (!isAdmin) {

                    ctx.reply('No eres admin puto 😹🫵');

                } else {

                    ctx.reply('We no soy admin como esperas que yo pueda dar admin 😐');

                }

                return;

            }

    
    

            let mentionedUser = ctx.message.reply_to_message.from.id;



            if (typeof mentionedUser !== 'number' || mentionedUser <= 0) {

                ctx.reply('El ID del usuario al que estás respondiendo no es válido.');

                return;

            }

            const targetUserStatus = await ctx.getChatMember(ctx.message.chat.id, mentionedUser).then(member => member.status);

            if (targetUserStatus === 'left' || targetUserStatus === 'kicked') {

                ctx.reply('No puedo promover a un usuario que ya no está en el grupo.');

                return;

            }

            const targetIsAdmin = targetUserStatus === 'administrator' || targetUserStatus === 'creator';

            if (targetIsAdmin) {

                ctx.reply('We 🤨 ya es administrador xd');

                return;

            }

            try {

                await ctx.promoteChatMember(mentionedUser, { can_change_info: true, can_delete_messages: true, can_invite_users: true, can_restrict_members: true, can_pin_messages: true, can_promote_members: false });

                ctx.reply('Usuario promovido a administrador correctamente.');

            } catch (error) {

                console.error('Error al promover al usuario:', error);

                ctx.reply('Hubo un error al promover al usuario.');

            }

        } else {

            ctx.reply('A quien mijo? A quien le doy admin !?!? Responde un mensaje de esa persona con el comando joder ');

        }

    } catch (error) {

        console.error('Error al obtener el ID del usuario:', error);

        ctx.reply('Hubo un error al obtener el ID del usuario.');

    }

});
module.exports = DC