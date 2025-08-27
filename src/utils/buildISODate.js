import { DateTime } from "luxon";

function buildISODate(selectedMonth, selectedDate, selectedHour, selectedMinute, timeZone = "") {
  const monthMap = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
  };

  const currentYear = new Date().getFullYear();
  let dt;
  (timeZone === "") ? dt = DateTime.fromObject(
    {
      year: currentYear,
      month: monthMap[selectedMonth],
      day: parseInt(selectedDate, 10),
      hour: parseInt(selectedHour, 10),
      minute: parseInt(selectedMinute, 10),
    }
  ) : dt = DateTime.fromObject(
    {
      year: currentYear,
      month: monthMap[selectedMonth],
      day: parseInt(selectedDate, 10),
      hour: parseInt(selectedHour, 10),
      minute: parseInt(selectedMinute, 10),
    },
    { zone: timeZone }
  );

  console.log(`Built ISO date: ${dt.toUTC().toISO()} for local ${dt.toFormat("HH:mm")} in ${timeZone}`);
  return dt.toJSDate();
}

export default buildISODate;