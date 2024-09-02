const DC = require('../global');
const logCommand = require('../log/logcommand');
const obtenerDatos = () => {
    if (fs.existsSync('data.json')) {
        return JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    } else {
        return {};
    }
};

const axios = require('axios');

DC.command(['inventario','bl', 'balance'], async (ctx) => {
    logCommand(ctx);
    const userId = ctx.from.id;
    const userData = obtenerDatos();

    if (userData[userId] && userData[userId].xp) {
        const xp = userData[userId].xp;
        const money = userData[userId].money || 0; 
        const message = `
\`INVENTARIO\` 📦
╭─────────────╮
│ \`XP Acumulado`\
│
│       ${xp}       
╰─────────────╯
╭──────────────╮
│ \`Dinero Acumulado`\
│
│      ${money}         
╰──────────────╯
🔹️ *Cuando mas uses el bot mas economia tendrás!*`;

        try {
            const response = await axios.get('https://telegra.ph/file/51aa55f972b2518325dfb.jpg', { responseType: 'arraybuffer' });
            const photo = Buffer.from(response.data, 'binary');
            ctx.replyWithPhoto({ source: photo }, { caption: message, parse_mode: 'Markdown' });
        } catch (error) {
            console.error('Error al descargar la imagen:', error);
            ctx.reply("Ocurrió un error al cargar la imagen.");
        }
    } else {
        ctx.reply("Aún no has acumulado XP en tu inventario.");
    }
});
module.exports = DC;