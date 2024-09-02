const DC = require("../global");
const logCommand = require("../log/logcommand");
const dc = require('consola');

async function random() {
    try {
        DC.command(['random'], async (ctx) => {
            logCommand(ctx);

            try {
                const imageUrl = 'https://telegra.ph/file/65d33e1257607d4b05a1c.jpg?raw=true'; 
                const caption = `
© mᥱᥒᥙ ᥆𝖿іᥴіᥲᥣ ძᥱ ᥡᥲᥱm᥆rіᑲ᥆𝗍 ☁️

┏━━━━━━━━━━━━━━━━━━━⫸
┃╭──────────────────╸
┃│ ✧ 𝗥𝗔𝗡𝗗𝗢𝗠 ✧
┃│
┃│「⚡️」 /randomanime
┃│「⚡️」 /walldesktop
┃│「⚡️」 /wallphone
໋ꥇ┃╰──────────────────╸
┗━━━━━━━━━━━━━━━━━━━⫸

/help    /herramientas   /descargas`;
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