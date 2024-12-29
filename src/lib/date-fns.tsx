import { formatDistanceToNow, intervalToDuration } from "date-fns";

export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatRelativeTime(timestamp: number): string {
  return formatDistanceToNow(new Date(timestamp * 1000), { addSuffix: true });
}

export function formatToMinutesAndSeconds(totalSeconds: number): string {
  const duration = intervalToDuration({
    start: 0,
    end: totalSeconds * 1000,
  });

  const minutes = String(duration.minutes || 0).padStart(2, "0");
  const seconds = String(duration.seconds || 0).padStart(2, "0");

  return `${minutes}:${seconds}`;
}
