const DC = require("../global");
const logCommand = require("../log/logcommand");
const dc = require('consola');

async function herramientas() {
    try {
        DC.command('herramientas', async (ctx) => {
            logCommand(ctx);

            try {
                const imageUrl = 'https://telegra.ph/file/65d33e1257607d4b05a1c.jpg?raw=true'; 
                const caption = `
© mᥱᥒᥙ ᥆𝖿іᥴіᥲᥣ ძᥱ ᥡᥲᥱm᥆rіᑲ᥆𝗍 ☁️

┏━━━━━━━━━━━━━━━━━━━⫸
┃╭──────────────────╸
┃│ ✧ 𝗛𝗘𝗥𝗥𝗔𝗠𝗜𝗘𝗡𝗧𝗔𝗦 ✧
┃│
┃│「👑」 /wiki + texto_
┃│「👑」 /translate +identificador + texto
┃│「👑」/identificadores
┃│「👑」 /spanishto + texto
┃│「👑」 /ia + texto
┃│「👑」 /dalle + texto
┃│「👑」 /dalle2 + texto
┃│「👑」 /tourl + responde a una imagen o video
┃╰──────────────────╸
┗━━━━━━━━━━━━━━━━━━━⫸

/help    /juegos   /descargas`;
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