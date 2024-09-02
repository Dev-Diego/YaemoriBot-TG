const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');

DC.command('del', async (ctx) => {
  logCommand(ctx);
 
  const isAdmin = await checkAdmin(ctx);
  if (!isAdmin) {
    ctx.reply('¡Solo los administradores pueden utilizar este comando!');
    return;
  }

  if (ctx.message.reply_to_message) {
    const repliedMessage = ctx.message.reply_to_message;

    ctx.deleteMessage(repliedMessage.message_id);
  } else {

    ctx.reply('No hay ningún mensaje al que responder.');
  }
 
  ctx.deleteMessage(ctx.message.message_id);
});

async function checkAdmin(ctx) {
  try {
    const chatId = ctx.message.chat.id;
    const userId = ctx.message.from.id;
    const member = await CX.telegram.getChatMember(chatId, userId);
    return member && member.status && (member.status === 'administrator' || member.status === 'creator');
  } catch (error) {
    console.error('Error al verificar el estado del usuario:', error);
    return false;
  }
}

module.exports = DC;