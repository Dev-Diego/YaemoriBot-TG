const DC = require('../global');
const logCommand = require('../log/logcommand');

const obtenerTiempoDisponible = (userId) => {
    const userData = obtenerDatos();
    if (userData[userId]) {
        const currentTime = Date.now();
        const nextAvailableTime = userData[userId].nextAvailableTime2 || 0;
        return Math.max(nextAvailableTime - currentTime, 0); 
    }
    return 0; 
};

const actualizarInventarioUsuario = (userId, moneyDelta, nextAvailableTime) => {
    let userData = obtenerDatos();
   
    if (!userData[userId]) {
        userData[userId] = {};
    }
   
    userData[userId].money = (userData[userId].money || 0) + moneyDelta;
    
    userData[userId].nextAvailableTime2 = nextAvailableTime;
    
    guardarDatos(userData);
};

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

DC.command('minar2', (ctx) => {
    logCommand(ctx);
    const userId = ctx.from.id;
    const timeAvailable = obtenerTiempoDisponible(userId);

    if (timeAvailable > 0) {
        const remainingMinutes = Math.floor(timeAvailable / 60000);
        const remainingSeconds = Math.ceil((timeAvailable % 60000) / 1000);
        ctx.reply(`No puedes usar el comando hasta que se termine el tiempo. Tiempo restante: ${remainingMinutes} minutos y ${remainingSeconds} segundos.`);
    } else {
        const currentTime = Date.now();
        const moneyGained = Math.floor(Math.random() * 11);
        const nextAvailableTime = currentTime + 900000; 
        actualizarInventarioUsuario(userId, moneyGained, nextAvailableTime);
        ctx.reply(`¡Recompensa Gratis! ¡Felicidades! Ahora tienes ${moneyGained} 🪙 Dolares`);
    }
});

module.exports = DC;