
export function normalizeEventDate(input: string): string {
  const value = input.trim();

  // Accept only YYYY-MM-DD
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    throw new Error("Date must use YYYY-MM-DD format.");
  }

  const [, year, month, day] = match;
  const date = new Date(`${year}-${month}-${day}T00:00:00Z`);

  if (
    date.getUTCFullYear() !== Number(year) ||
    date.getUTCMonth() + 1 !== Number(month) ||
    date.getUTCDate() !== Number(day)
  ) {
    throw new Error("Invalid calendar date.");
  }

  return value;
}
/**
 * Converts a time into: 4:45 pm
 *
 * Accepted formats:
 * 4:45 pm
 * 4:45 PM
 * 16:45
 * 09:05
 */
export function normalizeEventTime(input: string): string {
  const value = input.trim().toLowerCase();

  // Format: 24-hour time, e.g. 16:45
  const twentyFourHourMatch = value.match(
    /^([01]?\d|2[0-3]):([0-5]\d)$/
  );

  if (twentyFourHourMatch) {
    let hours = Number(twentyFourHourMatch[1]);
    const minutes = Number(twentyFourHourMatch[2]);

    const period = hours >= 12 ? "pm" : "am";

    hours = hours % 12 || 12;

    return `${hours}:${String(minutes).padStart(2, "0")} ${period}`;
  }

  // Format: 12-hour time, e.g. 4:45 pm
  const twelveHourMatch = value.match(
    /^(1[0-2]|0?[1-9]):([0-5]\d)\s*(am|pm)$/
  );

  if (twelveHourMatch) {
    const hours = Number(twelveHourMatch[1]);
    const minutes = Number(twelveHourMatch[2]);
    const period = twelveHourMatch[3];

    return `${hours}:${String(minutes).padStart(2, "0")} ${period}`;
  }

  throw new Error(
    "Invalid time. Use a time such as 4:45 pm or 16:45."
  );
}
