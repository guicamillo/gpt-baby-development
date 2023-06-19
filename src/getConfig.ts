import "dotenv/config";
import { z } from "zod";

const SupportedLanguages = ["ptBR", "enUS"] as const;

const SupportedPronounsPerLanguage: Record<Env["LANGUAGE"], string[]> = {
    ptBR: ["ele/dele", "ela/dela"],
    enUS: ["he/him", "she/her"],
};

const EnvSchema = z.object({
    TELEGRAM_BOT_API_KEY: z.string().nonempty(),
    TELEGRAM_GROUP_ID: z.string().nonempty(),
    GPT_API_KEY: z.string().nonempty(),
    BABY_NAME: z.string().nonempty(),
    BABY_BIRTHDAY: z.coerce.date(),
    LANGUAGE: z.enum(SupportedLanguages),
    BABY_PRONOUNS: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;

export function getEnv() {
    try {
        return EnvSchema.refine(
            (schema) => SupportedPronounsPerLanguage[schema.LANGUAGE].includes(schema.BABY_PRONOUNS),
            {
                message: `Your selected pronouns are not supported by the language you've selected.
                Received: ${process.env.BABY_PRONOUNS};
                Expected: one of ${(SupportedPronounsPerLanguage as any)[process.env.LANGUAGE as string]}`,
            }
        ).parse(process.env);
    } catch (err) {
        if (err instanceof z.ZodError) {
            console.error("There were some issues parsing your .env file:", err.issues);
        }

        throw new Error();
    }
}
