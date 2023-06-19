import PostMessage from "./utils/PostMessage";
import { getMonthlyDevelepmentMilestones, getWeeklyDevelopmentMilestones, getYearlyDevelopmentMilestones } from "./GPT";
import * as DateUtil from "./utils/date";
import { getEnvConfig } from "./getConfig";

(async function () {
    const env = getEnvConfig();

    try {
        let messages: string[] = [];
        switch (env.BASE_DATE_TYPE) {
            case "BIRTHDAY":
                console.info(`Processing based on the baby being born on ${env.BASE_DATE}...`);
                if (DateUtil.isBirthday()) {
                    console.info(`It's their birthday today! Asking ChatGPT for updates...`);
                    messages.push(await getYearlyDevelopmentMilestones());
                } else if (DateUtil.isMonthsary()) {
                    // Birthdays are also monthsaries, so we just prioritize the birthday message instead...
                    console.info(`It's their monthsary today! Asking ChatGPT for updates...`);
                    messages.push(await getMonthlyDevelepmentMilestones());
                }

                break;

            case "DUE_DATE":
                const ageInWeeks = DateUtil.getAgeInWeeks();
                /**
                 * we will only push updates up the the 42nd week of pregnancy
                 * After that, the parent needs to change their BASE_DATE_TYPE to 'BIRTHDAY' instead.
                 */
                if (ageInWeeks > 42) {
                    messages.push(`It seems like that you folks are into the week number ${ageInWeeks} of pregnancy.`);
                    messages.push(
                        "We hope everything is already with both the mom and the baby, but it's likely that you need to update your .env file to have BASE_DATE_TYPE='BIRTHDAY' instead."
                    );
                    messages.push(
                        `While doing so, make sure that your BASE_DATE env variable also reflect ${env.BABY_NAME}'s actual birthday`
                    );
                }

                if (ageInWeeks <= 42) {
                    if (DateUtil.isWeekIncrementDay()) {
                        console.info(
                            `They're one week older by today, asking ChatGPT for their development milestones for ${ageInWeeks} weeks`
                        );
                        messages.push(await getWeeklyDevelopmentMilestones());
                    }
                }
                break;
        }

        if (messages.length === 0) {
            console.info("No updates for today as it isn't a significative date.");
            return;
        }

        if (messages.length > 0) {
            PostMessage.post(...messages);
        }
    } catch (err) {
        const msg = `Something went wrong: ${JSON.stringify(err)}`;
        PostMessage.post(msg);
    }
})();
