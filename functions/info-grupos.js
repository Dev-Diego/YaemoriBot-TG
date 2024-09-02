const DC = require("../global");
const logCommand = require('../log/logcommand');

async function grupos() { 
   DC.command(['grupos', 'ofcgrupos', 'gruposofc'], async (ctx) => {
        logCommand(ctx);
        
        const imageUrl = 'https://telegra.ph/file/c877b29d1ac82356f239e.jpg?raw=true';

        const caption = `*Hola!, te invito a unirte a los grupos oficiales de del Bot para convivir con la comunidad :D* 🍂

1- YaemoriBot 🍭
*✰* https://t.me/YaemoriGrupo

─ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ

➠ Enlace anulado? entre aquí! 

♡ Canal :
*✰* https://t.me/YaemoriChannel

> © ⍴᥆ᥕᥱrᥱძ ᑲᥡ sᥙᥒᥣіgһ𝗍 𝗍ᥱᥲm`;

ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });
    });
}

module.exports = grupos;
