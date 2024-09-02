const fs = require('fs');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const axios = require('axios');

async function qc() {
    try {
        DC.command(['qc'], async (ctx) => {
            try {
                let text;
                if (ctx.message.text) {
                    text = ctx.message.text.split(' ').slice(1).join(' ');
                } else if (ctx.message.reply_to_message && ctx.message.reply_to_message.text) {
                    text = ctx.message.reply_to_message.text;
                } else {
                    throw new Error('Uso incorrecto del comando, agregue un texto');
                }

                if (!text) throw new Error('Uso incorrecto del comando, agregue un texto');
                if (text.length > 30) throw new Error('El texto no puede tener más de 30 caracteres');

   
                const mentionedUser = (ctx.message.mentions && ctx.message.mentions[0]) || ctx.message.from;
                const pp = mentionedUser && mentionedUser.photoUrl ? mentionedUser.photoUrl : 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
                const nombre = mentionedUser ? mentionedUser.username || mentionedUser.first_name : 'Unknown';
                
                const obj = {
                    "type": "quote",
                    "format": "png",
                    "backgroundColor": "#000000",
                    "width": 512,
                    "height": 768,
                    "scale": 2,
                    "messages": [
                        {
                            "entities": [],
                            "avatar": true,
                            "from": {
                                "id": 1,
                                "name": nombre,
                                "photo": { "url": pp }
                            },
                            "text": text,
                            "replyMessage": {}
                        }
                    ]
                };

                const response = await axios.post('https://bot.lyo.su/quote/generate', obj, { headers: { 'Content-Type': 'application/json' } });
                const buffer = Buffer.from(response.data.result.image, 'base64');
                
               
                await ctx.replyWithPhoto({ source: buffer });
            } catch (error) {
                console.error('Error en el comando qc:', error);
                await ctx.reply('Ocurrió un error al generar la imagen.');
            }
        });
    } catch (error) {
        console.error('Error en el comando qc:', error);
    }
}

module.exports = qc;