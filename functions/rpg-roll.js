const fs = require('fs');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');
const { Markup } = require('telegraf');
const ob = require('./rpg-obtenidos')

const completadoImage = './src/completado.jpg';

const actualizarLastUsedTime = (userId, timestamp) => {
    let userData = obtenerDatos();
   
    if (!userData[userId]) {
        userData[userId] = {}; 
    }
    
    userData[userId].lastUsedTime = timestamp;
    guardarDatos(userData);
};

const actualizarInventarioUsuario = (userId, characterCount, totalRwcoins, lastUsedTime, characters) => {
    let userData = obtenerDatos();
   
    if (!userData[userId]) {
        userData[userId] = {};
    }
   
    userData[userId] = {
        characterCount,
        totalRwcoins,
        lastUsedTime,
        characters
    };
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

async function rw() {
    try {
        DC.command('rw', async (ctx) => {
            logCommand(ctx);
            try {
                let userId = ctx.from.id;
                let now = new Date().getTime();
                let cooldown = 10 * 60 * 1000; 
                
                let userData = obtenerDatos();
                if (userData[userId] && now - userData[userId].lastUsedTime < cooldown) {
                    const remainingTime = cooldown - (now - userData[userId].lastUsedTime);
                    const remainingMinutes = Math.floor(remainingTime / (60 * 1000));
                    const remainingSeconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
                    ctx.reply(`¡Espera un poco mas para poder usar este comando!\n\n 𝗧𝗶𝗲𝗺𝗽𝗼 𝗿𝗲𝘀𝘁𝗮𝗻𝘁𝗲: ${remainingMinutes} 𝗠𝗶𝗻𝘂𝘁𝗼𝘀 𝘆 ${remainingSeconds} 𝗦𝗲𝗴𝘂𝗻𝗱𝗼𝘀.`);
                    return;
                }
            
                const timestamp = Date.now();
                actualizarLastUsedTime(userId, timestamp);
                let images = [
                     { name: 'Toki', url: 'https://telegra.ph/file/bd271fbbdae84fa26f04f.jpg', value: Math.floor(Math.random() * 5001) },
                        { name: 'Noise', url: 'https://telegra.ph/file/ba34a437231411448f6e9.jpg', value: Math.floor(Math.random() * 5001) },
                    { name: 'Akira', url: 'https://telegra.ph/file/475522696fc7d8d1d857a.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Kotori', url: 'https://telegra.ph/file/176ab21ebdca4b4eb962e.jpg', value: Math.floor(Math.random() * 10001) },
            { name: 'Naida', url: 'https://telegra.ph/file/e36464fbb0b40f429cc43.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Norie', url: 'https://telegra.ph/file/0ae8ad7f097d531cc5acf.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Neptune', url: 'https://telegra.ph/file/84c78cc26889b8da9a8f0.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Yuki', url: 'https://telegra.ph/file/9e2984f5335d1a6b49fc1.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Naya', url: 'https://telegra.ph/file/2baa3b4a81073268a7986.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Yumaki', url: 'https://telegra.ph/file/77e1df4377ea14fb6d66b.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Liza', url: 'https://telegra.ph/file/45ae6406f3bb93fcec9b4.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Nakyra', url: 'https://telegra.ph/file/f2e26a6cb0cb2bc152fb3.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Sekya', url: 'https://telegra.ph/file/cb0330f2d5a0595fdb781.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Blank', url: 'https://telegra.ph/file/4c27664700307c76fef03.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Hidory', url: 'https://telegra.ph/file/1458fc4990244acbb6afb.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Dayami', url: 'https://telegra.ph/file/250e8465bf5ff2f59b04d.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Firegirl', url: 'https://telegra.ph/file/a42c72ca655b2feb512d8.jpg', value: Math.floor(Math.random() * 5001) },
{ name: 'Susan', url: 'https://telegra.ph/file/b7402d3731c7c6a1cca70.jpg', value: Math.floor(Math.random() * 5001) },
{ name: 'Lucard', url: 'https://telegra.ph/file/1d43d41e6443483be0ab8.jpg', value: Math.floor(Math.random() * 5001) },
{ name: 'Rain', url: 'https://telegra.ph/file/78e830222cdcfb2fe1eb2.jpg', value: Math.floor(Math.random() * 5001) },
{ name: 'Anna', url: 'https://telegra.ph/file/46481625fa92418bbc1e3.jpg', value: Math.floor(Math.random() * 5001) },
{ name: 'David Crazy!!', url: 'https://telegra.ph/file/5e22f2f6098d0db3b052d.jpg', value: Math.floor(Math.random() * 7001) },
{ name: 'Jessica', url: 'https://telegra.ph/file/e65c28be97cdd8ce9fae4.jpg', value: Math.floor(Math.random() * 5001) },
{ name: 'Lia', url: 'https://telegra.ph/file/5d985f9bf833c1948b8cc.jpg', value: Math.floor(Math.random() * 5001) },
{ name: 'Isabel', url: 'https://telegra.ph/file/dc0e0340faf399f6979ce.jpg', value: Math.floor(Math.random() * 5001) },
{ name: 'Nicol', url: 'https://telegra.ph/file/5062b67b19d2e98da6916.jpg', value: Math.floor(Math.random() * 5001) },
{ name: 'Warner', url: 'https://telegra.ph/file/45e89c70b94337e800eca.jpg', value: Math.floor(Math.random() * 5001) },
{ name: 'Maggie', url: 'https://telegra.ph/file/61b0979dee6ef89341d0f.jpg', value: Math.floor(Math.random() * 5001) },
{ name: 'Lucinda', url: 'https://telegra.ph/file/f2d28df62c73a606c0076.jpg', value: Math.floor(Math.random() * 5001) },
{ name: 'Nekowhite', url: 'https://telegra.ph/file/972dc4e098360a30841a4.jpg', value: Math.floor(Math.random() * 5001) },
{ name: 'Nekoblue', url: 'https://telegra.ph/file/8133be81e1d3085e23a48.jpg', value: Math.floor(Math.random() * 5001) },
{ name: 'The Dark', url: 'https://telegra.ph/file/4b9981a8db8206a80bcd5.jpg', value: Math.floor(Math.random() * 5001) },
{ name: 'Dimondred', url: 'https://telegra.ph/file/8e2eddabf070c2381282a.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Dayana', url: 'https://telegra.ph/file/10e9ffa40072cf018ea67.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Yezzy', url: 'https://telegra.ph/file/d1b800dbf939c33df0140.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Yamil', url: 'https://telegra.ph/file/dd4c1cfdbfcbee4285e39.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Honoca', url: 'https://telegra.ph/file/a2ca239b97fcbd3f0c762.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Laura', url: 'https://telegra.ph/file/da43e96b3599ec5a06ef1.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Katy', url: 'https://telegra.ph/file/6b1ee3290f502256958af.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Katerin', url: 'https://telegra.ph/file/6b1ee3290f502256958af.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Susy', url: 'https://telegra.ph/file/cef1034a18b6bf0115041.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Mary', url: 'https://telegra.ph/file/ce8290d3a4e0b1cbe3af5.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Litsania', url: 'https://telegra.ph/file/0ac3cc3380d48520e965a.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'R66', url: 'https://telegra.ph/file/42a78930addb7d7585c82.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Undefinided?', url: 'https://telegra.ph/file/1b7fface09d44e5f99267.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Nose literalmente XD', url: 'https://telegra.ph/file/a0ceb84118401a92ac182.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'David Chian', url: 'https://telegra.ph/file/5b55f8dc9146c1072244c.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'The Devil', url: 'https://telegra.ph/file/5cf59708610c9226c631b.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'DarkHeart', url: 'https://telegra.ph/file/67937cd483e212c37bc41.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Linda', url: 'https://telegra.ph/file/30b789e0cb960c427bfca.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'MiKu', url: 'https://telegra.ph/file/760d97f1226a802cedbfc.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Subbot', url: 'https://telegra.ph/file/5ddfa1f92a93e0c56cb00.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Ni Idea', url: 'https://telegra.ph/file/057f2e737051698b966ac.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Sasha', url: 'https://telegra.ph/file/d873e2d44f96bbf2ab391.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Erica', url: 'https://telegra.ph/file/469af5d2a335cc6bccf17.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Fuck You!', url: 'https://telegra.ph/file/f4179e89faf15eaa25ef8.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Senco', url: 'https://telegra.ph/file/ad9829f4830af5e2a1683.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Benco', url: 'https://telegra.ph/file/6877c272ca55de5281113.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Jess', url: 'https://telegra.ph/file/410aca29bf2939ad14405.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Selena', url: 'https://telegra.ph/file/225e43b222d64c793c49d.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Karina', url: 'https://telegra.ph/file/a330af76c5581cc95d89c.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'W68', url: 'https://telegra.ph/file/702f2a9f97f7006980218.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Gamergirl', url: 'https://telegra.ph/file/eabb7b4418334980d119f.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Neko Chan', url: 'https://telegra.ph/file/99733b966270e77f2e418.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Wolf', url: 'https://telegra.ph/file/9c02580552f283223b4b2.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'ReZero', url: 'https://telegra.ph/file/c0b35d6cad50e52306d1e.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Yeny', url: 'https://telegra.ph/file/d05e360f06c11a9f347c1.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Zira', url: 'https://telegra.ph/file/2cdefed8a1802c9972e3d.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Kary', url: 'https://telegra.ph/file/294b04fe9a8fcd8dac3d5.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Yohana', url: 'https://telegra.ph/file/e0ffbde2608667b59cfb2.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Clay', url: 'https://telegra.ph/file/3572c8a3b7b2bc9e20a84.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Vero', url: 'https://telegra.ph/file/8a6f0a68cfdc210a3d4f6.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Shian', url: 'https://telegra.ph/file/f0b6ea5f9ea2c7dea3353.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Horu Chan', url: 'https://telegra.ph/file/16cc33e5247ac774945da.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Vert', url: 'https://telegra.ph/file/1dcdcb799cbb5078cbfec.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Zaily', url: 'https://telegra.ph/file/5ca7b1ee69bc299277fdc.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Leily', url: 'https://telegra.ph/file/ea31766e53fc59b43fc33.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Yuma', url: 'https://telegra.ph/file/9433cd0656bf6426b74a1.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Jaky', url: 'https://telegra.ph/file/47347de97619a2533d200.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Freda', url: 'https://telegra.ph/file/207800d7983fce8c118a2.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Eda', url: 'https://telegra.ph/file/f16ed5d074a52094bcabe.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Eva', url: 'https://telegra.ph/file/9072c0520fef597e3cde7.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Heslya', url: 'https://telegra.ph/file/f50a757739a737203b665.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Gary', url: 'https://telegra.ph/file/438e35fa0fa753e062bbe.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Yamil', url: 'https://telegra.ph/file/65d3f6582e68ed47d4d69.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'The Girl', url: 'https://telegra.ph/file/6a41bed6ca1d01c300ca7.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Dreams', url: 'https://telegra.ph/file/f0cca00e526434fdf4e81.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Favi', url: 'https://telegra.ph/file/7247a572bbfa3b387f97a.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Javi', url: 'https://telegra.ph/file/42c6db0f2b5ab8a64f615.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Hornet', url: 'https://telegra.ph/file/577d7dc3580c96bc6e060.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Nep', url: 'https://telegra.ph/file/414ba7fb6b0c5f26ff8f8.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Uni', url: 'https://telegra.ph/file/49d54471eb67fb47ff137.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Rom', url: 'https://telegra.ph/file/f1062b6dd61a27c611280.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Ram', url: 'https://telegra.ph/file/622cec51cc6013152203b.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Rim', url: 'https://telegra.ph/file/24516b1efe1b84d95390f.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Rem', url: 'https://telegra.ph/file/b92ac17541c7d9c275e57.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Kanaco', url: 'https://telegra.ph/file/73e66869e868db1fcaa46.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Kimico', url: 'https://telegra.ph/file/47efac7df88fbf93cb4df.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Jhon Wick', url: 'https://telegra.ph/file/2691573a33c1a46d99e9f.jpg', value: Math.floor(Math.random() * 5001) },
            { name: '¿Laica!?', url: 'https://telegra.ph/file/3fa8a0302f445403e78a1.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Tu Abuela', url: 'https://telegra.ph/file/7aac08d7a213353870d0a.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Kurumi', url: 'https://telegra.ph/file/990e232b12caf2e43960a.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Neko Lee', url: 'https://telegra.ph/file/712d31a6a514aa89bbc6b.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Liana', url: 'https://telegra.ph/file/ffc11d1c77b6f60d61018.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Renko', url: 'https://telegra.ph/file/c6e93a9d88c54d29a13c1.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Gaia', url: 'https://telegra.ph/file/09a0724d5302502e39916.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Karine', url: 'https://telegra.ph/file/09c3a59e64ad33253390f.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'ZiverDeath', url: 'https://telegra.ph/file/52f0bcb2927ab69079ce6.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Hiro', url: 'https://telegra.ph/file/dda4b98ec65c585ac824c.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Luna', url: 'https://telegra.ph/file/0308a04a44110a16ff676.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Naya', url: 'https://telegra.ph/file/756263131e0bd95d85833.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Assessing Green', url: 'https://telegra.ph/file/eef748db6f5ba390fe579.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Assessing Purple', url: 'https://telegra.ph/file/0da3147844c82c46dd55d.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Elina', url: 'https://telegra.ph/file/cf6c410439b9f0fbdf5d3.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Greendy', url: 'https://telegra.ph/file/86cbfb29ceca3517f1525.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'FireMan', url: 'https://telegra.ph/file/6de83aa9f9a33a1df99e5.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'D Forzy', url: 'https://telegra.ph/file/61a1a833c838727ee67ba.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Annabelle', url: 'https://telegra.ph/file/5cd3871b73e26b9fdebc7.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Assessing', url: 'https://telegra.ph/file/6a006c59cb6bb24268b40.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Lucía', url: 'https://telegra.ph/file/eaec6514aab047329e504.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Karla', url: 'https://telegra.ph/file/8e20680301c3c5a6db679.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Neko Sequi', url: 'https://telegra.ph/file/547e258bf678524acc676.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'B Neko', url: 'https://telegra.ph/file/2d44d433b045b927dcea8.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Annia', url: 'https://telegra.ph/file/a7e72460a9795ba86c8f5.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Vami G', url: 'https://telegra.ph/file/69d3986219eda9e54f2f4.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Luida', url: 'https://telegra.ph/file/c8a131df986acd90fe5ba.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'White Girl', url: 'https://telegra.ph/file/ffe4dda6f89ab9897584a.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Uni Chan', url: 'https://telegra.ph/file/255b0118da8c88bb9dc88.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Adina', url: 'https://telegra.ph/file/14dcbd983f1b1107a4b01.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'The Griffith', url: 'https://telegra.ph/file/d7499839f8aa63dcdf6cf.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Mónica', url: 'https://telegra.ph/file/8035c25835eb5823bcd74.jpg', value: Math.floor(Math.random() * 5001) },
            { name: 'Nellie', url: 'https://telegra.ph/file/6f5bab134ce0af4f2bc7f.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Kai', url: 'https://telegra.ph/file/5d9388a70b73604aa8bdc.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Juni', url: 'https://telegra.ph/file/8fb60d83419b7123a9f8e.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Rei', url: 'https://telegra.ph/file/f659cbcf6a7312841123f.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Xysa', url: 'https://telegra.ph/file/f994f1708349e36006dd4.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'D Kei', url: 'https://telegra.ph/file/b7d95b5cc47cc48bc355f.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Gloria', url: 'https://telegra.ph/file/e0aa1912b476a748d3ad6.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Ine', url: 'https://telegra.ph/file/b81eb121347f435fba1f1.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Moto', url: 'https://telegra.ph/file/053aa3ed36d540259edad.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Yaqui', url: 'https://telegra.ph/file/5ee618b506e20728419ba.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Nola', url: 'https://telegra.ph/file/f5ac7635a5f0e585bd474.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Nela', url: 'https://telegra.ph/file/7cbba3b7f1cd4fa5430c8.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Nini', url: 'https://telegra.ph/file/269aaeed980625c53bcfb.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Joandra', url: 'https://telegra.ph/file/891b59949c8f28e0fa7dc.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Kumi', url: 'https://telegra.ph/file/44d15472175ff71a159e0.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Nani', url: 'https://telegra.ph/file/a18ee90a4450a7c142f45.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Yusi', url: 'https://telegra.ph/file/f0ae99d6af6dc9f78fc0d.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Yusibel', url: 'https://telegra.ph/file/b6f9a90e785ba66d08ed2.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Anlli', url: 'https://telegra.ph/file/4f1c0fdeac1f8bda18b74.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Reina', url: 'https://telegra.ph/file/09df0916eaa34ccf8524f.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Lietis', url: 'https://telegra.ph/file/9306583e99ca1be9895b9.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Hide', url: 'https://telegra.ph/file/f83538201e5f5915c6ce7.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Titi', url: 'https://telegra.ph/file/4c577cdefba48217cc205.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Sindia', url: 'https://telegra.ph/file/1834a0561940eaebc8766.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'UwU', url: 'https://telegra.ph/file/89fe8f7f26de7a7f4331b.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Ely', url: 'https://telegra.ph/file/61869df1457d504ddbcab.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Leidis', url: 'https://telegra.ph/file/f19383d1edea1bfa93576.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Irithel', url: 'https://telegra.ph/file/53a56bb034774292c9bdc.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Karriie', url: 'https://telegra.ph/file/2d6c0c935e11241f27f50.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Claude', url: 'https://telegra.ph/file/0b10158a29063b60f2930.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Wanwan', url: 'https://telegra.ph/file/b73811cb7488381947e45.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Xepxep', url: 'https://telegra.ph/file/0d89e87915739584ecd2b.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Julian', url: 'https://telegra.ph/file/c58981bbcb0df079eb18c.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Paquito', url: 'https://telegra.ph/file/3993c3d53dcf86c946d4a.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Leomord', url: 'https://telegra.ph/file/8602bb2f6d616770b9023.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Granger', url: 'https://telegra.ph/file/3a5ca9324f13017fa5938.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Glod', url: 'https://telegra.ph/file/aa0d7f2a6b3d38f98b400.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Oldouss', url: 'https://telegra.ph/file/d0d51440c4631a01f1a65.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Harley', url: 'https://telegra.ph/file/f1cbe2d1906fc59bed55b.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Uranus', url: 'https://telegra.ph/file/7293d620d776818b1e0f6.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Hecilion', url: 'https://telegra.ph/file/a78e67d903e8a31eb07a1.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Eurora', url: 'https://telegra.ph/file/554d053e8f31329fe8fde.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Selena L', url: 'https://telegra.ph/file/0e4feb2eeb16faa89c6d8.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Yisun', url: 'https://telegra.ph/file/2dba513c3996aba4855a5.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Ixya', url: 'https://telegra.ph/file/08cdfdfa63cc20389d99b.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Johnson', url: 'https://telegra.ph/file/dac129d68d4d52ee1505c.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Fredrinn', url: 'https://telegra.ph/file/561beefcf0acf42857611.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Alucard', url: 'https://telegra.ph/file/f69e1f41fd1675fd7a9ad.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Belerick', url: 'https://telegra.ph/file/6d849b19d0feb7c81848e.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Xavier', url: 'https://telegra.ph/file/94ab36162a1936d910a05.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Layla G', url: 'https://telegra.ph/file/6e906851314204af455de.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Raulus', url: 'https://telegra.ph/file/0be6f30eb0da6c788daa3.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Melissa', url: 'https://telegra.ph/file/5c350acb44ad5c64634db.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Pharsa', url: 'https://telegra.ph/file/fa780d2aa061541e922b6.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Edith', url: 'https://telegra.ph/file/c66397ce8383b7693081b.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Rogek', url: 'https://telegra.ph/file/c6fdad45e641ac6e2aab0.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Jaw Head', url: 'https://telegra.ph/file/7897e9228b5b9706e85a5.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Aurora G', url: 'https://telegra.ph/file/cd12a6ade38733f504b03.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Vexana', url: 'https://telegra.ph/file/17a3732f4516c032331a3.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Franco', url: 'https://telegra.ph/file/4af32fc2b5465d4b69e35.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Alpha', url: 'https://telegra.ph/file/236781f48ca8b1adfc5ad.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Martis', url: 'https://telegra.ph/file/60ee8d7ab1d0e01cdc6d3.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Rodette', url: 'https://telegra.ph/file/a5e7dd47c59c13e2d1f63.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Valir', url: 'https://telegra.ph/file/f649a47097160acd1a09d.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Novaria', url: 'https://telegra.ph/file/ad08a0d99d1c2c28ef0ec.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Luoxya', url: 'https://telegra.ph/file/c817efad08dcc87bde276.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Teriizla', url: 'https://telegra.ph/file/d316c5b88651976ad305b.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Harith', url: 'https://telegra.ph/file/0a3a70be7e12cae0eb910.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Lunox', url: 'https://telegra.ph/file/b69b7e73240e43205d535.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Hylds', url: 'https://telegra.ph/file/4d7f597b484ada88f92c5.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Zilong', url: 'https://telegra.ph/file/5318e6fd14cf9e1401461.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'X Borg', url: 'https://telegra.ph/file/e0d84e6d32170185bafb6.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Bane', url: 'https://telegra.ph/file/a696609f2600ca1846c48.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Gatotkaca', url: 'https://telegra.ph/file/52e7cf8ec2028fe80238f.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Miyans', url: 'https://telegra.ph/file/25a3a7f2ac461f5017749.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Ruby', url: 'https://telegra.ph/file/7e43da668462ffa1d41a4.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Kagura', url: 'https://telegra.ph/file/0852a3ba36cea8e118b02.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Badang', url: 'https://telegra.ph/file/e4fce6bd863bfe6d9d576.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'YVE', url: 'https://telegra.ph/file/197990ef893b2b5e146b9.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Valentina', url: 'https://telegra.ph/file/6b45550634d9914f36eea.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Thamuz', url: 'https://telegra.ph/file/817ad83c90d1987231d92.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Lylia G', url: 'https://telegra.ph/file/7397179619eb925ae2186.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Kadita', url: 'https://telegra.ph/file/0632d58d5abd2cd55a9d6.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Masha', url: 'https://telegra.ph/file/b7b4edc323a00e01c59b7.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Hlda', url: 'https://telegra.ph/file/e7370d27dfa1839e0c6f1.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Chou', url: 'https://telegra.ph/file/ebe5a659e67aabf2d73f8.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Argus', url: 'https://telegra.ph/file/b6599727663d1bd34c5ea.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Grock', url: 'https://telegra.ph/file/c46349d292ee4df82eb97.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Nana', url: 'https://telegra.ph/file/414ff9ed48d50c86c14a1.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Lolita', url: 'https://telegra.ph/file/b3ed93bbafbfbae389170.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Cici', url: 'https://telegra.ph/file/e71825d15da017c9d2207.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Phoveus', url: 'https://telegra.ph/file/b91a81251a545f18ec458.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Baxia', url: 'https://telegra.ph/file/572fadba106d09ca3d554.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Zask', url: 'https://telegra.ph/file/335cd729d92d5edc01f0f.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Kimmy', url: 'https://telegra.ph/file/145b15e589f96090f130a.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Brody', url: 'https://telegra.ph/file/371d5a8753ef4efaf5543.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Moskov', url: 'https://telegra.ph/file/612ced7cd9c576dd80cd2.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Benedetta', url: 'https://telegra.ph/file/231a5bd4509a6544aafd8.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'G Yin', url: 'https://telegra.ph/file/5e834b48eaca9102377b4.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Arlott', url: 'https://telegra.ph/file/baa038cdf711d2722ab29.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Dyrroth', url: 'https://telegra.ph/file/0fa57c81032ba7d11195f.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Esmeralda G', url: 'https://telegra.ph/file/a0e3c0f815d9e8bf0c6e6.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Sun', url: 'https://telegra.ph/file/d51bff1c8fe06e8cfcd05.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Mathilda', url: 'https://telegra.ph/file/14b55046513131012f78f.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Carmilla', url: 'https://telegra.ph/file/e5fb5471f1becae929c84.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Bruno', url: 'https://telegra.ph/file/5e166b292e160a0eea30a.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Yuzhon', url: 'https://telegra.ph/file/246a4a95a81c68a1f804a.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Freya', url: 'https://telegra.ph/file/3c5700dd490199c7e9d01.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Diggie', url: 'https://telegra.ph/file/2758096d0907cf01a0ce9.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Afaela', url: 'https://telegra.ph/file/3f5d1f32be7862ddaa022.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Kaja', url: 'https://telegra.ph/file/81172ac3e3868e011ac8b.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Silvanma', url: 'https://telegra.ph/file/213a824558f08b6f5ad7e.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Orestes', url: 'https://telegra.ph/file/d4795ffe8951370575b28.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Akai', url: 'https://telegra.ph/file/8a945ec43b9ce32cead5c.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Tigreal', url: 'https://telegra.ph/file/5e3f51b62c61ad5703923.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Lesley', url: 'https://telegra.ph/file/f9c9b5dad744476dc40d4.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Bal Sid', url: 'https://telegra.ph/file/1587ad5ddf29c6d3183d9.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Atlas', url: 'https://telegra.ph/file/af373861137992f41585a.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Minsitthar', url: 'https://telegra.ph/file/e97cee688bc929e11b987.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Khufra', url: 'https://telegra.ph/file/1a88896d475c7efbde858.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Floryn', url: 'https://telegra.ph/file/24eb9a0c71e2024b4b676.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Alice D', url: 'https://telegra.ph/file/c81d888e0680661776c86.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Clint', url: 'https://telegra.ph/file/2cd7db687a8719926bfe7.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Beatrix', url: 'https://telegra.ph/file/3249d3d0ef885040cf8b8.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Minotaur', url: 'https://telegra.ph/file/7b4f57c0e67138facedaf.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Faramiis', url: 'https://telegra.ph/file/0d542eb09a121d9383a1d.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Khaleed', url: 'https://telegra.ph/file/51b91818dece7c1fe7519.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Cy Clops', url: 'https://telegra.ph/file/8f61303ef33b58395a214.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Popol Kupa', url: 'https://telegra.ph/file/555cdf34915d0ad5c1462.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'VALE', url: 'https://telegra.ph/file/c75a5fb0bc49f64131560.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Guiniever', url: 'https://telegra.ph/file/eb1642139408317c6a538.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Lapu', url: 'https://telegra.ph/file/f050a935fa90154680971.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Natan', url: 'https://telegra.ph/file/f973a47e07c8783f66f33.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Hanada', url: 'https://telegra.ph/file/04d8e32973a9675baa2cf.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Beatirx', url: 'https://telegra.ph/file/01938841fb92096bfbc13.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Ranger', url: 'https://telegra.ph/file/a997ae8255704210a4d68.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Wan Wan', url: 'https://telegra.ph/file/c88836ceed7dd32f56db5.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Mellisa', url: 'https://telegra.ph/file/2d3b44eaf2ccbc2bed5e0.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Bruno C', url: 'https://telegra.ph/file/1802def31336f9ba6311b.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Hanaabi', url: 'https://telegra.ph/file/2bb63c139b1630d34a635.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Clint C', url: 'https://telegra.ph/file/d5fea379c88369c130bc7.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Cici Y', url: 'https://telegra.ph/file/af5c070209310ba4653af.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Jhonson Dav', url: 'https://telegra.ph/file/61110e1efe458a6f80416.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Hylos', url: 'https://telegra.ph/file/fd21e035de90662c609ed.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Kimmy', url: 'https://telegra.ph/file/80706b710cb3ceb2e197b.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Luno X', url: 'https://telegra.ph/file/8b79a8e6b7c62a4d6df9a.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Cecilion', url: 'https://telegra.ph/file/5de9f9435080c383423f7.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Terizla', url: 'https://telegra.ph/file/ba72480e6fa3e7bcb8218.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Selena A', url: 'https://telegra.ph/file/8d17a49dd32ca33f21eeb.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Minsitthar', url: 'https://telegra.ph/file/65d0b9abfddb36015ed04.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Valen T', url: 'https://telegra.ph/file/0eb7e813141ebf28d0cc4.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Odette', url: 'https://telegra.ph/file/cfaf91cfda3c363c0b61a.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Eudona', url: 'https://telegra.ph/file/0a5dc47709212e622c75c.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Harley', url: 'https://telegra.ph/file/1510a40445bbb75ad7717.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'X Borg', url: 'https://telegra.ph/file/1d5d4b87e724dbab7f2fc.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Lilya', url: 'https://telegra.ph/file/b493c67b9a6e7a458f6c4.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Valir', url: 'https://telegra.ph/file/b7416934037b50de2609c.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Xavier', url: 'https://telegra.ph/file/ca113c0aefc490f999304.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Pharsa', url: 'https://telegra.ph/file/0f087c8e2100914a29f65.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Thamuz', url: 'https://telegra.ph/file/2acdb78448c8f0e0a4023.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Cyclops', url: 'https://telegra.ph/file/5c204583a3845b66ca14e.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Bal Mond', url: 'https://telegra.ph/file/344236dcf0c1efb89084c.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Leomord', url: 'https://telegra.ph/file/d717076e0fb493b02a1f2.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Change', url: 'https://telegra.ph/file/ae994612d38df344b1496.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'YVE', url: 'https://telegra.ph/file/8fcefec9f75a5d3d86ca4.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Luo Yi', url: 'https://telegra.ph/file/9d3ea419e484f346d85e3.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Aulus', url: 'https://telegra.ph/file/db135906edab02a4bf893.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Edith', url: 'https://telegra.ph/file/6c7f5612eb2b92aa15f48.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Kagura', url: 'https://telegra.ph/file/7306f3b4e0f5b612cc6d0.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Belerick', url: 'https://telegra.ph/file/8678ab3897146f21025cd.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Rafaela', url: 'https://telegra.ph/file/17e6a50fb406934b85f14.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Floryn', url: 'https://telegra.ph/file/bf438a888fdba78f46714.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Diggie', url: 'https://telegra.ph/file/6957a1a5e7f747517fb33.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Atlas Raf', url: 'https://telegra.ph/file/0174cb51300b25823ffb3.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Yin', url: 'https://telegra.ph/file/677a603346d0a85173468.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Helcurt', url: 'https://telegra.ph/file/b8f116a546abb0f93e36d.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Akai', url: 'https://telegra.ph/file/d103c2fc88435477e619b.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Estes', url: 'https://telegra.ph/file/74f3d3abddeb46e955e73.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Mantis', url: 'https://telegra.ph/file/13a56660c8440874ad39b.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Faramis', url: 'https://telegra.ph/file/0e27e019c0a415cde1e4b.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Saber', url: 'https://telegra.ph/file/45db8f726ac0f1af03a8c.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Chou', url: 'https://telegra.ph/file/171868593f2d633ba4a8f.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Chord', url: 'https://telegra.ph/file/8ae94aa7ea8f7f96a9403.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Kadiita', url: 'https://telegra.ph/file/90e1eb5e0506b7f097dee.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Balmond', url: 'https://telegra.ph/file/89a85adc47d95196ed6cb.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Esmerald', url: 'https://telegra.ph/file/0b2e751cfee0e45844ee8.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Franco T', url: 'https://telegra.ph/file/ebd44638c1fdd65331b15.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Ling', url: 'https://telegra.ph/file/220bef683fe55b32bb1c8.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Gagi', url: 'https://telegra.ph/file/debacc86b70f3eee6c708.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Lancelot', url: 'https://telegra.ph/file/7da0e414f06062f435ff8.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Dyrroth', url: 'https://telegra.ph/file/ade1d2976c2d428a46e59.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Phoveus', url: 'https://telegra.ph/file/942e2c99a943df2e46791.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Gusion', url: 'https://telegra.ph/file/b46fdd9d33c9ddc633bda.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Argus', url: 'https://telegra.ph/file/a2965bf2898c9c6f0d1e4.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Natalia', url: 'https://telegra.ph/file/5ae939ef277f1f18907d8.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Sun', url: 'https://telegra.ph/file/eb141bbe43c24deca61f9.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Famny', url: 'https://telegra.ph/file/e12c0194850843623938b.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Minotaur Flack', url: 'https://telegra.ph/file/395c9b025e150a0fec31c.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Aamon', url: 'https://telegra.ph/file/446f6ee98ea03442f4b43.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Hayabuso', url: 'https://telegra.ph/file/08b7aef6138b54c919432.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Freya', url: 'https://telegra.ph/file/701a673b9c9155c694439.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Kharlez', url: 'https://telegra.ph/file/71229bfeaa84c34afc75c.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Kariina', url: 'https://telegra.ph/file/0f0a802541cf99ebf5ade.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Yu Zhong', url: 'https://telegra.ph/file/ec7f6ceef7a8f4ba1944b.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Ba Dang', url: 'https://telegra.ph/file/f8106f3a3a2c4249c33b5.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Silvanma', url: 'https://telegra.ph/file/138c056362414b4f3fa1a.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Alucard', url: 'https://telegra.ph/file/243ebd3e7f786eb9dca95.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Nolan', url: 'https://telegra.ph/file/c944444f87eb3d46024ee.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Aldous', url: 'https://telegra.ph/file/74c655264fa8d04054caf.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Joy', url: 'https://telegra.ph/file/80b2918ce323b2719d58b.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Lapu', url: 'https://telegra.ph/file/4dae57c14d03f4615dec9.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Hilda', url: 'https://telegra.ph/file/e69f68330d1c67039a9fc.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Roger', url: 'https://telegra.ph/file/6986c44c5945557fea7ce.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'AE Pha', url: 'https://telegra.ph/file/9ed83dbaf1b66693acab4.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Guinevere', url: 'https://telegra.ph/file/b0a87c4a141394f6c87f6.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Angela', url: 'https://telegra.ph/file/bfd025447d7419dc5e055.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Hanzo', url: 'https://telegra.ph/file/f78da22aea009c9f16683.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Uranus', url: 'https://telegra.ph/file/53d245087778bf96096fd.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Vale', url: 'https://telegra.ph/file/0fbc6f967fe8a12d4925c.jpg', value: Math.floor(Math.random() * 5001) },
        { name: 'Paquito', url: 'https://telegra.ph/file/1997f38bd41fae7f31e1b.jpg', value: Math.floor(Math.random() * 5001) },
                            ];
            
                let characterCount = 0;
                let totalRwcoins = 0;
                let characters = [];
            
                if (userData[userId]) {
                    characterCount = userData[userId].characterCount;
                    totalRwcoins = userData[userId].totalRwcoins;
                    characters = userData[userId].characters;
                }
                characterCount++;
            
                if (characterCount >= images.length) {
                    ctx.replyWithPhoto({ source: completadoImage }, { caption: 'Felicidades, has obtenido todos los personajes disponibles en Kotori-bot. Eres todo un cazador de waifus. ¡Pronto habrá más waifus para recolectar!' });
                } else {
                    let availableImages = images.filter(image => !characters.includes(image.name));
                    const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
                    const str = `
┏━━━━━━━━━⪩
┃˚₊ · ͟͟͞͞➳❥ 𝐅𝐄𝐋𝐈𝐂𝐈𝐃𝐀𝐃𝐄𝐒
┃⏤͟͟͞͞𝐏𝐄𝐑𝐒𝐎𝐍𝐀𝐉𝐄 𝐎𝐁𝐓𝐔𝐕𝐈𝐃𝐎
┗━━━━━━━━━⪩

✰ Nombre:
> » ${randomImage.name}
✰ Valor:
> » ${randomImage.value}!`;
                    ctx.replyWithPhoto({ url: randomImage.url }, { 
    caption: str, 
    reply_markup: Markup.inlineKeyboard([
        Markup.button.callback('Obtenidos', () => ob(ctx))
    ]) 
});
                    totalRwcoins += randomImage.value;
                    characters.push(randomImage.name); 
                    actualizarInventarioUsuario(userId, characterCount, totalRwcoins, timestamp, characters);
                }
            } catch (error) {
                dc.warn("Error en el comando rw:", error);
            }
        });
    } catch (error) {
        dc.error('Error en el manejo del comando rw:', error);
    }
}

module.exports = rw;