import { Env, getEnv } from "../getConfig";

const { LANGUAGE: SelectedLanguage, BABY_NAME: name } = getEnv();

const LocalizedPrompts: Record<Env["LANGUAGE"], (ageInMonths: number) => string> = {
    enUS: (ageInMonths) => `What are the development milestones for a baby that is ${ageInMonths} months old?`,
    ptBR: (ageInMonths) => `Quais são os marcos de desenvolvimento para um bebê de ${ageInMonths} meses de idade?`,
};
export function getPrompt(ageInMonths: number) {
    return LocalizedPrompts[SelectedLanguage](ageInMonths);
}

const LocalizedHeadings: Record<Env["LANGUAGE"], (babyName: string, ageInMonths: number) => string> = {
    enUS: (name, ageInMonths) => `Today ${name} is **${ageInMonths} months old** 🎉`,
    ptBR: (name, ageInMonths) => `Hoje, ${name} completa **${ageInMonths} meses de idade** 🎉`,
};

export function getHeading(ageInMonths: number) {
    return LocalizedHeadings[SelectedLanguage](name, ageInMonths);
}
