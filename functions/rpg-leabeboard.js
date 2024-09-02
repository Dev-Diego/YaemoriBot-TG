const { Telegraf } = require('telegraf');
const DC = require('../global');
const logCommand = require('../log/logcommand');

const obtenerDatos = () => {

    if (fs.existsSync('data.json')) {

        return JSON.parse(fs.readFileSync('data.json', 'utf-8'));

    } else {

        return {};

    }

};


const generarTablaLideres = (usuarios, campo) => {
    const topUsuarios = usuarios.sort((a, b) => b[campo] - a[campo]).slice(0, 5);
    let tabla = '';
    topUsuarios.forEach((usuario, index) => {
        const nombreUsuario = usuario.username || usuario.id;
        tabla += `${index + 1}. ${nombreUsuario}\n`;
    });
    return tabla;
};

DC.command(['leaderboard', 'lb'], async (ctx) => {

    logCommand(ctx);

    const userData = obtenerDatos();

    if (!userData) {

        console.error("No se pudo obtener los datos del usuario.");

        return;

    }

    const usuarios = Object.values(userData);
    const tablaXp = generarTablaLideres(usuarios, 'xp');
    const tablaDinero = generarTablaLideres(usuarios, 'money');
    const userId = ctx.from.id;

    const usuario = usuarios.find(user => user.id === userId);

    const posicionXp = usuarios.findIndex((user, index) => user.id === userId) + 1;

    const posicionDinero = usuarios.findIndex((user, index) => user.id === userId) + 1;

    const mensaje = `*Top 5 XP:*\n${tablaXp}\nTu posición: ${posicionXp}\n\n*Top 5 Dinero:*\n${tablaDinero}\nTu posición: ${posicionDinero}`;

    await ctx.replyWithPhoto('https://telegra.ph/file/21da5ae457c7700e65ad8.jpg', { caption: mensaje, parse_mode: 'Markdown' });

});

module.exports = DC;