const fetch = require('node-fetch');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');

async function simi() {
        DC.command(['simi', 'bot', 'kotori'], async (ctx) => {
            logCommand(ctx);
    const text = ctx.message.text;
    if (!text) {
        ctx.reply('*[❗] 𝙸𝙽𝙶𝚁𝙴𝚂𝙴 𝚄𝙽 𝚃𝙴𝚇𝚃𝙾 𝙿𝙰𝚁𝙰 𝙷𝙰𝙱𝙻𝙰𝚁 𝙲𝙾𝙽 𝚂𝙸𝙼𝚂𝙸𝙼𝙸 𝙾 𝙴𝙻 𝙱𝙾𝚃*\n\n*𝙴𝙹𝙴𝙼𝙿𝙻𝙾: /simi Hola bot*');
        return;
    }

    try {
        const api = await fetch('https://api.simsimi.net/v2/?text=' + text + '&lc=es');
        const resSimi = await api.json();
        ctx.reply(resSimi.success);
    } catch {
        try {
            let translatedText = text.replace(/Hola|hola|HOLA/g, 'Hello');
            const reis = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=' + translatedText);
            const resu = await reis.json();
            const api = await fetch('http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=1&msg=' + resu[0][0][0]);
            const res = await api.json();
            const reis2 = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=' + res.cnt);
            const resu2 = await reis2.json();
            ctx.reply(resu2[0][0][0]);
        } catch (error) {
            dc.warn("Error en el comando simi:", error);
            throw `*[❗] 𝙴𝚁𝚁𝙾𝚁, 𝚅𝚄𝙴𝙻𝚅𝙴 𝙰 𝙸𝙽𝚃𝙴𝙽𝚃𝙰𝚁𝙻𝙾*`;
        }
    }
})
}

module.exports = simi;