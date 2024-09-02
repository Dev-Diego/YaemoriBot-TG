const fs = require('fs');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const { Markup } = require('telegraf');

DC.action('herramientas', async (ctx) => {
            await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
            await ctx.replyWithPhoto({ url: 'https://telegra.ph/file/58e670ea08aafdda5fd42.jpg' }, { caption: `
╭─╮︹︹⊹︹︹⊹︹︹⊹︹︹╭─╮
    ⚘݄𖠵⃕⁖𖥔͢Menu ꪶ͢𝑩𝒐𝒕⋆᭄͙̈
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Hᴇʀʀᴀᴍɪᴇɴᴛᴀs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎ /wiki + texto_
├ׁ̟̇❍✎ /translate +identificador + texto
├ׁ̟̇❍✎ /identificadores
├ׁ̟̇❍✎ /spanishto + texto
├ׁ̟̇❍✎ /ia + texto
├ׁ̟̇❍✎ /tourl + responde a una imagen o video
໋ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦
/help    /juegos   /descargas` });
             });
             DC.action('juegos', async (ctx) => {
            await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
            await ctx.replyWithPhoto({ url: 'https://telegra.ph/file/58e670ea08aafdda5fd42.jpg' }, { caption: `
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
/help    /random   /descargas` });
                 });
                  DC.action('descargas', async (ctx) => {
            await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
            await ctx.replyWithPhoto({ url: 'https://telegra.ph/file/58e670ea08aafdda5fd42.jpg' }, { caption: `
╭─╮︹︹⊹︹︹⊹︹︹⊹︹︹╭─╮
    ⚘݄𖠵⃕⁖𖥔͢Menu ꪶ͢𝑩𝒐𝒕⋆᭄͙̈
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Dᴇsᴄᴀʀɢᴀs 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎ /twitter *<enlace / link / url>*
├ׁ̟̇❍✎ /mp3 *<enlace / link / url>*
├ׁ̟̇❍✎ /mp4 *<enlace / link / url>*
├ׁ̟̇❍✎ /tiktoksearch *<enlace / link / url>*
├ׁ̟̇❍✎ /peliculainfo *<nombre>*
├ׁ̟̇❍✎ /play *<enlace / link / url>*
├ׁ̟̇❍✎ /play2 *<enlace / link / url>*
├ׁ̟̇❍✎ /youtubechannel *<nombre>*
├ׁ̟̇❍✎ /googledrive *<enlace / link / url>*
├ׁ̟̇❍✎ /mediafire *<enlace / link / url>*
├ׁ̟̇❍✎ /tiktokimg *<enlace / link / url>*
├ׁ̟̇❍✎ /instagramstory *<enlace / link / url>*
├ׁ̟̇❍✎ /instagram *<enlace / link / url>*
├ׁ̟̇❍✎ /tiktok *<enlace / link / url>*
├ׁ̟̇❍✎ /applemusic *<enlace / link / url>*
├ׁ̟̇❍✎ /spotify *<enlace / link / url>*
├ׁ̟̇❍✎ /facebook *<enlace / link / url>*
├ׁ̟̇❍✎ /gitclone *<enlace / link / url>*
໋ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦
/help    /labiblia   /juegos` });
                      });
                       DC.action('random', async (ctx) => {
            await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
            await ctx.replyWithPhoto({ url: 'https://telegra.ph/file/58e670ea08aafdda5fd42.jpg' }, { caption: `
╭─╮︹︹⊹︹︹⊹︹︹⊹︹︹╭─╮
    ⚘݄𖠵⃕⁖𖥔͢Menu ꪶ͢𝑩𝒐𝒕⋆᭄͙̈
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇  「 Rᴀɴᴅᴏᴍ 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎ /randomanime
├ׁ̟̇❍✎ /walldesktop
├ׁ̟̇❍✎ /wallphone
໋ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦
/help    /herramientas   /descargas` });
                           });
                            DC.action('adult', async (ctx) => {
            await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
            await ctx.replyWithPhoto({ url: 'https://telegra.ph/file/58e670ea08aafdda5fd42.jpg' }, { caption: `
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
໋ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦
/help    /herramientas   /juegos` })
            });

async function ob() {
    try {
        DC.command(['obtenidos', 'obtenido', 'ob'], async (ctx) => {
            logCommand(ctx);
            try {
                const userId = ctx.from.id;
                let userData = {};
                try {
                    userData = JSON.parse(fs.readFileSync('data.json'));
                } catch (error) {
                    console.error("Error al leer el archivo JSON:", error);
                }

                // Verificar si el usuario está registrado en el archivo JSON
                if (userId in userData) {
                    // Contenido del mensaje
                    const { characterCount, totalRwcoins } = userData[userId];
                    const obtainedCharacters = characterCount;
                    const totalCharacters = 380; // Cambiar esto al número total de personajes disponibles
                    const missingCharacters = totalCharacters - obtainedCharacters;
                    const percentage = (obtainedCharacters / totalCharacters) * 100;
                    const message = `╭──────┄ ♡ ┄──────
│╽𝑻.𝑼 𝑰.𝑵.𝑽.𝑬.𝑵.𝑻.𝑨.𝑹.𝑰.𝑶╽
┊𝙋𝙚𝙧𝙨𝙤𝙣𝙖𝙟𝙚𝙨:
⎆ ${obtainedCharacters} 𝑊𝐹 ♡
┊𝙏𝙤𝙩𝙖𝙡 𝙙𝙚 𝙒𝙁𝙘𝙤𝙞𝙣𝙨:
│ ${totalRwcoins}
┊𝙋𝙤𝙧𝙘𝙚𝙣𝙩𝙖𝙟𝙚:
⎆ ${percentage.toFixed(2)}%
┊𝙋𝙚𝙧𝙨𝙤𝙣𝙖𝙟𝙚𝙨 𝙥𝙤𝙧 𝙤𝙗𝙩𝙚𝙣𝙚𝙧:
│ ${missingCharacters}
╰──────┄ ♢ ┄──────`;

                   const keyboard = Markup.inlineKeyboard([
                        Markup.button.callback('Menu principal', 'help')
                    ]);

if (ctx.callbackQuery && ctx.callbackQuery.data === 'help') {
    dc.log("Agregando botones adicionales al teclado...");
    dc.log("Teclado antes de agregar botones:", keyboard.inline_keyboard);
    
    keyboard.inline_keyboard = [
        ...keyboard.inline_keyboard,
        [{ text: 'Menu Herramientas', callback_data: 'herramientas' }],
        [{ text: 'Menu Juegos', callback_data: 'juegos' }],
        [{ text: 'Menu Descargas', callback_data: 'descargas' }],
        [{ text: 'Menu Random', callback_data: 'random' }],
        [{ text: 'Menu Comandos +18', callback_data: 'adult' }]
    ];

    dc.log("Teclado después de agregar botones:", keyboard.inline_keyboard);
}
                    ctx.reply(message, keyboard); 
                } else {
                    ctx.reply("* 𝗡𝗼 𝘁𝗶𝗲𝗻𝗲𝘀 𝗻𝗶𝗻𝗴𝘂𝗻 𝗼𝗯𝗷𝗲𝘁𝗼 𝗲𝗻 𝘁𝘂 𝗶𝗻𝘃𝗲𝗻𝘁𝗮𝗿𝗶𝗼 😹🫵!");
                }
            } catch (error) {
                dc.warn("Error en el comando obtenidos:", error);
            }
        });

DC.action('help', async (ctx) => {
    await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
    
   await ctx.replyWithPhoto({ url: 'https://telegra.ph/file/aee88a66e3c5970a1c9ea.jpg?raw=true' }, { caption: `
╭─╮︹︹⊹︹︹⊹︹︹⊹︹︹╭─╮
    ⚘݄𖠵⃕⁖𖥔͢Menu ꪶ͢𝑩𝒐𝒕⋆᭄͙̈
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇     「 Iɴғᴏ 」
├━─━─━─≪≪✠≫≫─━─━─━╯
├ׁ̟̇❍✎ /obtenidos
├ׁ̟̇❍✎ /creador
├ׁ̟̇❍✎ /grupos
├ׁ̟̇❍✎ /juegos
├ׁ̟̇❍✎ /descargas
├ׁ̟̇❍✎ /labiblia
├ׁ̟̇❍✎ /random
├ׁ̟̇❍✎ /herramientas
*໋̇ꥇ╰ׁ̻─ׅׄ ⊹ٜ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪߭ׄ꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜ߭ׄ꒦۪ׄ߭꒷ٜׄ߭꒦*` });
             });
    } catch (error) {
        dc.error('Error en el manejo del comando obtenidos:', error);
    }

}

module.exports = ob;