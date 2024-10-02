const dc = require("consola");
const chalk = require('chalk');
const comandos = require('./commands');
const { exec } = require('child_process');
const readline = require('readline');
const yargs = require('yargs');
const api = require('./api.js')
const fs = require('fs');

const gamesFilePath = 'games.json';
if (!fs.existsSync(gamesFilePath)) {
    const initialGameData = {
        salas: []
    };

    fs.writeFileSync(gamesFilePath, JSON.stringify(initialGameData, null, 2));
    console.log('Archivo games.json creado con éxito.');
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let userData = {};
let userCount = 0;
let stickerData = {};

const initializeDatabase = () => {
    if (fs.existsSync('data.json')) {
      //  userData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
        userCount = Object.keys(userData).length;
    }

    if (fs.existsSync('stickerData.json')) {
        stickerData = JSON.parse(fs.readFileSync('stickerData.json', 'utf-8'));
    }
};

const createUserTable = (userId) => {
    if (!userData[userId]) {
        userData[userId] = {
            characterCount: 0,
            totalRwcoins: 0,
            lastUsedTime: 0,
            characters: []
        };
        userCount++;
        saveDataToFile();
        console.log(`Tabla creada para el usuario ${userId}`);
    } else {
        console.log(`El usuario ${userId} ya tiene una tabla`);
    }
};

const createUserStickerTable = () => {
    if (!fs.existsSync('stickerData.json')) {
        stickerData = {};
        saveStickerDataToFile();
        console.log('Base de datos de stickers creada correctamente.');
    } else {
        console.log('La base de datos de stickers ya existe.');
    }
};

const saveDataToFile = () => {
    fs.writeFileSync('data.json', JSON.stringify(userData, null, 2));
};

const saveStickerDataToFile = () => {
    fs.writeFileSync('stickerData.json', JSON.stringify(stickerData, null, 2));
};

initializeDatabase();
createUserStickerTable();

const userId = 'usuario123';
createUserTable(userId);

userData.minar = {};
userData.minar2 = {};
userData.antilink = {};
userData.modohorny = {};

const groupId = 'groupId1';
userData.antilink[groupId] = true;
userData.modohorny[groupId] = false;

saveDataToFile();

console.log(`El total de usuarios es: ${userCount}`);

const green = chalk.green;
const blue = chalk.italic.blue;
const yellow = chalk.yellow;

const DC = require('./global')

comandos();
try {
    DC.launch();
    console.clear();
    dc.success('YaemoriBot-TG está conectada con éxito. \n')
} catch (error) {
    dc.error(`El error esta en: \n${error}`)
}
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
const prefixes = ['/', '.', '*', 'i', '!', '#', '$', '%', '+', '£', '¢', '€', '¥', '^', '°', '=', '¶', '∆', '×', '÷', 'π', '√', '✓', '©', '®', ':', ';', '?', '&', '.', '-', '@'];

const prefixRegex = new RegExp(`^(${prefixes.map(prefix => '\\' + prefix).join('|')})`);

global.prefix = prefixRegex;

DC.use(async (ctx, next) => {
    if (ctx.message && (ctx.message.text || ctx.message.caption)) {
        let messageText = ctx.message.text || '';
        const messageCaption = ctx.message.caption || '';

        if (messageText.startsWith(['/','.'])) {
            dc.info(`Comando recibido: ${messageText}`);
            await handleCommand(ctx, messageText); // Manejar el comando
        } else if (ctx.message.photo && messageCaption.startsWith(['/','.'])) {
            dc.info(`Comando recibido en el caption de la foto: ${messageCaption}`);
            await handleCommand(ctx, messageCaption); 
    } else {
        dc.warn('Mensaje inválido recibido. No se pudo procesar.');
    }
    }
    return next();
});