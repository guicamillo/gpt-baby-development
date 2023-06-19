import "dotenv/config";
import { z } from "zod";
import { SupportedLanguages } from "./i18n/supportedLanguages";
import { getAcceptedPronouns } from "./i18n/pronouns";

const BaseEnvSchema = z.object({
    PUBLISH_UPDATES_TO: z.enum(["Telegram"]),
    GPT_API_KEY: z.string().nonempty(),
    BABY_NAME: z.string().nonempty(),
    BABY_BIRTHDAY: z.coerce.date(),
    BABY_PRONOUNS: z.string(),
    LANGUAGE: z.enum(SupportedLanguages),
});

const TelegramConfigSchema = z.object({
    PUBLISH_UPDATES_TO: z.enum(["Telegram"]),
    TELEGRAM_BOT_API_KEY: z.string().nonempty(),
    TELEGRAM_GROUP_ID: z.string().nonempty(),
});

const EnvSchema = BaseEnvSchema.and(z.discriminatedUnion("PUBLISH_UPDATES_TO", [TelegramConfigSchema]));

export type Env = z.infer<typeof EnvSchema>;
export function getEnvConfig(): Env {
    try {
        return EnvSchema.refine((schema) => getAcceptedPronouns(schema.LANGUAGE).includes(schema.BABY_PRONOUNS), {
            message: `Your selected pronouns are not supported by the language you've selected.
                Received: ${process.env.BABY_PRONOUNS};
                Expected: one of ${getAcceptedPronouns(process.env.LANGUAGE as Env["LANGUAGE"])}`,
        }).parse(process.env);
    } catch (err) {
        if (err instanceof z.ZodError) {
            console.error("There were some issues parsing your .env file:", err.issues);
        }

        throw new Error();
    }
}
