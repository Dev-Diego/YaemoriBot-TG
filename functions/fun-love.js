const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');

async function love() {
    DC.command(['love', 'amor'], async (ctx) => {
        logCommand(ctx);

        if (!ctx.chat || ctx.chat.type !== 'group' && ctx.chat.type !== 'supergroup') {
            return ctx.reply('Este comando funciona solo en grupos.');
        }

        if (!ctx.message.reply_to_message || !ctx.message.reply_to_message.from || ctx.message.reply_to_message.from.id === ctx.from.id) {
            return ctx.reply('Por favor, responde a un mensaje de otro usuario o menciona a un usuario para usar este comando.');
        }

        const lovePercentage = Math.floor(Math.random() * 100);
        const isHighLove = lovePercentage >= 50;
        const loveMessages = [
            "¡Eso es un amor ardiente y apasionado! ¡Ve y díselo ahora mismo!",
            "Parece que hay una chispa entre ustedes dos. ¡Inténtalo!",
            "Podría haber algo especial aquí. ¡Dale una oportunidad!",
            "Hmm, el amor está en el aire. ¡Quizás sea hora de un café juntos!",
            "Las estrellas indican que hay un potencial romántico. ¡Haz un movimiento!",
            "Una historia de amor increíble podría estar esperando para ser escrita por ustedes.",
            "No subestimen el poder del tiempo y la paciencia en el amor. Grandes cosas pueden suceder.",
            "Recuerden que el amor es un viaje, y cada paso es valioso, sin importar la distancia.",
            "Las conexiones fuertes pueden convertirse en relaciones hermosas. ¡Sigan explorando!",
            "El amor verdadero a menudo requiere tiempo y esfuerzo. ¡No renuncien!",
        ];
        const notSoHighLoveMessages = [
            "A veces, la amistad es el comienzo de algo hermoso, pero no siempre se convierte en amor.",
            "El amor no es todo, ¡la amistad también es genial! Mantengan su amistad especial.",
            "Recuerda que las mejores relaciones comienzan con una buena amistad. ¡No subestimen su vínculo!",
            "A veces, el amor puede crecer con el tiempo. ¡Sigan fortaleciendo su conexión!",
            "La vida es una sorpresa, ¡quién sabe qué depara el futuro! No pierdan la esperanza.",
            "Aunque el amor no florezca como esperaban, su conexión sigue siendo valiosa.",
            "Los corazones pueden tardar en sincronizarse, pero eso no disminuye lo especial que son juntos.",
            "A pesar de los desafíos del amor, su amistad es un regalo que merece ser celebrado.",
            "El tiempo puede revelar cosas sorprendentes. ¡Sigamos explorando juntos!",
            "La vida está llena de giros inesperados. ¡Permanezcan abiertos a las posibilidades!",
        ];
        const loveDescription = isHighLove ? "tienen una conexión profunda y un amor" : "tienen una conexión especial, aunque en el amor su porcentaje es";
        const getRandomMessage = (messages) => messages[Math.floor(Math.random() * messages.length)];
        const loveMessage = isHighLove ? getRandomMessage(loveMessages) : getRandomMessage(notSoHighLoveMessages);
const senderName = ctx.from.username || ctx.from.first_name;
        const response =
            `━━━━━━━⬣ LOVE ⬣━━━━━━━\n` +
            `❥ En el universo del amor, @${senderName} y @${ctx.message.reply_to_message.from.username || ctx.message.reply_to_message.from.first_name} ${loveDescription} del ${lovePercentage}% de un 100%*\n\n` +
            `❥ ${loveMessage}\n` +
            `━━━━━━━⬣ LOVE ⬣━━━━━━━`;

        async function loading() {
            const hawemod = [
                "     Cargando.\n《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
                "     Cargando..\n《 ████▒▒▒▒▒▒▒▒》30%",
                "     Cargando...\n《 ███████▒▒▒▒▒》50%",
                "     Cargando.\n《 ██████████▒▒》80%",
                "     Cargando..\n《 ████████████》100%"
            ];

            const message = await ctx.reply('❤ ¡Calculando Porcentaje! ❤', { mentions: ctx.message });

            for (let i = 0; i < hawemod.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                await ctx.telegram.editMessageText(ctx.chat.id, message.message_id, null, hawemod[i], { parse_mode: "Markdown" });
            }

            await ctx.telegram.editMessageText(ctx.chat.id, message.message_id, null, response, { parse_mode: "Markdown" });
        }

        loading();
    });
}

module.exports = love;