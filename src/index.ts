import { getMessage } from "./GPT/get-message";
import { getEnvConfig } from "./getConfig";
import { getGreeting } from "./i18n/greetings";

import { getMonthsBetween } from "./utils/date";
import PostMessage from "./utils/PostMessage";

const env = getEnvConfig();

const Today = new Date();
const { BABY_BIRTHDAY: birthday } = env;

const BabyCurrentAgeInMonths = getMonthsBetween(birthday, Today);

(async function () {
    try {
        const ChatGPTResponse = await getMessage(BabyCurrentAgeInMonths);
        const FormattedMessage = [getGreeting(BabyCurrentAgeInMonths), ChatGPTResponse].join("\n");
        PostMessage.post(FormattedMessage);
    } catch (err) {
        const msg = `Something went wrong: ${JSON.stringify(err)}`;
        PostMessage.post(msg);
        console.error(msg);
    }
})();
