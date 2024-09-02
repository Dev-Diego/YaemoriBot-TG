const fs = require('fs');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const linkRegex = /(https?:\/\/(?:www\.)?(?:t\.me|telegram\.me|whatsapp\.com)\/\S+)|(https?:\/\/chat\.whatsapp\.com\/\S+)|(https?:\/\/whatsapp\.com\/channel\/\S+)/i;

const loadDataFromFile = () => {
    if (fs.existsSync('data.json')) {
        return JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    } else {
        return {};
    }
};

const saveDataToFile = () => {
    fs.writeFileSync('data.json', JSON.stringify(antilinkData, null, 2));
};

let antilinkData = loadDataFromFile()

const getAntilinkStatus = (chatId) => {
    return antilinkData[chatId] || false;
};

const enableAntilink = (chatId) => {
    console.log(`Activando antilink para el grupo ${chatId}`);
    antilinkData[chatId] = true;
    saveDataToFile();
    console.log(`Antilink activado para el grupo ${chatId}`);
};

const disableAntilink = (chatId) => {
    console.log(`Desactivando antilink para el grupo ${chatId}`);
    antilinkData[chatId] = false;
    saveDataToFile();
    console.log(`Antilink desactivado para el grupo ${chatId}`);
};

DC.command('antilink', (ctx) => {
    if (ctx.message.chat.type !== 'supergroup') {
        ctx.reply('Este comando solo puede ser utilizado en grupos.');
        return;
    }

    if (!ctx.message.from || !ctx.message.from.id) {
        ctx.reply('No se pudo identificar al usuario.');
        return;
    }

    const chatId = ctx.message.chat.id;
    const userId = ctx.message.from.id;

    DC.telegram.getChatMember(chatId, userId).then((member) => {
         if (!member || !member.status || !(member.status === 'administrator' || member.status === 'creator')) {
            ctx.reply('¡Solo los administradores pueden utilizar este comando!');
            return;
        }
        const antilinkEnabled = getAntilinkStatus(chatId);
        const command = ctx.message.text.split(' ')[1];
        if (command === 'on') {
            if (!antilinkEnabled) {
                enableAntilink(chatId);
                ctx.reply('El modo antilink se ha activado para este grupo.');
            } else {
                ctx.reply('¡El modo antilink ya está activado!');
            }
        } else if (command === 'off') {
            if (antilinkEnabled) {
                disableAntilink(chatId);
                ctx.reply('El modo antilink se ha desactivado para este grupo.');
            } else {
                ctx.reply('¡El modo antilink ya está desactivado!');
            }
        } else {
            ctx.reply('Comando inválido. Usa /antilink on para activar o /antilink off para desactivar.');
        }
    }).catch((error) => {
        console.error('Error al verificar el estado del usuario:', error);
        ctx.reply('Ocurrió un error al procesar tu solicitud.');
    });
});

DC.on('message', async (ctx, next) => {
    const chatType = ctx.message.chat.type;
    const isGroupMessage = chatType === 'supergroup' || chatType === 'group';

    if (!isGroupMessage) {
        return next();
    }

    const chatId = ctx.message.chat.id;
    const antilinkEnabled = getAntilinkStatus(chatId); 

    if (antilinkEnabled) {
        let messageText = ctx.message.text || '';
        if (ctx.message.entities && ctx.message.entities.length > 0) {
            const linkEntities = ctx.message.entities.filter(entity => entity.type === 'url');
            messageText += linkEntities.map(entity => ctx.message.text.slice(entity.offset, entity.offset + entity.length)).join(' ');
        }
        const isLink = linkRegex.test(messageText);

        if (isLink) {
            const senderId = ctx.message.from.id;
            const member = await ctx.telegram.getChatMember(chatId, senderId);
            const isAdmin = member.status === 'administrator' || member.status === 'creator';

            if (!isAdmin) {
   
                await ctx.deleteMessage(ctx.message.message_id);
                await ctx.kickChatMember(senderId);
                ctx.reply('Los enlaces de grupos y canales no están permitidos en este chat.');
            }
        }
    }

    return next();
});

module.exports = DC;