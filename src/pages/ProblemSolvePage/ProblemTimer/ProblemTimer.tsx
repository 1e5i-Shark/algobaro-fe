import { DateBaseTimer } from '@/components';
import useMessageStore from '@/store/MessageStore';
import useTimerStore from '@/store/TimerStore';

import * as S from './ProblemTimer.style';
interface TimerProps {
  isProblemSolvePage: boolean;
}

export default function ProblemTimer({ isProblemSolvePage }: TimerProps) {
  const { isEnd, setIsEnd } = useTimerStore(state => state);

  const { testEndTime } = useMessageStore(state => state);

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
              endDateISOString={testEndTime}
              setIsEnd={setIsEnd}
            />
          </>
        )}
      </S.TimeLeftWrapper>
    </S.Wrapper>
  );
}
