import config from "../config.js";
import loader from "./Manager/loader.js";
import selfLoader from "./Manager/selfLoader.js";
import dataSchema from "./Manager/Database/Schemas/data_schema.js";

import SelfToken from "discord.js-selfbot-v13";
import { Client } from "discord.js";

const selfClient = new SelfToken.Client({
    checkUpdate: false,
});

const client = new Client({
    intents: [3276799]
});

selfClient.on("ready", client => {
    selfLoader(client);
});

client.on("ready", async client => {

    loader(client);

    await dataSchema.findOne({ where: { id: 1 } })
        .then((result) => {
            if (result && result.account) {
                selfClient.login(result.account)
                    .then(() => console.log(`${selfClient.user.username} ismiyle teslim hesabı bağlantısı kuruldu.`))
                    .catch(() => { });
            }
        });
});

client.login(config.BOT_TOKEN)
    .then(() => console.log(`${client.user.username} ismiyle Discord BOT bağlantısı kuruldu.`))
    .catch(() => console.log("BOT bağlantısı kurulamadı. Discord BOT tokeninizi kontrol edin!"))