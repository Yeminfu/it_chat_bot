import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import handleMyMessage from "./src/handleMyMessage/handleMyMessage.js";
import handleClientMessage from "./src/handleClientMessage/handleClientMessage.js";

(async function () {

    console.log('#vdf go');
    if (!process.env.TELEGRAM_TOKEN) {
        console.log('err #1 no token');
        return;
    }
    var token = process.env.TELEGRAM_TOKEN;
    const bot = new TelegramBot(token, { polling: true });

    bot.on('message', function (msg) {
        // console.log('msg', msg);
        handleMessage(bot, msg)
    });
})();

async function handleMessage(bot, msg) {
    if (String(msg.chat.id) === process.env.MY_ID) {
        handleMyMessage(bot, msg);
    } else {
        handleClientMessage(bot, msg);
    }
}
