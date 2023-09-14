import generateRandom from "../generateRandomInt.js";
import intro from "../intro.js";

export default async function handleClientMessage(bot, msg) {
    const { message_id, from, chat, date, text } = msg;
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