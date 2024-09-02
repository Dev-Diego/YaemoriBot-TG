const hispamemes = require("hispamemes");
const dc = require("consola");
const DC = require("../global");
const logCommand = require("../log/logcommand");


async function meme() {
    try {
        DC.command('meme', async (ctx) => {
            logCommand(ctx);
            try {
                let momo = hispamemes.meme();
                const caption = '🪻Toma tu meme🪻';

                ctx.replyWithPhoto({ url: momo }, { caption: caption });
            } catch (error) {
                cx.warn("Hay un error con el link de la libreria");
            }
        });
    } catch (error) {
        cx.error('hay un error en meme.js');
    }
}

module.exports = meme;