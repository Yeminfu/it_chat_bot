import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import handleMyMessage from "./src/handleMyMessage/handleMyMessage.js";
import handleClientMessage from "./src/handleClientMessage/handleClientMessage.js";
import messageExample from "./messageExample.json.js";
import { pool } from "./src/db/connect.js"

(async function () {

    // const { from: { id: telegramChatId }, text } = messageExample;

    // console.log('messageExample', messageExample);

    // const userId = await getUserIdByTelegramChatId(telegramChatId);

    // pool.query(
    //     "INSERT INTO messages (from_user, text, full_message) VALUES (?,?,?)",
    //     [userId, text, JSON.stringify(messageExample)],
    //     function (err, res) {
    //         if (err) {
    //             console.log('err #sdkfv', err);
    //         }
    //         console.log('res', res.insertId);
    //     }
    // )


    // console.log({
    //     // telegramChatId,
    //     text,
    //     userId
    //     //     from_user,
    //     //     text,
    //     //     full_message
    // });

    // return;
    console.log('#vdf go');
    if (!process.env.TELEGRAM_TOKEN) {
        console.log('err #1 no token');
        return;
    }
    var token = process.env.TELEGRAM_TOKEN;
    const bot = new TelegramBot(token, { polling: true });

    bot.on('message', function (msg) {
        console.log('msg', msg);
        handleMessage(bot, msg)
    });
})();

async function handleMessage(bot, msg) {
    if (String(msg.chat.id) === process.env.MY_ID) {
        // return;
        handleMyMessage(bot, msg);
    } else {
        handleClientMessage(bot, msg);
    }
    // console.log('process.env.MY_ID',process.env.MY_ID);
    // console.log('msg', { message_id, from, chat, date, text });
    // console.log('chat', { id, first_name, last_name, username });
}


// SELECT * FROM users WHERE tg_id = "855909963"
