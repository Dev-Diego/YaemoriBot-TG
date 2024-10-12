const DC = require("../global");
const logCommand = require('../log/logcommand');

DC.command('start', (ctx) => {
        
        const imageUrl = 'https://telegra.ph/file/6ffc21491dc41ec3b4abd.jpg?raw=true';

        const caption = `🪻 CX Start 🪻---->
| 👤 Yo soy @Sk_YaemoriMini_Bot,
| https://t.me/Sk_YaemoriMini_Bot
|
| 👑 Creador
| @Oficial_Diego
| https://t.me/Oficial_Diego
|
| 🌸 Grupo Oficial
| YaemoriBot
| https://t.me/YaemoriGrupo
|
| ✨️ Aqui esta el menu
| /help
|
|------------->
        `;

ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });
    });


module.exports = start;