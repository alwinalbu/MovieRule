
export const formatedTime = (timeString: string): string => {
  const date = new Date(timeString);
  if (isNaN(date.getTime())) {
    console.error("Invalid date string:", timeString);
    return "Invalid Time";
  }

  const hour = date.getHours();
  const minute = date.getMinutes();
  const suffix = hour >= 12 ? "PM" : "AM";
  const adjustedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
  const adjustedMinute = minute.toString().padStart(2, "0");
  return `${adjustedHour}:${adjustedMinute} ${suffix}`;
};
