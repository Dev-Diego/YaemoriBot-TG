const DC = require("../global");
const logCommand = require('../log/logcommand');

async function start() {
       DC.command("start", async (ctx) => {
            logCommand(ctx);
        
        const imageUrl = 'https://telegra.ph/file/e973c7c4f0abf5d7a6476.jpg?raw=true';

        const caption = `🪻 CX Start 🪻---->
| Yo soy @Sk_YaemoriMini_Bot,
| https://t.me/Sk_YaemoriMini_Bot
|
| Creador
| @Oficial_Diego
| https://t.me/Oficial_Diego
|
| Grupo Oficial
|_YaemoriBot-MD GP 🌸_
| https://t.me/YaemoriGrupo
|
| Aqui esta el menu
| /help
|
|------------->
        `;

ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });
    });
}

module.exports = start;