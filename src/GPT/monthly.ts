import { openai, setSystemContext } from "./setup";

import { getEnvConfig } from "../getConfig";
import { getAgeInMonths } from "../utils/date";

export async function getMonthlyDevelepmentMilestones() {
    const { BABY_NAME } = getEnvConfig();
    const ageInMonths = getAgeInMonths();
    return openai
        .createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                setSystemContext([
                    `Make sure to start responses with "Today ${BABY_NAME} is **${ageInMonths} months old** 🎉".`,
                ]),
                {
                    role: "user",
                    content: `What are the development milestones for a baby that is ${ageInMonths} months old?`,
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
