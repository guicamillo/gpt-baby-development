import { Env } from "../getConfig";

const englishPronouns = ["he/him", "she/her", "they/them"] as const;
const portuguesePronouns = ["ele/dele", "ela/dela"] as const;

const pronounsPerLanguage: Record<Env["LANGUAGE"], ReadonlyArray<string>> = {
    ptBR: portuguesePronouns,
    enUS: englishPronouns,
    enCA: englishPronouns,
    enGB: englishPronouns,
};

export function getAcceptedPronouns(selectedLanguage: Env["LANGUAGE"]): ReadonlyArray<string> {
    return pronounsPerLanguage[selectedLanguage];
}
