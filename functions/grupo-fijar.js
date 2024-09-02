const { Telegraf } = require('telegraf');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');

async function fijar() {
  DC.command('fijar', async (ctx) => {
    logCommand(ctx);
    
    const chatAdministrators = await ctx.getChatAdministrators();
    const isAdmin = chatAdministrators.some(admin => admin.user.id === ctx.message.from.id);
    
    if (!isAdmin) {
      ctx.reply("Solo los administradores o el creador del grupo pueden usar este comando 😂🫵");
      return;
    }
    
    const messageToPin = ctx.message.reply_to_message;

    if (!messageToPin) {
      ctx.reply("Debes responder a un mensaje para fijarlo.");
      return;
    }

    try {
      await ctx.telegram.pinChatMessage(ctx.message.chat.id, messageToPin.message_id);
      ctx.reply("Mensaje fijado correctamente.");
    } catch (error) {
      dc.error("Error al fijar el mensaje:", error);
      ctx.reply("Ocurrió un error al fijar el mensaje. Por favor, inténtalo de nuevo más tarde.");
    }
  });
}

module.exports = fijar;