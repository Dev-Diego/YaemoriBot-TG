const fetch = require('node-fetch');
const gtts = require('node-gtts');
const fs = require('fs');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const path = require('path');
const axios = require('axios');
const translate = require('@vitalets/google-translate-api');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({ organization: global.openai_org_id, apiKey: global.openai_key });
const openai = new OpenAIApi(configuration);

const idioma = 'es';
const sistema1 = `Actuarás como un Bot de Telegram el cual fue creado por DavidChian, tu serás Kotori-Bot.`;

async function chatgptvoz() {
    DC.command(['chatgptvoz', 'ia2'], async (ctx) => {
        const text = ctx.message.text.replace(['ia2', 'chatgptvoz'], '').trim();
        if (!text) {
            ctx.reply("*🧸 𝙸𝙽𝙶𝚁𝙴𝚂𝙴 𝚄𝙽 𝚃𝙴𝚇𝚃𝙾 𝙿𝙰𝚁𝙰 𝙲𝚁𝙴𝙰𝚁 𝚄𝙽𝙰 𝙸𝙼𝙰𝙶𝙴𝙽 𝚈 𝙰𝚂𝙸 𝚄𝚂𝙰𝚁 𝙻𝙰 𝙵𝚄𝙽𝙲𝙸𝙾𝙽 𝙳𝙴 𝙳𝙰𝙻𝙻-𝙴*\n\n*—◉ 𝙴𝙹𝙴𝙼𝙿𝙻𝙾𝚂 𝙳𝙴 𝙿𝙴𝚃𝙸𝙲𝙸𝙾𝙽𝙴𝚂*\n*◉ ${usedPrefix + command} Reflexion sobre la serie Merlina 2022 de netflix*\n*◉ ${usedPrefix + command} Codigo en JS para un juego de cartas*");
            return;
        }

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${global.openai_key}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'system', content: sistema1 }],
                    context: text
                })
            });
            const result = await response.json();
            const finalResponse = result.choices[0].message.content;

            if (finalResponse === 'error' || !finalResponse) {
                throw new Error('Empty response');
            }

            const audio = await tts(finalResponse, idioma);
            ctx.replyWithVoice({ source: audio });
        } catch {
            try {
                const botIA222 = await openai.createCompletion({
                    model: 'text-davinci-003',
                    prompt: text,
                    temperature: 0.3,
                    max_tokens: 4097,
                    stop: ['Ai:', 'Human:'],
                    top_p: 1,
                    frequency_penalty: 0.2,
                    presence_penalty: 0
                });

                const responseText = botIA222.data.choices[0].text;

                if (responseText === 'error' || !responseText) {
                    throw new Error('Empty response');
                }

                const audio = await tts(responseText, idioma);
                ctx.replyWithVoice({ source: audio });
            } catch {
                ctx.reply("🥀 *Lo siento, hubo un fallo en la API*.");
            }
        }
    });
}


module.exports = chatgptvoz

async function tts(text = 'error', lang = 'es') {
    return new Promise((resolve, reject) => {
        try {
            const tts = gtts(lang);
            const filePath = path.join(__dirname, '../tmp', (1 * new Date) + '.wav');
            tts.save(filePath, text, () => {
                resolve(fs.readFileSync(filePath));
                fs.unlinkSync(filePath);
            });
        } catch (e) {
            reject(e);
        }
    });
}