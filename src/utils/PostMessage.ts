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

    async post(...messages: string[]) {
        if (getEnvConfig().DRY_RUN) {
            console.info("App is running on dry-run mode... outputting content to the console instead");
            console.log(messages);
            return;
        }

        switch (this.#channel) {
            case "Telegram":
                const Bot = new TelegramBot(this.#apiKey);
                messages.forEach((message) => {
                    Bot.sendMessage(this.#chatID, message, {
                        parse_mode: "Markdown",
                    });
                });
        }
    }
}

export default new PostMessage();
