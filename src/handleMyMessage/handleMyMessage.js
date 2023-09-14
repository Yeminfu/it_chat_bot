export default async function handleMyMessage(bot, msg) {
    // console.log('my message');
    const { message_id, from, chat, date, text } = msg;
    const { id, first_name, last_name, username } = chat;
    console.log('text', text);
    bot.sendMessage(process.env.MY_ID, 'я сам себе прислал\n' + text);
}