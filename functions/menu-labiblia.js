const DC = require("../global");
const logCommand = require("../log/logcommand");
const dc = require('consola');

async function labiblia() {
    try {
       DC.command(['labiblia'], async (ctx) => {
            logCommand(ctx);

            try {
                const imageUrl = 'https://qu.ax/CmyNh.jpg?raw=true'; 
                const caption = `•/• MENÚ +18 •/•

✰ #pack
✰ #pack2
✰ #pack3
✰ #videosxxxc
✰ #videosxxxc2
✰ #hentai
✰ #rule34 + texto`;
              ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });                    
            } catch (error) {
                dc.warn("Hay un error");
            }
        });  
    } catch (error) {
        dc.error('hay un error en help.js');
    }
    
}

module.exports = labiblia;