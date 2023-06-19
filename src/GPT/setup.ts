import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from "openai";
import { getEnvConfig } from "../getConfig";

const configuration = new Configuration({
    apiKey: getEnvConfig().OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

export function setSystemContext(extraContext: string[]): ChatCompletionRequestMessage {
    const { SELECTED_LANGUAGE_LOCALE, BABY_GENDER, BABY_PRONOUNS, BABY_NAME } = getEnvConfig();

    return {
        role: "system",
        content: [
            `You're talking to parents to be. , they will ask questions related to their baby development.`,
            `The baby is named ${BABY_NAME}.`,
            `The baby gender is ${BABY_GENDER}`,
            BABY_PRONOUNS && `They prefer the pronouns ${BABY_PRONOUNS}.`,
            `You can output the content using markdown to give extra emphasis.`,
            ...extraContext,
            `All of your responses should be in the following locale "${SELECTED_LANGUAGE_LOCALE}".`,
        ]
            .filter(Boolean)
            .join("\n"),
    };
}
