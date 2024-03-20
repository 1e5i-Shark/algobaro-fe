import { useEffect, useState } from 'react';

const useStopWatch = () => {
  // 버튼이 클릭된 시간
  const [startTime, setStartTime] = useState<number | null>(null);
  // 경과 시간(초)
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  // 딜레이 여부 체크
  const [nowDelay, setNowDelay] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let timeout: NodeJS.Timeout | null = null;

    if (startTime) {
      setNowDelay(true);

      // 회의 결과: 5초의 delay time
      timeout = setTimeout(() => {
        setNowDelay(false);
      }, 1000 * 5);

      // 1초마다 elapsedTime을 업데이트
      interval = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000 * 60);
    } else {
      // 타이머를 초기화
      setElapsedTime(0);
    }

    // 컴포넌트가 언마운트되거나 startTime이 변경될 때마다 인터벌을 정리
    return () => {
      if (interval) {
        clearInterval(interval);
      }
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [startTime]);

  // 버튼 클릭 이벤트 핸들러
  const startStopWatch = () => {
    // 현재 시간을 startTime으로 설정하고 elapsedTime을 0으로 초기화
    setStartTime(Date.now());
    setElapsedTime(1);
  };

  return {
    elapsedTime,
    nowDelay,
    startStopWatch,
  };
};

export default useStopWatch;
