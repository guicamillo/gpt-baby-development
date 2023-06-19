import "dotenv/config";
import { z } from "zod";

const BaseEnvSchema = z.object({
    PUBLISH_UPDATES_TO: z.enum(["Telegram"]),
    OPENAI_API_KEY: z.string().nonempty(),
    SELECTED_LANGUAGE_LOCALE: z.string({
        description:
            "The language/locale in which you expect to get your responses in. expected format $lang_$LOCALE, ie: pt_BR, en_US",
    }),
    BABY_NAME: z.string().nonempty(),
    BABY_PRONOUNS: z.string().optional(),
    BABY_GENDER: z.enum(["FEMALE", "MALE", "NEUTRAL"]).default("NEUTRAL"),
    BASE_DATE: z.coerce.date(),
    BASE_DATE_TYPE: z.enum(["DUE_DATE", "BIRTHDAY"]),
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
        return EnvSchema.parse(process.env);
    } catch (err) {
        if (err instanceof z.ZodError) {
            console.error("There were some issues parsing your .env file:", err.issues);
        }

        throw new Error();
    }
}
