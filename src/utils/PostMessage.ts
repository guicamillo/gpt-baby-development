import { getEnvConfig } from "../getConfig";
import TelegramBot from "node-telegram-bot-api";

class PostMessage {
    #channel;
    #apiKey: string;
    #chatID: string;
    constructor() {
        const env = getEnvConfig();
        this.#channel = env.PUBLISH_UPDATES_TO;

        switch (this.#channel) {
            case "Telegram":
                this.#apiKey = env.TELEGRAM_BOT_API_KEY;
                this.#chatID = env.TELEGRAM_GROUP_ID;
                break;
        }
    }

    async post(message: string) {
        switch (this.#channel) {
            case "Telegram":
                return new TelegramBot(this.#apiKey).sendMessage(this.#chatID, message, {
                    parse_mode: "Markdown",
                });
        }
    }
}

export default new PostMessage();
