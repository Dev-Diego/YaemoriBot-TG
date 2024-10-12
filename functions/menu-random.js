const DC = require("../global");
const logCommand = require("../log/logcommand");
const dc = require('consola');

async function random() {
    try {
        DC.command(['random'], async (ctx) => {
            logCommand(ctx);

            try {
                const imageUrl = 'https://qu.ax/CmyNh.jpg?raw=true'; 
                const caption = `•/• MENÚ RANDOM •/•

✰ #randomanime
✰ #walldesktop
✰ #wallphone`;
              ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });                    
            } catch (error) {
                dc.warn("Hay un error");
            }
        });  
    } catch (error) {
        dc.error('hay un error en help.js');
    }
    
}

module.exports = random;