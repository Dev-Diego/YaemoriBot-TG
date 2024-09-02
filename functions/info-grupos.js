const DC = require("../global");
const logCommand = require('../log/logcommand');

async function grupos() { 
   DC.command(['grupos', 'ofcgrupos', 'gruposofc'], async (ctx) => {
        logCommand(ctx);
        
        const imageUrl = 'https://telegra.ph/file/c0f83dc304a53ca9dfbf2.jpg?raw=true';

        const caption = `📍 GRUPO OFICIAL

		Telegram
 Hentai Company
┃🧸❏ https://t.me/Kotori_OFC

		Whatsapp
 Hentai Company
┃🧸❏ https://chat.whatsapp.com/H5bw4MJucS1BBHnZ9wv3vI
   
 Grupo de antojar 3.0
┃🧸❏ https://chat.whatsapp.com/IQUaNCewDirKfJaOIsOxfR
╰━━━━━━━━━━━━━━━━⊜ `;

ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });
    });
}

module.exports = grupos;
