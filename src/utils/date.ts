import { addDays as addDaysDateFns, format, isBefore } from "date-fns";

const addDays = (days: number) => {
  const currentDate = new Date();
  return addDaysDateFns(currentDate, days);
};

function formatDate(date: string, formatText = "dd/MM/yyyy HH:mm:ss") {
  return format(new Date(date), formatText);
}

const isExpired = (expiration: string): boolean => {
  return isBefore(expiration, new Date());
};

export { addDays, formatDate, isExpired };
