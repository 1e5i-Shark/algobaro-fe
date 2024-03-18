export const MS = 1000;
export const MINUTES_IN_MS = 60 * MS;

export const convertedTime = (time: number, padLength?: number) => {
  const minutes = Math.floor((time / MINUTES_IN_MS) % 60);
  const hours = Math.floor(time / (60 * MINUTES_IN_MS));
  const seconds = Math.floor((time / MS) % 60);

  const convertedMinutes = String(minutes).padStart(padLength ?? 2, '0');
  const convertedSeconds = String(seconds).padStart(padLength ?? 2, '0');

  if (hours > 0) {
    return `${hours}시간 ${convertedMinutes}분`;
  }

  if (minutes > 0) {
    return `${convertedMinutes}분 ${convertedSeconds}초`;
  }

  if (seconds > 0) {
    return `${convertedSeconds}초`;
  }

  return null;
};
