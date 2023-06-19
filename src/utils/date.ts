import { getEnvConfig } from "../getConfig";

const Today = new Date("2023-06-12");

function getMonthsBetween(startDate: Date, endDate: Date) {
    const yearsDifference = endDate.getFullYear() - startDate.getFullYear();
    const monthsDifference = endDate.getMonth() - startDate.getMonth();
    return yearsDifference * 12 + monthsDifference;
}

const { BASE_DATE } = getEnvConfig();

export function isBirthday() {
    return BASE_DATE.getDate() === Today.getDate() && BASE_DATE.getMonth() === Today.getMonth();
}

export function isMonthsary() {
    return BASE_DATE.getDate() === Today.getDate();
}

export function isWeekIncrementDay() {
    console.log(BASE_DATE.getDay(), Today.getDay());
    return BASE_DATE.getDay() === Today.getDay();
}

export function getAgeInMonths() {
    return getMonthsBetween(BASE_DATE, Today);
}

export function getAgeInYears() {
    return Today.getFullYear() - BASE_DATE.getFullYear();
}

export function getAgeInWeeks() {
    // We assume that DUE_DATE = 40weeks, then we calculate backwards from it
    console.log({ getWeeksUntilDueDate: getWeeksUntilDueDate() });
    return 40 - getWeeksUntilDueDate();
}
export function getWeeksUntilDueDate() {
    return Math.abs(Math.round((BASE_DATE.getTime() - Today.getTime()) / 1000 / (60 * 60 * 24 * 7)));
}
