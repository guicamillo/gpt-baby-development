import { openai } from "./setup";

import { getEnv } from "../getConfig";
import { getPrompt } from "../i18n/messages";

export async function getMessage(ageInMonths: number) {
    const { LANGUAGE: SelectedLanguage, BABY_PRONOUNS: pronouns } = getEnv();

    return openai
        .createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You're talking to parents in the following language "${SelectedLanguage}". Use the pronouns ${pronouns} when referring to the baby.`,
                },
                {
                    role: "user",
                    content: getPrompt(ageInMonths),
                },
            ],
        })
        .then((v) => {
            return v.data.choices;
        })
        .catch((err) => {
            throw new Error(`There was an error connecting to OpenAI's API: ${JSON.stringify(err)}`);
        });
}
