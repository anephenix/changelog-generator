const days: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Get current date
// 31st? I reckon this will be a good one to test. Let's write a test for it.
function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th'; // Covers 11th to 19th
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function formatDateToString(): string {
  const today: Date = new Date();
  const dayName: string = days[today.getDay()];
  const day: number = today.getDate();
  const monthName: string = months[today.getMonth()];
  const year: number = today.getFullYear();
  const ordinalSuffix: string = getOrdinalSuffix(day);
  return `${dayName} ${day}${ordinalSuffix} ${monthName}, ${year}`;
}

export { getOrdinalSuffix, formatDateToString };
