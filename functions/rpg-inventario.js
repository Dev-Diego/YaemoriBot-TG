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
*𝑰𝒏𝒗𝒆𝒏𝒕𝒂𝒓𝒊𝒐* 📦
╭─────────────╮
│ **XP Acumulado** 
│
│       ${xp}       
╰─────────────╯
╭──────────────╮
│ **Dinero Acumulado**
│
│      ${money}         
╰──────────────╯
🔹️ *𝑀𝑖𝑒𝑛𝑡𝑟𝑎𝑠 𝑚𝑎𝑠 𝑢𝑠𝑒𝑠 𝑒𝑙 𝑏𝑜𝑡 𝑚𝑎𝑠 𝑒𝑐𝑜𝑛𝑜𝑚𝑖𝑎 𝑡𝑒𝑛𝑑𝑟𝑎𝑧!*`;

        try {
            const response = await axios.get('https://telegra.ph/file/cc840d965a96d1f365e5a.jpg', { responseType: 'arraybuffer' });
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