import generateRandom from "../generateRandomInt.js";
import intro from "../intro.js";
import { pool } from "../db/connect.js";
import { getUserIdByTelegramChatId } from "../db/getUserIdByTelegramChatId.js";
//getUserIdByTelegramChatId

export default async function handleClientMessage(bot, msg) {
    const { message_id, from: { id: telegramChatId }, chat, date, text } = msg;
    const { id, first_name, last_name, username } = chat;

    if (text === "/start") {
        pool.query(
            "INSERT INTO users (tg_username, tg_id) VALUES (?,?)",
            [username, id],
            function (err, res) {
                if (err) {
                    console.log('err #sdk44fv', err);
                }
            }
        )
    }

    const userId = await getUserIdByTelegramChatId(telegramChatId);

    if (userId) {
        pool.query(
            "INSERT INTO messages (from_user, text, full_message) VALUES (?,?,?)",
            [userId, text, JSON.stringify(msg)],
            function (err, res) {
                if (err) {
                    console.log('err #sdkfv', err);
                }
            }
        )
    }


    const message = [first_name || "_", id || "-", username, text].join(", ");

    if (text === "/start") {
        await bot.sendMessage(process.env.MY_ID, `Зашел новый пользователь (${message})`);
        setTimeout(async () => {
            await bot.sendMessage(id, intro);
            // crea

            const tg_id = await getUserIdByTelegramChatId(id);

            pool.query(
                "INSERT INTO messages (from_user, text, full_message) VALUES (?,?,?)",
                [tg_id, text, JSON.stringify(msg)],
                function (err, res) {
                    if (err) {
                        console.log('err #sdd4kv', err);
                    }
                    console.log('res', res);
                }
            )
            
            pool.query(
                "INSERT INTO messages (to_user, text, full_message) VALUES (?,?,?)",
                [tg_id, intro, ""],
                function (err, res) {
                    if (err) {
                        console.log('err #sdd4kv', err);
                    }
                    console.log('res', res);
                }
            )

        }, generateRandom());
    } else {

        await bot.sendMessage(process.env.MY_ID, `Пришло сообщение (${message})`);
        await bot.sendMessage(process.env.MY_ID, id);

    }
}
