const DC = require("../global");
const logCommand = require("../log/logcommand");
const dc = require('consola');

async function juegos() {
    try {
       DC.command(['juegos'], async (ctx) => {
            logCommand(ctx);

            try {
                const imageUrl = 'https://telegra.ph/file/ad12431e0fe116dcd1d31.jpg?raw=true'; 
                const caption = `
╭─╮︹︹⊹︹︹⊹︹︹⊹︹︹╭─╮
    ⚘݄𖠵⃕⁖𖥔͢Menu ꪶ͢𝑩𝒐𝒕⋆᭄͙̈
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Jᴜᴇɢᴏs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎ /cum + mencion
├ׁ̟̇❍✎ /violar + mencion
├ׁ̟̇❍✎ /nalguear + mencion
├ׁ̟̇❍✎ /sexo + mencion
├ׁ̟̇❍✎ /kiss + mencion
├ׁ̟̇❍✎ /qc + texto
├ׁ̟̇❍✎ /rw
├ׁ̟̇❍✎ /love + responde a un usuario
໋ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦
/help    /random   /descargas`;
              ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });                    
            } catch (error) {
                dc.warn("Hay un error");
            }
        });  
    } catch (error) {
        dc.error('hay un error en help.js');
    }
    
}

module.exports = juegos;