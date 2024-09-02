const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');

async function doxxeo() {
    DC.command(['doxear', 'doxxeo', 'doxxear', 'doxeo', 'doxxeame', 'doxeame'], async (ctx) => {
        logCommand(ctx);

        const text = ctx.message.text;
        const executionTime = Math.random() * (10000 - 5000) + 5000; 

        const fakeData = generateFakeData(text);

        const doxeoMessage = `*[ ✔ ] Persona doxxeada con éxito.*\n\n*—◉ Doxxeo realizado en:*\n*◉ ${executionTime.toFixed(2)} segundos.*\n*—◉ Resultados obtenidos del doxxeo:*\n\n${fakeData}`;

        await ctx.reply(doxeoMessage);
    });
}

function generateFakeData(text) {
    const ipParts = [];
    for (let i = 0; i < 4; i++) {
        ipParts.push(Math.floor(Math.random() * 256))
    }
    const ipAddress = ipParts.join('.');
    
    const fakeData = `
    *Nombre:* ${text}
    *Ip:* ${ipAddress}
    *N:* ${Math.floor(Math.random() * 100000)}
    *W:* ${(Math.random() * (20 - 10) + 10).toFixed(4)}
    *SS NUMBER:* ${Math.floor(Math.random() * 10000000000000000)}
    *CAMARA DEL CELULAR:* http://${ipAddress}.com/camera-feed
    *IPV6:* fe80:${(Math.random() * 65535).toString(16)}:${(Math.random() * 65535).toString(16)}:${(Math.random() * 65535).toString(16)}:${(Math.random() * 65535).toString(16)}%${Math.floor(Math.random() * 100)}
    *UPNP:* ${getRandomValue(['Enabled', 'Disabled'])}
    *DMZ:* ${`${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`}
    
    `;

    return fakeData;
}

function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = doxxeo;