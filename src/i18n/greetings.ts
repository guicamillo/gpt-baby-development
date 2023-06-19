import { Env, getEnvConfig } from "../getConfig";

const { LANGUAGE: SelectedLanguage, BABY_NAME: name } = getEnvConfig();

type GreeterFn = (babyName: string, ageInMonths: number) => string;

const EnglishGreeter: GreeterFn = (name, ageInMonths) => `Today ${name} is **${ageInMonths} months old** 🎉`;
const PortugueseGreeter: GreeterFn = (name, ageInMonths) =>
    `Hoje, ${name} completa **${ageInMonths} meses de idade** 🎉`;

const GreetingsPerLanguage: Record<Env["LANGUAGE"], GreeterFn> = {
    enUS: EnglishGreeter,
    enCA: EnglishGreeter,
    enGB: EnglishGreeter,
    ptBR: PortugueseGreeter,
};

export function getGreeting(ageInMonths: number) {
    return GreetingsPerLanguage[SelectedLanguage](name, ageInMonths);
}
