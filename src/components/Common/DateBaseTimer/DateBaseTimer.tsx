import { useEffect, useRef, useState } from 'react';

import { ukToKoreaTime } from '@/utils/convertDate';
import { convertedTime } from '@/utils/timer';

import * as S from './DateBaseTimer.style';

interface DateBaseTimerProps {
  endDateISOString: string;
  endText?: string;
  setIsEnd?: (isEnd: boolean) => void;
}

/**
 * hh시간 mm분 ss초 형태의 시간을 보여주는 Timer 컴포넌트
 * ISOString과 현재 시간을 비교하여 남은 시간을 표기합니다.
 * @param [endDateISOString] - `필수` 종료 시간을 나타내는 `ISOString`
 * @param [endText] - `옵션` 타이머가 끝났을 때 보여줄 문구
 * @param [setIsEnd] - `옵션` 타이머 시간이 종료됨을 알려줍니다.
 */

export default function DateBaseTimer({
  endDateISOString,
  endText = '',
  setIsEnd,
}: DateBaseTimerProps) {
  const timer = useRef(0);
  const [remainingTime, setRemainingTime] = useState('');

  const getConvertedTime = function () {
    const now = new Date();
    const targetTime = ukToKoreaTime(endDateISOString);

    const difference = targetTime.getTime() - now.getTime();

    return convertedTime(difference);
  };

  const updateTimer = () => {
    const convertedTime = getConvertedTime();

    if (convertedTime !== null) {
      requestAnimationFrame(updateTimer);
    } else {
      setIsEnd?.(true);
    }

    setRemainingTime(convertedTime ?? endText);
  };

  useEffect(() => {
    timer.current = requestAnimationFrame(updateTimer);

    return () => cancelAnimationFrame(timer.current);
  }, [endDateISOString]);

  return (
    <S.Wrapper $textLength={remainingTime.length}>{remainingTime}</S.Wrapper>
  );
}
