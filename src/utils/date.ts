import { addDays as addDaysDateFns, format, isBefore } from "date-fns";

const addDays = (days: number) => addDaysDateFns(new Date(), days);

function formatDate(date: string, formatText = "dd/MM/yyyy HH:mm:ss") {
  return format(new Date(date), formatText);
}

const isExpired = (expiration: string): boolean =>
  isBefore(new Date(expiration), new Date());

export { addDays, formatDate, isExpired };
