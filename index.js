import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import handleMyMessage from "./src/handleMyMessage/handleMyMessage.js";
import handleClientMessage from "./src/handleClientMessage/handleClientMessage.js";

(function () {
    console.log('go');
    if (!process.env.TELEGRAM_TOKEN) {
        console.log('err #1 no token');
        return;
    }
    var token = process.env.TELEGRAM_TOKEN;
    const bot = new TelegramBot(token, { polling: true });
    bot.on('message', function (msg) {
        handleMessage(bot, msg)
    });
})();

async function handleMessage(bot, msg) {
    if (String(msg.chat.id) === process.env.MY_ID) {
        handleMyMessage(bot, msg);
    } else {
        handleClientMessage(bot, msg);
    }
    // console.log('process.env.MY_ID',process.env.MY_ID);
    // console.log('msg', { message_id, from, chat, date, text });
    // console.log('chat', { id, first_name, last_name, username });
}
