import { DateBaseTimer } from '@/components';
import useTimerStore from '@/store/TimerStore';
import { MINUTES_IN_MS } from '@/utils/timer';

import * as S from './ProblemTimer.style';
interface TimerProps {
  isProblemSolvePage: boolean;
}

export default function ProblemTimer({ isProblemSolvePage }: TimerProps) {
  const { isEnd, setIsEnd } = useTimerStore(state => state);

  // TODO: 서버 timestamp로 교체 필요, 1시간 기준으로 테스트 중
  const now = new Date();
  const endDateISOString = new Date(
    now.getTime() + 60 * MINUTES_IN_MS
  ).toISOString();

  return (
    <S.Wrapper>
      <S.TimeLeftWrapper>
        {!isProblemSolvePage && <S.TimeOverText>시험 종료</S.TimeOverText>}
        {isProblemSolvePage && isEnd && (
          <S.TimeOverText>시험 종료</S.TimeOverText>
        )}
        {isProblemSolvePage && !isEnd && (
          <>
            <S.TimeLeftText>남은 시간</S.TimeLeftText>
            <DateBaseTimer
              endDateISOString={endDateISOString}
              setIsEnd={setIsEnd}
            />
          </>
        )}
      </S.TimeLeftWrapper>
    </S.Wrapper>
  );
}
