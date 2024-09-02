const chalk = require('chalk');
const cx = require("consola");
const magenta = chalk.magenta;
const whiteBright = chalk.whiteBright;

function logCommand(ctx) {
    if (!ctx || !ctx.message || !ctx.message.text) {
        console.log('No se ha proporcionado un contexto válido para el manejo del comando.');
        return;
    }

    const commandPrefixes = ['/', '.', '&', '!', '#', '¤']; 

    const commandRegex = new RegExp(`^[${commandPrefixes.map(prefix => '\\' + prefix).join('')}]\\w+`);

    if (commandRegex.test(ctx.message.text)) {
        const command = getCommand(ctx.message.text);
        cx.info(whiteBright(`Comando `) + magenta(command) + whiteBright(` ejecutado \n`));
    } else {
        cx.info(whiteBright(`Mensaje normal `) + magenta(ctx.message.text) + whiteBright(` detectado \n`));
    }
}

function getCommand(text) {
    if (!text) return '';
    
    const commandPrefixes = ['/', '.', '&', '!', '#', '¤'];
    for (const prefix of commandPrefixes) {
        if (text.startsWith(prefix)) {
            return text.substring(1);
        }
    }
    return '';
}

module.exports = logCommand;