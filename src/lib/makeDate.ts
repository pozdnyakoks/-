export const makeDate = (date: string) => {
  // console.log(date)
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

  if (days === 30) {
    return `1 months ago`
  }
  if (days > 30 ) {
    return `${Math.floor(days/30)} months ago`
  }
  if (days < 30 && days > 1 ) {
    return `${days} days ago`
  }
  if (hours > 24) {
    return `${days} days ago`
  }
  if (hours >= 24 && hours < 48) {
    return `1 day ago`
  }
  if (hours < 24 && hours > 1) {
    return `${hours} hours ago`
  }
  if (hours === 1) {
    return `${hours} hour ago`
  }
  if (minutes < 60) {
    return `${minutes} minutes ago`
  }
  if (minutes === 1) {
    return `${minutes} minute ago`
  }
}