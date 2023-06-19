import { openai, setSystemContext } from "./setup";

import { getEnvConfig } from "../getConfig";
import { getAgeInYears } from "../utils/date";

export async function getYearlyDevelopmentMilestones() {
    const { BABY_NAME } = getEnvConfig();
    const age = getAgeInYears();
    return openai
        .createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                setSystemContext([`Make sure to start responses with "Today it's ${BABY_NAME}'s birthday!!! 🎉".`]),
                {
                    role: "user",
                    content: `What are the development milestones for a human that is ${age} years old? What will change on their brain?`,
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
