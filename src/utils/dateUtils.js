export function extractTimeAMPM(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function extractDayAndMonth(dateString) {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", { month: "short" });

  return `${month} ${day}`;
}
