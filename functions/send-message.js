const { Telegraf } = require('telegraf');
const fs = require('fs');
const DC = require('../global');
const logCommand = require('../log/logcommand');

function initializeSession() {
    if (!fs.existsSync('session.json')) {
        fs.writeFileSync('session.json', JSON.stringify({}), 'utf-8');
        console.log('Archivo session.json creado con éxito.');
    }
}

function loadSession() {
    try {
        const sessionData = fs.readFileSync('session.json', 'utf-8');
        return JSON.parse(sessionData);
    } catch (err) {
        return {};
    }
}

function saveSession(session) {
    fs.writeFileSync('session.json', JSON.stringify(session), 'utf-8');
}

initializeSession();
let session = loadSession();

DC.command('send', (ctx) => {
    ctx.reply('Escribe el mensaje que deseas enviar y luego manda el contacto del usuario al cual deseas que le envíe el mensaje');
    session[ctx.chat.id] = { sendingMessage: true };
    saveSession(session);
});

DC.on('text', (ctx) => {
    const chatId = ctx.chat.id;
    if (session[chatId] && session[chatId].sendingMessage) {
        if (!session[chatId].messageToSend) {
            session[chatId].messageToSend = ctx.message.text;
            ctx.reply('Vale, ahora manda el contacto de la persona a la que deseas enviar este mensaje');
        } else {
            let contactToSend;
            if (ctx.message.contact) {

                contactToSend = ctx.message.contact.phone_number;
            } else if (ctx.message.text && /^\d+$/.test(ctx.message.text)) {
  
                contactToSend = ctx.message.text;
            } else {
 
                ctx.reply('Por favor, envía un contacto de Telegram o un número de teléfono para continuar.');
                return;
            }

            const messageToSend = session[chatId].messageToSend;
            ctx.reply(`Mensaje enviado al número ${contactToSend}: ${messageToSend}`);
            delete session[chatId];
            saveSession(session);
        }
    }
});

module.exports = DC