export const ukToKoreaTime = (timestamp: string) => {
  const ukTime = timestamp;
  const date = new Date(ukTime);
  const koreaTimeOffset = 9 * 60 * 60 * 1000;
  const koreaTime = new Date(date.getTime() + koreaTimeOffset);
  const hours = koreaTime.getHours().toString().padStart(2, '0');
  const minutes = koreaTime.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};
