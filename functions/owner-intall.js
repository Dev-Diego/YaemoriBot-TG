const { Telegraf } = require('telegraf');
const { exec } = require('child_process');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const yourId = '1880670451';

/*CX.start((ctx) => {
  const userId = ctx.message.from.id.toString();
  if (userId === yourId) {
    ctx.reply('¡Hola! Puedes utilizar el comando /install seguido del nombre del módulo que deseas instalar.');
  } else {
    ctx.reply('Lo siento, no estás autorizado para usar este bot.');
  }
});*/

DC.command('install', (ctx) => {
  const userId = ctx.message.from.id.toString();
  if (userId === yourId) {
    const moduleName = ctx.message.text.split(' ')[1];
    if (!moduleName) {
      ctx.reply('Por favor, especifica el nombre del módulo que deseas instalar.');
      return;
    }

    ctx.reply(`Iniciando la instalación de ${moduleName}...`);

    const installProcess = exec(`npm install ${moduleName}`);

    installProcess.stdout.on('data', (data) => {
      ctx.reply(data.toString());
    });

    installProcess.stderr.on('data', (data) => {
      ctx.reply(data.toString());
    });

    installProcess.on('close', (code) => {
      if (code === 0) {
        ctx.reply(`La instalación de ${moduleName} se completó exitosamente.`);
      } else {
        ctx.reply(`Se produjo un error durante la instalación de ${moduleName}.`);
      }
    });
  } else {
    ctx.reply('Lo siento, no estás autorizado para usar este comando.');
  }
});

module.exports = DC 