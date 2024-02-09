export const makeDate = (date: string) => {
  const newDate = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = now - newDate;

  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = millisecondsPerSecond * 60;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;

  const days = Math.floor(diff / millisecondsPerDay);
  const hours = Math.floor((diff % millisecondsPerDay) / millisecondsPerHour);
  const minutes = Math.floor((diff % millisecondsPerHour) / millisecondsPerMinute);

  if (minutes === 1) {
    return `${minutes} minute ago`
  }
  if (minutes < 60) {
    return `${minutes} minutes ago`
  }
  if (hours === 1) {
    return `${hours} hour ago`
  }
  if (hours < 24) {
    return `${hours} hours ago`
  }
  if (hours >= 24 && hours < 48) {
    return `${days} day ago`
  }
  if (hours > 24) {
    return `${days} days ago`
  }
}