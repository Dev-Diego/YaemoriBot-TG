const fetch = require('node-fetch');
const path = require('path');
const DC = require('../global');
const logCommand = require('../log/logcommand');

const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;

async function gitClone() {
    
        DC.command(['gitclone', 'git'], async (ctx) => {
    logCommand(ctx);
try {
    const args = ctx.message.text.split(' ').slice(1);
    const usedPrefix = '/';
        const command = 'gitclone';
        if (!args[0]) {
            return ctx.reply(`*[❗𝐈𝐍𝐅𝐎❗] 𝙸𝙽𝙶𝚁𝙴𝚂𝙴 𝚄𝙽 𝙴𝙽𝙻𝙰𝙲𝙴 𝙳𝙴 𝙶𝙸𝚃𝙷𝚄𝙱, 𝙴𝙹𝙴𝙼𝙿𝙻𝙾: ${usedPrefix + command} https://github.com/BrunoSobrino/TheMystic-Bot-MD*`);
        }
        
        if (!regex.test(args[0])) {
            return ctx.reply('*[❗𝐈𝐍𝐅𝐎❗] 𝙻𝙸𝙽𝙺 𝙸𝙽𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙾!*');
        }

        const [_, user, repo] = args[0].match(regex) || [];
        const url = `https://api.github.com/repos/${user}/${repo}/zipball`;
        const response = await fetch(url, { method: 'HEAD' });
        const filename = response.headers.get('content-disposition').match(/attachment; filename=(.*)/)[1];

        await ctx.reply(`*[❗𝐈𝐍𝐅𝐎❗] 𝙴𝚂𝙿𝙴𝚁𝙴 𝚄𝙽 𝙼𝙾𝙼𝙴𝙽𝚃𝙾 𝙴𝙽 𝙻𝙾 𝚀𝚄𝙴 𝙴𝙽𝚅𝙸𝙾 𝚂𝚄 𝙰𝚁𝙲𝙷𝙸𝚅𝙾, 𝚂𝙸 𝙴𝚂𝚃𝙴 𝙽𝙾 𝙴𝚂𝚅𝙸𝙰𝙳𝙾 𝙿𝚄𝙴𝙳𝙴 𝙳𝙴𝙱𝙴𝚁𝚂𝙴 𝙰 𝚀𝚄𝙴 𝙴𝙻 𝚁𝙴𝙿𝙾𝚂𝙸𝚃𝙾𝚁𝙸𝙾 𝙴𝚂 𝙼𝚄𝚈 𝙿𝙴𝚂𝙰𝙳𝙾*`);
        await ctx.replyWithDocument(url, { filename });

    } catch (error) {
        console.error("Ocurrió un error al procesar el comando:", error);
 
        // ctx.reply("Ocurrió un error al procesar el comando.");
    }
        })
}
module.exports = gitClone;