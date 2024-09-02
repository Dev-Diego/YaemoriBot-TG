const DC = require('../global');
const dc = require('consola');
const logCommand = require('../log/logcommand');
const akaneko = require('akaneko');

async function walldes() {
    try {
        DC.command('walldesktop', async (ctx) => {
            logCommand(ctx);
            
            try {
                const imageUrl = await akaneko.wallpapers();
                const caption = '🪻Aqui tiene su wallpaper🪻';

                ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });
            } catch (error) {
                dc.warn("Hay un error con el link de la libreria");
            }
        });
    } catch (error) {
        dc.error('hay un error en walldes.js');
    }
}

module.exports = walldes;