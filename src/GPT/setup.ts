import { OpenAIApi, Configuration } from "openai";
import { getEnv } from "../getConfig";

const configuration = new Configuration({
    apiKey: getEnv().GPT_API_KEY,
});

export const openai = new OpenAIApi(configuration);
