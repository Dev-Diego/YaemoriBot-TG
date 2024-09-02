const DC = require("../global");
const logCommand = require('../log/logcommand');

async function creador() { 
    DC.command('creador', async (ctx) => {
        logCommand(ctx);
        
        const imageUrl = 'https://telegra.ph/file/80516c0f4fa0d7da3cba6.jpg';

        const caption = `╭━━━━━━･❪ ❁ ❫ ･━━━━━━
│➸ **Mi Creador es**
│➸ **@DavidChian**
│➸ https://t.me/DavidChian
│
│•°•°•°•°•°•°•°•°•°•°•°•°•°•°•°•
│
│➸ **Mi colaborador principal**
│➸ **Stevenxd999**
│➸ **+593 984964830**  
│
│•°•°•°•°•°•°•°•°•°•°•°•°•°•°•°•
│
│➸ ৎ୭࠭͢𝑲𝒐̣𝒕̣֟፝𝒐̣𝒓̣𝒚⸸̣ʙⷪᴏ͓ᷫᴛⷭ𓆪͟͞ 🧸📍
╰━━━━━━･❪ ❁ ❫ ･━━━━━━❖
        `;

ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });
    });
}

module.exports = creador;
