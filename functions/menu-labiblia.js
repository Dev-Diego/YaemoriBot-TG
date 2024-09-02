const DC = require("../global");
const logCommand = require("../log/logcommand");
const dc = require('consola');

async function labiblia() {
    try {
       DC.command(['labiblia'], async (ctx) => {
            logCommand(ctx);

            try {
                const imageUrl = 'https://telegra.ph/file/18a85eceefa00853ae8a1.jpg?raw=true'; 
                const caption = `
╭─╮︹︹⊹︹︹⊹︹︹⊹︹︹╭─╮
    ⚘݄𖠵⃕⁖𖥔͢Menu ꪶ͢𝑩𝒐𝒕⋆᭄͙̈
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Cᴏᴍᴀɴᴅᴏs +𝟷𝟾 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎ /pack
├ׁ̟̇❍✎ /pack2
├ׁ̟̇❍✎ /pack3
├ׁ̟̇❍✎ /videosxxxc
├ׁ̟̇❍✎ /videosxxxc2
├ׁ̟̇❍✎ /hentai
├ׁ̟̇❍✎ /rule34 + texto
໋ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦
/help    /herramientas   /juegos`;
              ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });                    
            } catch (error) {
                dc.warn("Hay un error");
            }
        });  
    } catch (error) {
        dc.error('hay un error en help.js');
    }
    
}

module.exports = labiblia;