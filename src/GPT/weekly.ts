import { openai, setSystemContext } from "./setup";

import { getEnvConfig } from "../getConfig";
import { getAgeInWeeks } from "../utils/date";

export async function getWeeklyDevelopmentMilestones() {
    const { BABY_NAME } = getEnvConfig();
    const weeks = getAgeInWeeks();
    return openai
        .createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                setSystemContext([
                    `Make sure to start responses with "Today ${BABY_NAME} is **${weeks} weeks old** 🎉".`,
                ]),
                {
                    role: "user",
                    content: `We're expecting a baby and we're currently ${weeks} pregnant. What are the major development milestones that happen at week ${weeks}`,
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
