const DC = require("../global");
const logCommand = require("../log/logcommand");
const dc = require('consola');
const { Markup } = require('telegraf');
const fetch = require('node-fetch');
const fs = require('fs');
const moment = require('moment-timezone');
const initializeDatabase = () => {
    if (fs.existsSync('data.json')) {
        userData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    }
};
let userData = {};
initializeDatabase();
let startTime = Date.now();
//const _uptime = process.uptime() * 1000;
//const uptime = clockString(_uptime);
const locale = 'es';
const d = new Date(new Date + 3600000);
const week = d.toLocaleDateString(locale, {weekday: 'long'});
const date = d.toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'});
const userCount = Object.keys(userData).length;
async function loading(ctx, response) {
    const hawemod = [
        "Pronto se remitirá el menú 🚀"
    ];
    
   const message = await ctx.reply('Aguarde', { mentions: ctx.message });

    for (let i = 0; i < hawemod.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await ctx.telegram.editMessageText(ctx.chat.id, message.message_id, null, hawemod[i], { parse_mode: "Markdown" });
    }

    await ctx.telegram.editMessageText(ctx.chat.id, message.message_id, null, response, { parse_mode: "Markdown" });
}

async function helper(ctx) {
    try {
        
       DC.command(['help', 'menu'], async (ctx) => {
            logCommand(ctx);
            try {
                const diff = Date.now() - startTime;
        const uptime = clockString(diff);
                const loadingMessage = await ctx.reply(`🌸 Espere un momento... 🔥`); 
                const imageUrl = 'https://qu.ax/CmyNh.jpg?raw=true';
                const caption = `•/• INFORMACIÓN •/•

🌱 𝐂𝐫𝐞𝐚𝐝𝐨𝐫: DevDiego
🐢 𝐁𝐨𝐭: YaemoriBot-TG
🚀 𝐇𝐨𝐬𝐭𝐢𝐧𝐠: Sky Ultra Plus
💫 𝐍𝐮𝐦𝐞𝐫𝐨: https://t.me/Oficial_Diego
🕒 𝐀𝐜𝐭𝐢𝐯𝐢𝐝𝐚𝐝: ${uptime}
🌴 𝐆𝐫𝐮𝐩𝐨: https://t.me/YaemoriGrupo
📅 𝐅𝐞𝐜𝐡𝐚: ${date}
👤 𝐔𝐬𝐮𝐚𝐫𝐢𝐨𝐬: ${userCount}` 
                            

                await loading(ctx, "👑 Aquí está el menú oficial 🌸");
   
                ctx.replyWithPhoto({ url: imageUrl }, {
                    caption: caption,
                    reply_markup: {
                        inline_keyboard: [
						    [{ text: 'Menu Grupos', callback_data: 'group' }],
                            [{ text: 'Menu Herramientas', callback_data: 'herramientas' }],
                            [{ text: 'Menu Juegos', callback_data: 'juegos' }],
                            [{ text: 'Menu Descargas', callback_data: 'descargas' }],
                            [{ text: 'Menu Random', callback_data: 'random' }],
                            [{ text: 'Menu Comandos +18', callback_data: 'adult' }],
                        ],
                    },
                });

            } catch (error) {
                cx.warn("Hay un error");
            }
        });
		 DC.action('group', async (ctx) => {
            await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
            await ctx.replyWithPhoto({ url: 'https://qu.ax/CmyNh.jpg' }, { caption: `
•/• MENÚ GRUPOS •/•

✰ #antilink + on o off
✰ #modohorny + on o off
✰ #fijar + responder mensaje
✰ #kick + responer usuario` });
             });
         DC.action('herramientas', async (ctx) => {
            await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
            await ctx.replyWithPhoto({ url: 'https://qu.ax/CmyNh.jpg' }, { caption: `•/• MENÚ HERRAMIENTAS •/•

✰ #wiki + texto_
✰ #translate + identificador + texto
✰ #identificadores
✰ #spanishto + texto
✰ #ia + texto
✰ #dalle + texto
✰ #dalle2 + texto
✰ #tourl + responde a una imagen o video` });
             });
             DC.action('juegos', async (ctx) => {
            await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
            await ctx.replyWithPhoto({ url: 'https://qu.ax/CmyNh.jpg' }, { caption: `•/• MENÚ JUEGOS •/•

✰ #cum + mencion
✰ #violar + mencion
✰ #nalguear + mencion
✰ #sexo + mencion
✰ #kiss + mencion
✰ #qc + texto
✰ #rw
✰ #love + responde a un usuario` });
                 });
                  DC.action('descargas', async (ctx) => {
            await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
            await ctx.replyWithPhoto({ url: 'https://qu.ax/CmyNh.jpg' }, { caption: `•/• MENÚ DESCARGAS •/•

✰ #twitter <enlace / link / url>
✰ #mp3 <enlace / link / url>
✰ #mp4 <enlace / link / url>
✰ #tiktoksearch <enlace / link / url>
✰ #peliculainfo <nombre>
✰ #youtubechannel <nombre>
✰ #googledrive <enlace / link / url>
✰ #mediafire <enlace / link / url>
✰ #tiktokimg <enlace / link / url>
✰ #instagramstory <enlace / link / url>
✰ #instagram <enlace / link / url>
✰ #tiktok <enlace / link / url>
✰ #applemusic <enlace / link / url>
✰ #spotify <enlace / link / url>
✰ #facebook <enlace / link / url>
✰ #gitclone <enlace / link / url>` });
                      });
                       DC.action('random', async (ctx) => {
            await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
            await ctx.replyWithPhoto({ url: 'https://qu.ax/CmyNh.jpg' }, { caption: `•/• MENÚ RANDOM •/•

✰ #randomanime
✰ #walldesktop
✰ #wallphone` });
                           });
                            DC.action('adult', async (ctx) => {
            await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
            await ctx.replyWithPhoto({ url: 'https://qu.ax/CmyNh.jpg' }, { caption: `•/• MENU +18 •/•

✰ #pack
✰ #pack2
✰ #pack3
✰ #videosxxxc
✰ #videosxxxc2
✰ #hentai
✰ #rule34 + texto` })
                                });
    } catch (error) {
        dc.error('hay un error en help.js');
    }  
}
 function clockString(ms) {
  const diff = Date.now() - startTime;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
 }
module.exports = helper;