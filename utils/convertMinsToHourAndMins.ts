export const convertMinsToHourAndMins = (mins: number) => {
  if(mins < 60) {
    return `0h ${mins}m`;
  }
  const h = Math.trunc(mins / 60);
  const m = mins % 60;
  return m > 10 ? `${h}h ${m}m` : `${h}h 0${m}m`;
}
