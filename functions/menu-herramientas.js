const DC = require("../global");
const logCommand = require("../log/logcommand");
const dc = require('consola');

async function herramientas() {
    try {
        DC.command('herramientas', async (ctx) => {
            logCommand(ctx);

            try {
                const imageUrl = 'https://qu.ax/CmyNh.jpg?raw=true'; 
                const caption = `•/• MENÚ HERRAMIENTAS •/•

✰ #wiki + texto
✰ #translate +identificador + texto
✰ #identificadores
✰ #spanishto + texto
✰ #ia + texto
✰ #dalle + texto
✰ #dalle2 + texto
✰ #tourl + responde a una imagen o video`;
              ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });                    
            } catch (error) {
                dc.warn("Hay un error");
            }
        });  
    } catch (error) {
      dc.error('hay un error en help.js');
    }
    
}

module.exports = herramientas;