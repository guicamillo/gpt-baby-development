export function getMonthsBetween(startDate: Date, endDate: Date) {
    const yearsDifference = endDate.getFullYear() - startDate.getFullYear();
    const monthsDifference = endDate.getMonth() - startDate.getMonth();
    return yearsDifference * 12 + monthsDifference;
}
