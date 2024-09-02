const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const wikipedia = require('wikipedia');

async function wikia() {
    try {
        DC.command('wiki', async (ctx) => {
            logCommand(ctx);
            try {
                const commandArgs = ctx.message.text.split(' ');
                if (commandArgs.length >= 2) {
                    const oracion = commandArgs.slice(1).join(' ');
                    cx.start(`Buscar en wikipedia: ${oracion} \n`);
                    ctx.reply(`Buscando en wikipedia: ${oracion}`);

                    async function busca() {
                        try {
                            wikipedia.setLang('es');
            
                            const page = await wikipedia.page(`${oracion}`);
                            const summary = await page.summary();

                            let title = summary.title;
                            let imagen = summary.thumbnail.source;
                            let text = summary.extract
            
                            try {
                                if (imagen === undefined) {
                                    await ctx.reply(`🪻> Aqui estan los resultados de: ${oracion}\n\n🪻Titulo🪻:\n${title}\n\n🪻Descripcion🪻\n${text}`)
                                } else {
                                    ctx.replyWithPhoto({ url: imagen }, { caption: `🪻> Aqui estan los resultados de: ${oracion}\n\n🪻Titulo🪻:\n${title}\n\n🪻Descripcion🪻\n${text}` });
                                    dc.success('Encontrado: ' + oracion);
                                }
                            } catch (error) {
                                dc.warn('algo fallo en wiki.js')
                            }
                        } catch (error) {
                            dc.warn('Esto no existe');
                            ctx.reply('Eso no existe en wikipedia')
                        }
                    }

                    busca();

                  } else {
                    ctx.reply('Debes proporcionar una busqueda después del comando.');
                  }
            } catch (error) {
                dc.warn("Hay un error con el link de la libreria");
            }
        });
    } catch (error) {
        DC.error('hay un error en wiki.js');
    }
};

module.exports = wikia;