import generateRandom from "../generateRandomInt.js";
import intro from "../intro.js";
import { pool } from "../db/connect.js";
import { getUserIdByTelegramChatId } from "../db/getUserIdByTelegramChatId.js";
//getUserIdByTelegramChatId

export default async function handleClientMessage(bot, msg) {

    const { message_id, from: { id: telegramChatId }, chat, date, text } = msg;

    const userId = await getUserIdByTelegramChatId(telegramChatId);

    pool.query(
        "INSERT INTO messages (from_user, text, full_message) VALUES (?,?,?)",
        [userId, text, JSON.stringify(msg)],
        function (err, res) {
            if (err) {
                console.log('err #sdkfv', err);
            }
            // console.log('res', res.insertId);
        }
    )

    const { id, first_name, last_name, username } = chat;

    const message = [first_name || "_", id || "-", username, text].join(", ");

    if (text === "/start") {
        await bot.sendMessage(process.env.MY_ID, `Зашел новый пользователь (${message})`);
        setTimeout(async () => {
            await bot.sendMessage(id, intro);
        }, generateRandom());
    } else {

        await bot.sendMessage(process.env.MY_ID, `Пришло сообщение (${message})`);
        await bot.sendMessage(process.env.MY_ID, id);

    }
}
