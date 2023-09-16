import "dotenv/config";

async function getTelegramMessages() {
    const token = process.env.TELEGRAM_TOKEN;

    const apiUrl = `https://api.telegram.org/bot${token}/getUpdates`;
    console.log(apiUrl);
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.ok) {
            const updates = data.result;
            console.log('data ok', data.result);

            // Создайте пустой объект для хранения информации о чатах
            const chats = {};

            // Переберите все обновления
            for (const update of updates) {
                // Проверьте, есть ли сообщение в обновлении
                if (update.message) {
                    const chatId = update.message.chat.id;
                    const chatTitle = update.message.chat.title;

                    // Если чат с таким идентификатором еще не добавлен в объект, добавьте его
                    if (!chats[chatId]) {
                        chats[chatId] = chatTitle;
                    }
                }
            }

            return chats;
        } else {
            throw new Error('Failed to fetch Telegram chats');
        }
    } catch (error) {
        console.error(error);
    }

    await new Promise(_ => nullget_messages)

}


getTelegramMessages().then(messages => {
    console.log(messages);
});