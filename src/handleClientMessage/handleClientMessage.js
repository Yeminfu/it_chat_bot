export default async function handleClientMessage(bot, msg) {
    const { message_id, from, chat, date, text } = msg;
    const { id, first_name, last_name, username } = chat;

    await bot.sendMessage(process.env.MY_ID, id);
    await bot.sendMessage(process.env.MY_ID, [first_name, last_name, username, text].join(", "));

}