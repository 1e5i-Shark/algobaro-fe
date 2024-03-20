export const ukToKoreaTime = (timestamp: string) => {
  const ukTime = timestamp;
  const date = new Date(ukTime);
  const koreaTimeOffset = 9 * 60 * 60 * 1000;
  const koreaTime = new Date(date.getTime() + koreaTimeOffset);

  return koreaTime;
};

export const convertKoreaTime = (timestamp: string) => {
  const date = ukToKoreaTime(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};
