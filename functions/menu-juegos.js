const DC = require("../global");
const logCommand = require("../log/logcommand");
const dc = require('consola');

async function juegos() {
    try {
       DC.command(['juegos'], async (ctx) => {
            logCommand(ctx);

            try {
                const imageUrl = 'https://qu.ax/CmyNh.jpg?raw=true'; 
                const caption = `•/• *MENÚ JUEGOS* •/•

✰ #cum + mencion
✰ #violar + mencion
✰ #nalguear + mencion
✰ #sexo + mencion
✰ #kiss + mencion
✰ #qc + texto
✰ #rw
✰ #love + responde a un usuario`;
              ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });                    
            } catch (error) {
                dc.warn("Hay un error");
            }
        });  
    } catch (error) {
        dc.error('hay un error en help.js');
    }
    
}

module.exports = juegos;