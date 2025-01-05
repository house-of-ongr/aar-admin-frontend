export function formatDate(date: string | Date): string {
  const targetDate = new Date(date);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = String(targetDate.getDate());
  const month = monthNames[targetDate.getMonth()];
  const year = String(targetDate.getFullYear());

  return `${month}.${day} ${year}`;
}
