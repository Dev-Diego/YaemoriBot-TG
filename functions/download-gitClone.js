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
            return ctx.reply(`🌸 Te faltó el github\nEjemplo: https://github.com/Dev-Diego/YaemoriBot-MD`);
        }
        
        if (!regex.test(args[0])) {
            return ctx.reply('Enlace incorrecto ✨️');
        }

        const [_, user, repo] = args[0].match(regex) || [];
        const url = `https://api.github.com/repos/${user}/${repo}/zipball`;
        const response = await fetch(url, { method: 'HEAD' });
        const filename = response.headers.get('content-disposition').match(/attachment; filename=(.*)/)[1];

        await ctx.reply(`👑 Enviando su Zip. ...`);
        await ctx.replyWithDocument(url, { filename });

    } catch (error) {
        console.error("Ocurrió un error al procesar el comando:", error);
 
        // ctx.reply("Ocurrió un error al procesar el comando.");
    }
        })
}
module.exports = gitClone;