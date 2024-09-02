const { Telegraf } = require('telegraf');
const fs = require('fs');
const DC = require('../global');
const logCommand = require('../log/logcommand');

const obtenerDatos = () => {
    if (fs.existsSync('data.json')) {
        return JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    } else {
        return {};
    }
};

const guardarDatos = (data) => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

const actualizarInventarioUsuario = (userId, xpDelta, moneyDelta) => {
    let userData = obtenerDatos();
   
    if (!userData[userId]) {
        userData[userId] = {
            xp: 0,
            money: 0
        };
    }
   
    userData[userId].xp += xpDelta;
    userData[userId].money += moneyDelta;
    
    guardarDatos(userData);
};

// Comando /ruleta
DC.command('ruleta', (ctx) => {
logCommand(ctx);
    const resultado = Math.random() < 0.5 ? 'victoria' : 'fracaso';
    
    const mensajes = {
        victoria: [
            { mensaje: 'Felicidades has tenido suerte! Ganaste 500 XP', xp: 500 },
            { mensaje: 'Felicidades has tenido suerte! Ganaste 1000 XP', xp: 1000 },
            { mensaje: 'Felicidades eres todo un suertudo! Ganaste 100 dólares', money: 100 }
        ],
        fracaso: [
            { mensaje: 'Has perdido! Que mala suerte... Perdiste -500 XP', xp: -500 },
            { mensaje: 'Tienes muy mala suerte... Has perdido -1000 XP', xp: -1000 },
            { mensaje: 'La suerte no te acompaña... Has perdido -100 dólares!', money: -100 }
        ]
    };
    
    const mensajeAleatorio = mensajes[resultado][Math.floor(Math.random() * mensajes[resultado].length)];
    
    if (mensajeAleatorio.xp) {
        actualizarInventarioUsuario(ctx.from.id, mensajeAleatorio.xp, 0, Date.now());
    }
    if (mensajeAleatorio.money) {
        actualizarInventarioUsuario(ctx.from.id, 0, mensajeAleatorio.money, Date.now());
    }
    
    const imagen = resultado === 'victoria' ? global.victory[Math.floor(Math.random() * global.victory.length)] : global.fail[Math.floor(Math.random() * global.fail.length)];
ctx.replyWithPhoto({ url: imagen }, { caption: mensajeAleatorio.mensaje });
});

module.exports = DC