import { OpenAIApi, Configuration } from "openai";
import { getEnvConfig } from "../getConfig";

const configuration = new Configuration({
    apiKey: getEnvConfig().GPT_API_KEY,
});

export const openai = new OpenAIApi(configuration);
