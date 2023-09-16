import {pool} from "./connect.js";

export async function getUserIdByTelegramChatId(telegram_chat_id) {
    return await new Promise(resolve => {
        pool.query("SELECT * FROM users WHERE tg_id = ?"
            , [String(telegram_chat_id)],
            function (err, res) {
                if (err) {
                    console.log('err #fskdfv4', err);
                }
                resolve(res?.pop()?.id);
            })
    })
}