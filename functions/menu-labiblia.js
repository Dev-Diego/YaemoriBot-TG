const DC = require("../global");
const logCommand = require("../log/logcommand");
const dc = require('consola');

async function labiblia() {
    try {
       DC.command(['labiblia'], async (ctx) => {
            logCommand(ctx);

            try {
                const imageUrl = 'https://telegra.ph/file/65d33e1257607d4b05a1c.jpg?raw=true'; 
                const caption = `
© mᥱᥒᥙ ᥆𝖿іᥴіᥲᥣ ძᥱ ᥡᥲᥱm᥆rіᑲ᥆𝗍 ☁️

┏━━━━━━━━━━━━━━━━━━━⫸
┃╭──────────────────╸
┃│ ✧ 𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦 +18 ✧
┃│
┃│「🔥」 /pack
┃│「🔥」 /pack2
┃│「🔥」 /pack3
┃│「🔥」 /videosxxxc
┃│「🔥」 /videosxxxc2
┃│「🔥」 /hentai
┃│「🔥」 /rule34 + texto
໋ꥇ┃╰──────────────────╸
┗━━━━━━━━━━━━━━━━━━━⫸

/help    /herramientas   /juegos`;
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