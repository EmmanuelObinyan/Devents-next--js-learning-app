
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

export function normalizeEventTime(input: string): string {
  const value = input.trim().toLowerCase();

  // Already in 24-hour format
  const twentyFourHourMatch = value.match(
    /^([01]?\d|2[0-3]):([0-5]\d)$/
  );

  if (twentyFourHourMatch) {
    const hours = Number(twentyFourHourMatch[1]);
    const minutes = Number(twentyFourHourMatch[2]);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  // Convert 12-hour format to 24-hour format
  const twelveHourMatch = value.match(
    /^(1[0-2]|0?[1-9]):([0-5]\d)\s*(am|pm)$/
  );

  if (twelveHourMatch) {
    let hours = Number(twelveHourMatch[1]);
    const minutes = Number(twelveHourMatch[2]);
    const period = twelveHourMatch[3];

    if (period === "am" && hours === 12) {
      hours = 0;
    } else if (period === "pm" && hours !== 12) {
      hours += 12;
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  throw new Error(
    "Invalid time. Use HH:mm or a time such as 4:45 pm."
  );
}
