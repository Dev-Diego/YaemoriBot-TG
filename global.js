const { Telegraf } = require('telegraf');
const readline = require('readline');
require('dotenv').config();
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

module.exports = bot