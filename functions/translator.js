/*const translate = require('translate-google');
const { detect } = require('langdetect');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const dc = require('consola');

async function translator(){
    DC.command('translate', async (ctx) => {
        logCommand(ctx);

        const commandArgs = ctx.message.text.split(' ');
        if (commandArgs.length >= 2) {
          const textToTranslate = commandArgs.slice(1).join(' ');
          const detectedLanguage = detect(textToTranslate);
          const detectedLanguageCode = detectedLanguage[0].lang;
          //const detectedLanguageProbability = detectedLanguage[0].prob;
      
          try {
            const translatedText = await translate(textToTranslate, { to: 'es' });
      
            ctx.reply(`Texto original: ${textToTranslate}\nIdioma Detectado: ${detectedLanguageCode}\nTraduccion: ${translatedText}`);

            dc.success('Traduccion exitosa')
          } catch (error) {
            dc.warn('Error al traducir el texto');
            ctx.reply('Ocurrió un error al traducir el texto.');
          }
        } else {
          ctx.reply('Comando inválido. Proporcione el texto para traducir al español');
        }
      });
}

module.exports = DC*/