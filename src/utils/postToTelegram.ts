import TelegramBot from "node-telegram-bot-api";
import { getEnv } from "../getConfig";

export function SendMessage(message: string) {
    const env = getEnv();

    new TelegramBot(env.TELEGRAM_BOT_API_KEY).sendMessage(env.TELEGRAM_GROUP_ID, message, {
        parse_mode: "Markdown",
    });
}
