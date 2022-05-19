export const totalMinutesStr = (timeInSegs: number) => {
  const formattedSeg = (timeInSegs % 60) < 10 ? `0${timeInSegs % 60}` : timeInSegs % 60;
  return `${Math.floor(timeInSegs / 60)}:${timeInSegs % 60 ? formattedSeg : '00'}`;
};