import { openai } from "./setup";

import { getEnvConfig } from "../getConfig";
import { getPrompt } from "../i18n/prompts";

export async function getMessage(ageInMonths: number) {
    const { LANGUAGE: SelectedLanguage, BABY_PRONOUNS: pronouns } = getEnvConfig();

    return openai
        .createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You're talking to parents in the following language/locale "${SelectedLanguage}".
                    They will ask questions related to their baby development.
                    Use the pronouns ${pronouns} when referring to their baby.
                    You can output the content using markdown to give extra emphasis`,
                },
                {
                    role: "user",
                    content: getPrompt(ageInMonths),
                },
            ],
        })
        .then((v) => {
            return v.data.choices.map((choice) => choice.message?.content).join("\n");
        })
        .catch((err) => {
            throw new Error(`There was an error connecting to OpenAI's API: ${JSON.stringify(err)}`);
        });
}
