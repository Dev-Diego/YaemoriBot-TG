const DC = require("../global");
const logCommand = require('../log/logcommand');

async function start() {
    DC.start((ctx) => {
        logCommand(ctx);
        
        const imageUrl = 'https://telegra.ph/file/619ec1ba8c6caa6b38712.jpg?raw=true';

        const caption = `🪻 CX Start 🪻---->
| Yo soy @Kotori_Ultra_bot,
| https://t.me/Kotori_Ultra_bot
|
| Creador
| @DavidChian
| https://t.me/DavidChian
|
| Grupo Oficial
|_〾̷̸‣⃝⃨⃛⃰⁝̵̓ᝒ̷̸͙🌸̶̩ܻᝒ̷̸͙𝗛꯭𝝣꯭𐌽꯭ᷨ𐍄꯭ͦ𐌰ͭ𐌹᭄𓆩֟֯፝𓆪🄲̷̵̸͙͜ɵ⃨᪻𝐦⃛ᵱ͢𝐚̇ᴎ̶͙𝐲̈🍁⃝⃙̻⃮̋⃛⃰⁌̷̸̊͟⿻᳔̶̷̸_
| https://t.me/Kotori_OFC
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