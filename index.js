const { Telegraf } = require('telegraf');
const dc = require("consola");
const chalk = require('chalk');
const comandos = require('./commands');
const { exec } = require('child_process');
const readline = require('readline');
const readline = requiere('readline');
const yargs = require('yargs');
const api = require('./api.js')
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const mostrarTutorial = () => {
    console.log(chalk.yellowBright("\nTutorial para obtener el token de bot de Telegram:"));
    console.log("1. Abre Telegram y busca 'BotFather'.");
    console.log("2. Inicia una conversación con BotFather y sigue las instrucciones para crear un nuevo bot.");
    console.log("3. Una vez creado, copia el token generado y pégalo cuando se solicite.\n");
};

const pedirToken = () => {
    return new Promise((resolve) => {
        rl.question("Por favor, ingresa tu token de bot de Telegram: ", (token) => {
            resolve(token.trim());
        });
    });
};

const validarToken = async (token) => {
    try {
        const bot = new Telegraf(token);
        await bot.telegram.getMe();  // Intenta conectarte a la API de Telegram con el token proporcionado
        console.log(chalk.greenBright("Token válido. Iniciando el bot...\n"));
        return true;
    } catch (error) {
        console.log(chalk.redBright("Token inválido. Intenta nuevamente.\n"));
        return false;
    }
};

const mostrarMenu = async () => {
    let lineM = '┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅';
    console.log(`┏${lineM}
┋ ${chalk.blueBright('┏┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┋ ${chalk.blueBright('┋')} ${chalk.blue.bgBlue.bold.cyan('ESCOGE UN NÚMERO ')}
┋ ${chalk.blueBright('┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┋ ${chalk.blueBright('┏┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┋ ${chalk.green.bgMagenta.bold.yellow('¿QUÉ DESEA HACER?')}
┋ ${chalk.bold.redBright('⇢  Opción 1:')} ${chalk.greenBright('COMO OBTENER EL TOKEN')}
┋ ${chalk.bold.redBright('⇢  Opción 2:')} ${chalk.greenBright('INGRESA EL TOKEN DIRECTAMENTE.')}
┋ ${chalk.blueBright('┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┋ ${chalk.italic.magenta('Escriba sólo el número de')}
┋ ${chalk.italic.magenta('la opción para conectarse.')}
┗${lineM}`);
};

const obtenerToken = async () => {
    while (true) {
        await mostrarMenu();

        const opcion = await new Promise((resolve) => {
            rl.question(chalk.bold.magentaBright('---> '), (input) => {
                resolve(input.trim());
            });
        });

        if (opcion === '1') {
            mostrarTutorial();
            await new Promise(resolve => setTimeout(resolve, 3000));  // Espera 3 segundos después del tutorial
        }

        if (opcion === '2') {
            const token = await pedirToken();
            const esValido = await validarToken(token);

            if (esValido) {
                return token;
            }
        } else if (opcion !== '1' && opcion !== '2') {
            console.log(chalk.redBright("Opción no válida. Por favor, selecciona 1 o 2.\n"));
        }
    }
};

const iniciarBot = async () => {
    const token = await obtenerToken();

    // Mostrar los mensajes una vez que el token es válido
    console.log(chalk.blue('Iniciando✨...'));
    console.log(gradient.pastel.multiline(figlet.textSync('Yaemori TG', { horizontalLayout: 'default' })));
    console.log(chalk.green('👑 Creadores: DevDiego & DavidChian'));

    const bot = new Telegraf(token);

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
/*try {
    DC.launch();
    console.clear();
    dc.success('YaemoriBot-TG está conectada con éxito. \n')
} catch (error) {
    dc.error(`El error esta en: \n${error}`)
}*/
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

    // Lanzar el bot
    bot.launch().then(() => {
        console.log(chalk.greenBright('El bot está en línea y listo para usarse.'));
    }).catch((err) => {
        console.error('Error al lanzar el bot:', err);
    });
};

iniciarBot();