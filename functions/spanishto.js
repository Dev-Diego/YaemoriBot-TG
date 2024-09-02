const translate = require('translate-google');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const dc = require('consola');

async function spanishto(){
    DC.command('spanishto', async (ctx) => {
        logCommand(ctx);

        const commandArgs = ctx.message.text.split(' ');
        if (commandArgs.length >= 3) {
          const sourceLanguage = 'es'; 
          const targetLanguage = commandArgs[1];
          const textToTranslate = commandArgs.slice(2).join(' ');
      
          try {
            const translatedText = await translate(textToTranslate, { from: sourceLanguage, to: targetLanguage });
            ctx.reply(`Translation: ${translatedText}`);

            dc.success('Traduccion exitosa')

          } catch (error) {
            DC.error('Error al traducir el texto');
            ctx.reply('Ocurrió un error al traducir el texto.');
          }
        } else {
          ctx.reply('Comando inválido. Proporcione el idioma de destino seguido del texto a traducir.\nEjemplo:\n /spanishto en Hola, ¿Como estas?');
        }
      });
}

module.exports = spanishto;