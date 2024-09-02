const DC = require("../global");
const logCommand = require('../log/logcommand');

async function creador() { 
    DC.command('creador', async (ctx) => {
        logCommand(ctx);
        
        const imageUrl = 'https://telegra.ph/file/b3002196ad8768914d809.jpg';

        const caption = `╭━━━━━━･❪ ❁ ❫ ･━━━━━━
│➸ **Mi Creador es**
│➸ **@Oficial_Diego**
│➸ https://t.me/Oficial_Diego
│
│•°•°•°•°•°•°•°•°•°•°•°•°•°•°•°•
│
│➸ **Mi colaborador principal**
│➸ **@DavidChian** 
│
│•°•°•°•°•°•°•°•°•°•°•°•°•°•°•°•
│
│➸ YaemoriBot - TG ☁️
╰━━━━━━･❪ ❁ ❫ ･━━━━━━❖
        `;

ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });
    });
}

module.exports = creador;
