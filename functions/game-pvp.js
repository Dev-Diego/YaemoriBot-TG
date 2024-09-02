const fs = require('fs');
const { Telegraf } = require('telegraf');
const DC = require('../global');
const logCommand = require('../log/logcommand');

const MAX_PLAYERS = 2;
const GAME_TIMEOUT = 60000;
const XP_WINNER = 500;
const XP_LOSER = -100;

let gameRooms = {};

try {
    const data = fs.readFileSync('games.json', 'utf8');
    gameRooms = JSON.parse(data);
} catch (err) {
    console.error('Error al leer el archivo de juegos:', err);
}

function saveGameRooms() {
    fs.writeFileSync('games.json', JSON.stringify(gameRooms));
}

function obtenerDatos() {
    try {
        const data = fs.readFileSync('user_data.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer el archivo de datos de usuario:', err);
        return {};
    }
}

function guardarDatos(data) {
    try {
        fs.writeFileSync('user_data.json', JSON.stringify(data));
    } catch (err) {
        console.error('Error al escribir el archivo de datos de usuario:', err);
    }
}

DC.command('pvp', (ctx) => {
    const chatId = ctx.chat.id;
    const userId = ctx.from.id;

    if (ctx.chat.type !== 'group' && ctx.chat.type !== 'supergroup') {
        return ctx.reply('Este juego solo funciona en grupos.');
    }

    if (gameRooms[chatId]) {
        return ctx.reply('Ya hay una sala activa en este grupo.');
    }

    gameRooms[chatId] = {
        creator: userId,
        players: [userId],
        choices: {},
        timer: setTimeout(() => {
            delete gameRooms[chatId];
            saveGameRooms();
            ctx.reply('La sala ha sido eliminada debido a la inactividad.');
        }, GAME_TIMEOUT)
    };

    return ctx.reply(`El compañero @${ctx.from.username} quiere retarlos a un PvP. Quien desee unirse, responda este mensaje con el comando /aceptar.`);
});

DC.command('aceptar', (ctx) => {
    const chatId = ctx.chat.id;
    const userId = ctx.from.id;

    if (!gameRooms[chatId]) {
        return ctx.reply('No hay una sala activa en este grupo.');
    }

    if (gameRooms[chatId].players.length >= MAX_PLAYERS) {
        return ctx.reply('La sala está completa, no se pueden unir más jugadores.');
    }

    if (gameRooms[chatId].players.includes(userId)) {
        return ctx.reply('Ya estás en la sala.');
    }

    gameRooms[chatId].players.push(userId);

    if (gameRooms[chatId].players.length === MAX_PLAYERS) {
        startGame(chatId, ctx);
    }

});

function startGame(chatId, ctx) {
    ctx.reply('Hagan sus apuestas de piedra, papel o tijeras:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Piedra 🗿', callback_data: 'Piedra' }],
                [{ text: 'Papel 📄', callback_data: 'Papel' }],
                [{ text: 'Tijeras ✂️', callback_data: 'Tijera' }]
            ]
        }
    });

    ctx.reply('El juego ha comenzado. Esperando las elecciones de ambos jugadores.');
}

DC.action(['Piedra', 'Papel', 'Tijera'], (ctx) => {
    const playerId = ctx.from.id;
    const chatId = ctx.chat.id;
    const playerChoice = ctx.match[0];

    if (!gameRooms[chatId] || !gameRooms[chatId].players.includes(playerId)) {
        return ctx.answerCbQuery('No estás en una sala de juego activa.');
    }

    gameRooms[chatId].choices[playerId] = playerChoice;

    const players = gameRooms[chatId].players;
    const player1 = players[0];
    const player2 = players[1];

    if (gameRooms[chatId].choices[player1] && gameRooms[chatId].choices[player2]) {
        const player1Choice = gameRooms[chatId].choices[player1];
        const player2Choice = gameRooms[chatId].choices[player2];

        ctx.telegram.getChatMember(chatId, player1).then(player1Member => {
            ctx.telegram.getChatMember(chatId, player2).then(player2Member => {
                const player1Username = player1Member.user.username || player1;
                const player2Username = player2Member.user.username || player2;

                let result;
                if (player1Choice === player2Choice) {
                    result = 'Empate';
                } else if ((player1Choice === 'Piedra' && player2Choice === 'Tijera') ||
                           (player1Choice === 'Papel' && player2Choice === 'Piedra') ||
                           (player1Choice === 'Tijera' && player2Choice === 'Papel')) {
                    result = `¡Gana @${player1Username} con ${player1Choice} contra ${player2Choice}!`;
                    actualizarInventarioUsuario(player1, XP_WINNER);
                    actualizarInventarioUsuario(player2, XP_LOSER);
                } else {
                    result = `¡Gana @${player2Username} con ${player2Choice} contra ${player1Choice}!`;
                    actualizarInventarioUsuario(player1, XP_LOSER);
                    actualizarInventarioUsuario(player2, XP_WINNER);
                }

                ctx.reply(`@${player1Username} eligió ${player1Choice}, @${player2Username} eligió ${player2Choice}.\n ${result}`);

                clearTimeout(gameRooms[chatId].timer);
                delete gameRooms[chatId];
                saveGameRooms();
            });
        });
    } else {
        ctx.answerCbQuery('Esperando la elección del otro jugador...');
    }
});

DC.command('cerrar', (ctx) => {
    const chatId = ctx.chat.id;
    const userId = ctx.from.id;

    if (!gameRooms[chatId] || gameRooms[chatId].creator !== userId) {
        return ctx.reply('No eres el creador de la sala.');
    }

    clearTimeout(gameRooms[chatId].timer);
    delete gameRooms[chatId];
    saveGameRooms();

    return ctx.reply('La sala ha sido cerrada.');
});

const actualizarInventarioUsuario = (userId, xpDelta) => {
    let userData = obtenerDatos();
    if (!userData[userId]) {
        userData[userId] = {
            xp: 0
        };
    }

    userData[userId].xp += xpDelta;

    guardarDatos(userData);
};

module.exports = DC;