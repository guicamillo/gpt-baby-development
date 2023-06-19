import { getMessage } from "./GPT/get-message";
import { getEnv } from "./getConfig";
import { getHeading } from "./i18n/messages";

import { getMonthsBetween } from "./utils/date";
import * as Telegram from "./utils/postToTelegram";

const env = getEnv();

const Today = new Date();
const { BABY_BIRTHDAY: birthday } = env;

const BabyCurrentAgeInMonths = getMonthsBetween(birthday, Today);

(async function () {
    try {
        const GPTResponse = await getMessage(BabyCurrentAgeInMonths);
        const FormattedMessage = `${getHeading(BabyCurrentAgeInMonths)}
        
        ${GPTResponse.map((choice) => choice.message?.content).join("\n")}`;

        Telegram.SendMessage(FormattedMessage);
    } catch (err) {
        Telegram.SendMessage(`Something went wrong: ${JSON.stringify(err)}`);
    }
})();
