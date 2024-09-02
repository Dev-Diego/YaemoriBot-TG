const { Telegraf } = require('telegraf');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const DC = require('../global');
const logCommand = require('../log/logcommand');

async function uploadToTelegraph(filePath) {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    
    const response = await axios.post('https://telegra.ph/upload', form, {
        headers: form.getHeaders()
    });
    
    return response.data[0].src;
}

async function tourl() {
    DC.command(['tourl'], async (ctx) => {
        logCommand(ctx);
        let mediaMessage = ctx.message.reply_to_message;
        if (mediaMessage && (mediaMessage.photo || mediaMessage.video)) {
            try {
                let fileId;
                let mediaType;
                if (mediaMessage.photo) {
                    fileId = mediaMessage.photo[mediaMessage.photo.length - 1].file_id;
                    mediaType = 'photo';
                } else if (mediaMessage.video) {
                    fileId = mediaMessage.video.file_id;
                    mediaType = 'video';
                }
                let fileUrl = await ctx.telegram.getFileLink(fileId).then(link => link.href);
                console.log(fileUrl);
                const randomNum = Math.floor(Math.random() * 1000000);
                const fileExtension = mediaType === 'photo' ? 'jpg' : 'mp4';
                const fileName = `${fileId}_${randomNum}.${fileExtension}`;
                const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
                const tempFilePath = `./${fileName}`;
                fs.writeFileSync(tempFilePath, Buffer.from(response.data));


                const telegraphUrl = await uploadToTelegraph(tempFilePath);

                ctx.reply(`https://telegra.ph${telegraphUrl}`, { reply_to_message_id: ctx.message.message_id });
                fs.unlinkSync(tempFilePath);
            } catch (error) {
                ctx.reply(`Error: ${error.message}`, { reply_to_message_id: ctx.message.message_id });
            }
        } else {
            DC.reply("<b>Envia y responde a una imagen o video con el comando :</b> " + prefix + cmd, { reply_to_message_id: ctx.message.message_id, parse_mode: "HTML" });
        }
    });
}

module.exports = tourl;