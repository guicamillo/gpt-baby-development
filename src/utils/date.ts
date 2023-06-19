import { getEnvConfig } from "../getConfig";

const Today = new Date();
const { BASE_DATE } = getEnvConfig();

export function isBirthday() {
    return BASE_DATE.getDate() === Today.getDate() && BASE_DATE.getMonth() === Today.getMonth();
}

export function isMonthsary() {
    return BASE_DATE.getDate() === Today.getDate();
}

export function isWeekIncrementDay() {
    return BASE_DATE.getDay() === Today.getDay();
}

export function getAgeInMonths() {
    const yearsDifference = Today.getFullYear() - BASE_DATE.getFullYear();
    const monthsDifference = Today.getMonth() - BASE_DATE.getMonth();
    return yearsDifference * 12 + monthsDifference;
}

export function getAgeInYears() {
    return Today.getFullYear() - BASE_DATE.getFullYear();
}

export function getAgeInWeeks() {
    // We assume that DUE_DATE = 40weeks, then we calculate backwards from it
    const weeksUntilDueDate = getWeeksUntilDueDate();

    // However, the due date normally can go past 40 weeks (up to 42 AFAIK, so we allow it to keep going further)
    if (weeksUntilDueDate < 0) {
        return 40 + Math.abs(weeksUntilDueDate);
    }
    return 40 - weeksUntilDueDate;
}

export function getWeeksUntilDueDate() {
    return Math.round((BASE_DATE.getTime() - Today.getTime()) / 1000 / (60 * 60 * 24 * 7));
}
