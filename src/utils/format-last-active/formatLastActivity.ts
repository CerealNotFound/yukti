import { formatDistanceToNow, isToday, isYesterday } from "date-fns";

export function formatLastActivity(date: string | Date): string {
  // Handle invalid or null dates
  if (!date) return "";

  // Convert string date to Date object directly
  const activityDate = typeof date === "string" ? new Date(date) : date;

  // Check if the date is valid
  if (isNaN(activityDate.getTime())) {
    return "";
  }

  if (isYesterday(activityDate)) {
    return "Yesterday";
  }

  if (isToday(activityDate)) {
    const hours = formatDistanceToNow(activityDate, { addSuffix: false });

    if (hours.includes("hours")) {
      const hourCount = parseInt(hours);
      if (hourCount > 6) {
        return "Today";
      }
      if (hourCount === 1) {
        return "1 hour ago";
      }
      return `${hourCount} hours ago`;
    }

    return "Less than an hour ago";
  }

  return formatDistanceToNow(activityDate, { addSuffix: true });
}
