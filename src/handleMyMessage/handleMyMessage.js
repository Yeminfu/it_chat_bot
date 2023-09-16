import { getUserIdByTelegramChatId } from "../db/getUserIdByTelegramChatId.js";
import { pool } from "../db/connect.js";
export default async function handleMyMessage(bot, msg) {

    // console.log('my message');
    const { message_id, from, chat, date, text } = msg;
    const { id, first_name, last_name, username } = chat;
    // console.log('text #jdn', text);

    const [firstRow, ...otherRows] = text.split("\n");

    if (!firstRow || !otherRows?.length) {
        bot.sendMessage(process.env.MY_ID, 'err #12 UNKNOWN FORMAT');
        return;
    }


    const [cmd, userId] = firstRow.split(' ');

    if (!cmd || !userId) { bot.sendMessage(process.env.MY_ID, 'err #14 UNKNOWN FORMAT'); return; }

    // console.log('otherRows', otherRows);
    console.log('userId', userId);
    const userIdInDb = await getUserIdByTelegramChatId(userId);
    console.log('userIdInDb', userIdInDb);
    // console.log('userIdInDb', userIdInDb);

    pool.query(
        "INSERT INTO messages (to_user, text, full_message) VALUES (?,?,?)",
        [userIdInDb, text, JSON.stringify(msg)],
        function (err, res) {
            if (err) {
                console.log('err #sdd4kv', err);
            }
            console.log('res', res);
        }
    )

    return;


    if (!commands.find(x => x === cmd.toLowerCase())) { bot.sendMessage(process.env.MY_ID, 'err #13 UNKNOWN COMMAND'); return; }
    // console.log('otherRows', otherRows);
    switch (cmd.toLowerCase()) {
        case "send":
            return handleMsgToUserFromAdmin(bot, userId, otherRows.join("\n"));
        default:
            break;
    }
}

async function handleMsgToUserFromAdmin(bot, userId, text) {
    if (!userId || !text) {
        return bot.sendMessage(process.env.MY_ID, JSON.stringify(['err #16 handleMsgToUserFromAdmin(userId, text)', { userId, text }], null, 2));
    }
    await bot.sendMessage(userId, text).then(x => {
        // console.log('xxx #vdfu', x);
    })
}


const commands = ["send"];