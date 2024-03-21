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

/**
 * 영국 타임 스탬프 시간을 한국 시간으로 yyyy-mm-dd (day) hh:mm:ss으로 변환하는 함수
 * @param timestamp
 * @returns
 */
export const convertKoreaTimestamp = (timestamp: string) => {
  const convertLowerTen = (number: number) => {
    return number + 1 > 9 ? number + 1 : `0${number + 1}`;
  };

  const koreaTime: Date = ukToKoreaTime(timestamp);
  const year = koreaTime.getFullYear();
  const month = convertLowerTen(koreaTime.getMonth());
  const date = convertLowerTen(koreaTime.getDate());
  const hours = convertLowerTen(koreaTime.getHours());
  const minutes = convertLowerTen(koreaTime.getMinutes());
  const seconds = convertLowerTen(koreaTime.getSeconds());
  const day = koreaTime.getDay();
  const dayList = ['일', '월', '화', '수', '목', '금', '토'];

  return `${year}-${month}-${date} (${dayList[day]}) ${hours}:${minutes}:${seconds}`;
};
