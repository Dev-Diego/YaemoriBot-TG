const DC = require("../global");
const logCommand = require("../log/logcommand");
const dc = require('consola');

async function descargas() {
    try {
        DC.command(['descargas'], async (ctx) => {
            logCommand(ctx);

            try {
                const imageUrl = 'https://qu.ax/CmyNh.jpg?raw=true'; 
                const caption = `•/• *Descargas* •/•

「🌺」 /twitter *<enlace / link / url>*
「🌺」 /mp3 *<enlace / link / url>*
「🌺」 /mp4 *<enlace / link / url>*
「🌺」 /tiktoksearch *<enlace / link / url>*
「🌺」 /peliculainfo *<nombre>*
「🌺」 /youtubechannel *<nombre>*
「🌺」 /googledrive *<enlace / link / url>*
「🌺」 /mediafire *<enlace / link / url>*
「🌺」 /tiktokimg *<enlace / link / url>*
「🌺」 /instagramstory *<enlace / link / url>*
「🌺」 /instagram *<enlace / link / url>*
「🌺」 /tiktok *<enlace / link / url>*
「🌺」 /applemusic *<enlace / link / url>*
「🌺」 /spotify *<enlace / link / url>*
「🌺」 /facebook *<enlace / link / url>*
「🌺」 /gitclone *<enlace / link / url>*`;
              ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });                    
            } catch (error) {
                dc.warn("Hay un error");
            }
        });  
    } catch (error) {
        dc.error('hay un error en help.js');
    }
    
}

module.exports = descargas;