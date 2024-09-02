const axios = require('axios');
const dc = require('consola');
const DC = require('../global');
const logCommand = require('../log/logcommand');

let enviando = false;

const handler = async (ctx) => {
    logCommand(ctx);

    try {
        const text = ctx.message.text;
        const command = ctx.message.text.split(' ')[0];
        const usedPrefix = '/';
        const m = ctx.message;

        if (!text || text.trim() === '') {
            throw new Error(`*[❗] Por favor, ingrese un enlace válido de X (twitter), por ejemplo: ${usedPrefix + command} https://twitter.com/auronplay/status/1586487664274206720?s=20&t=3snvkvwGUIez5iWYQAehpw*`);
        }

        if (enviando) return;

        enviando = true;

        await ctx.replyWithMarkdown(global.wait);

        const res = await TwitterDL(text);

        console.log('Respuesta de TwitterDL:', res); 

        if (res && res.result) {
            if (res.result.type == 'video') {
                const caption = res?.result.caption ? res.result.caption : '*Aquí tiene su imagen*';

                for (let i = 0; i < res.result.media.length; i++) {
                    await ctx.replyWithVideo({ url: res.result.media[i].result[0].url, caption: caption });
                }

                enviando = false;
                return;
            } else if (res.result.type == 'photo') {
                const caption = res?.result.caption ? res.result.caption : '*Aquí tiene su imagen*';

                for (let i = 0; i < res.result.media.length; i++) {
                    await ctx.replyWithPhoto({ url: res.result.media[i].url, caption: caption });
                }

                enviando = false;
                return;
            } else {
                throw new Error('*[❗] Tipo de contenido no compatible.*');
            }
        } else {
            throw new Error('*[❗] No se pudo obtener el contenido de Twitter.*');
        }
    } catch (error) {
        await ctx.replyWithMarkdown(error.message);
        enviando = false;
    }
};

DC.command(['x', 'xdl', 'dlx', 'twdl', 'tw', 'twt', 'twitter'], handler);

const _twitterapi = (id) => `https://info.tweeload.site/status/${id}.json`;

const getAuthorization = async () => {
    const { data } = await axios.get("https://pastebin.com/raw/SnCfd4ru");
    return data;
};

const TwitterDL = async (url) => {
    return new Promise(async (resolve, reject) => {
        const id = url.match(/\/([\d]+)/);

        if (!id) {
            resolve({
                status: "error",
                message: "There was an error getting twitter id. Make sure your twitter url is correct!"
            });
        }

        try {
            const response = await axios(_twitterapi(id[1]), {
                method: "GET",
                headers: {
                    Authorization: await getAuthorization(),
                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
                },
            });

            if (response.data.code !== 200) {
                resolve({
                    status: "error",
                    message: "An error occurred while sending the request.",
                });
            }

            const author = {
                id: response.data.tweet.author.id,
                name: response.data.tweet.author.name,
                username: response.data.tweet.author.screen_name,
                avatar_url: response.data.tweet.author.avatar_url,
                banner_url: response.data.tweet.author.banner_url,
            };

            let media = [];
            let type;

            if (response.data.tweet?.media?.videos) {
                type = "video";

                response.data.tweet.media.videos.forEach((v) => {
                    const resultVideo = [];

                    v.video_urls.forEach((z) => {
                        resultVideo.push({
                            bitrate: z.bitrate,
                            content_type: z.content_type,
                            resolution: z.url.match(/([\d ]{2,5}[x][\d ]{2,5})/)[0],
                            url: z.url,
                        });
                    });

                    if (resultVideo.length !== 0) {
                        media.push({
                            type: v.type,
                            duration: v.duration,
                            thumbnail_url: v.thumbnail_url,
                            result: v.type === "video" ? resultVideo : v.url,
                        });
                    }
                });
            } else {
                type = "photo";

                response.data.tweet.media.photos.forEach((v) => {
                    media.push(v);
                });
            }

            resolve({
                status: "success",
                result: {
                    id: response.data.tweet.id,
                    caption: response.data.tweet.text,
                    created_at: response.data.tweet.created_at,
                    created_timestamp: response.data.tweet.created_timestamp,
                    replies: response.data.tweet.replies,
                    retweets: response.data.tweet.retweets,
                    likes: response.data.tweet.likes,
                    url: response.data.tweet.url,
                    possibly_sensitive: response.data.tweet.possibly_sensitive,
                    author,
                    type,
                    media: media.length !== 0 ? media : null,
                },
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = DC;