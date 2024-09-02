
const fs = require('fs');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');

const loadDataFromFile = () => {
    if (fs.existsSync('data.json')) {
        return JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    } else {
        return {};
    }
};

const saveDataToFile = (data) => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

let modohornyData = loadDataFromFile();

const isModoHornyEnabled = (chatId) => {
    return modohornyData.modohorny[chatId] || false;
};

const enableModoHorny = (chatId) => {
    console.log(`Activando modo +18 para el grupo ${chatId}`);
    modohornyData.modohorny[chatId] = true;
    saveDataToFile(modohornyData);
    console.log(`Modo +18 activado para el grupo ${chatId}`);
};

const disableModoHorny = (chatId) => {
    console.log(`Desactivando modo +18 para el grupo ${chatId}`);
    modohornyData.modohorny[chatId] = false;
    saveDataToFile(modohornyData);
    console.log(`Modo +18 desactivado para el grupo ${chatId}`);
};

DC.command('modohorny', (ctx) => {
    logCommand(ctx);
    if (ctx.message.chat.type !== 'supergroup' && ctx.message.chat.type !== 'group') {
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
        const command = ctx.message.text.split(' ')[1];
        if (command === 'on') {
            if (!isModoHornyEnabled(chatId)) {
                enableModoHorny(chatId);
                ctx.reply('Los comandos +18 están activados para este grupo.');
            } else {
                ctx.reply('¡Los comandos +18 ya están activados para este grupo!');
            }
        } else if (command === 'off') {
            if (isModoHornyEnabled(chatId)) {
                disableModoHorny(chatId);
                ctx.reply('Los comandos +18 están desactivados para este grupo.');
            } else {
                ctx.reply('¡Los comandos +18 ya están desactivados para este grupo!');
            }
        } else {
            ctx.reply('Comando inválido. Usa /modohorny on para activar o /modohorny off para desactivar.');
        }
    }).catch((error) => {
        console.error('Error al verificar el estado del usuario:', error);
        ctx.reply('Ocurrió un error al procesar tu solicitud.');
    });
});

module.exports =  isModoHornyEnabled, enableModoHorny, disableModoHorny