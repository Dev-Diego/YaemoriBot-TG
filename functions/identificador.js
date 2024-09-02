const DC = require("../global");
const logCommand = require("../log/logcommand");
const dc = require('consola');

async function identificador() {
    try {
        DC.command('identificadores', async (ctx) => {
            logCommand(ctx);

            try {
                const imageUrl = 'https://github.com/Yukyshiram/recursos_CDA/blob/main/ghost.png?raw=true';
                const caption = `🪻Idenficadores x pais🪻
'af': afrikáans
'sq': albanés
'am': amárico
'ar': árabe
'hy': armenio
'az': azerí
'eu': euskera
'be': bielorruso
'bn': bengalí
'bs': bosnio
'bg': búlgaro
'ca': catalán
'ceb': cebuano
'ny': chichewa
'zh-CN': chino (simplificado)
'zh-TW': chino (tradicional)
'co': corso
'hr': croata
'cs': checo
'da': danés
'nl': neerlandés
'en': inglés
'eo': esperanto
'et': estonio
'tl': filipino
'fi': finlandés
'fr': francés
'fy': frisón
'gl': gallego
'ka': georgiano
'de': alemán
'el': griego
'gu': gujarati
'ht': criollo haitiano
'ha': hausa
'haw': hawaiano
'iw': hebreo
'hi': hindi
'hmn': hmong
'hu': húngaro
'is': islandés
'ig': igbo
'id': indonesio
'ga': irlandés
'it': italiano
'ja': japonés
'jw': javanés
'kn': canarés
'kk': kazajo
'km': camboyano
'rw': kinyarwanda
'ko': coreano
'ku': kurdo
'ky': kirguís
'lo': laosiano
'la': latín
`
                ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });
            } catch (error) {
                dc.warn("Hay un error");
            }
        });
    } catch (error) {
        dc.error('hay un error en identificador.js');
    }
}

module.exports = identificador;