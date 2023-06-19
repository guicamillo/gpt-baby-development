import { Env, getEnvConfig } from "../getConfig";

type PromptFn = (ageInMonths: number) => string;

const EnglishPrompter: PromptFn = (ageInMonths) =>
    `What are the development milestones for a baby that is ${ageInMonths} months old?`;

const PortuguesePrompter: PromptFn = (ageInMonths) =>
    `Quais são os marcos de desenvolvimento para um bebê de ${ageInMonths} meses de idade?`;

const PromptsPerLanguage: Record<Env["LANGUAGE"], PromptFn> = {
    enUS: EnglishPrompter,
    enCA: EnglishPrompter,
    enGB: EnglishPrompter,
    ptBR: PortuguesePrompter,
};
export function getPrompt(ageInMonths: number) {
    const { LANGUAGE: SelectedLanguage } = getEnvConfig();
    return PromptsPerLanguage[SelectedLanguage](ageInMonths);
}
