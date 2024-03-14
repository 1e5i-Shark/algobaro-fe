import { Timer } from '@/components';
import useModal from '@/hooks/useModal';
import useTimerStore from '@/store/TimerStore';

import ProblemEndModal from '../ProblemEndModal/ProblemEndModal';
import * as S from './ProblemTimer.style';
interface TimerProps {
  isProblemSolvePage: boolean;
}

export default function ProblemTimer({ isProblemSolvePage }: TimerProps) {
  const { modalRef, isOpen, openModal, closeModal } = useModal();

  // TODO: 삭제 예정 navigate 테스트용 코드
  const { isStop, isEnd, setIsStop, setIsEnd } = useTimerStore(state => state);

  return (
    <S.Wrapper>
      <S.TimeLeftWrapper>
        {!isProblemSolvePage && <S.TimeOverText>시험 종료</S.TimeOverText>}
        {isProblemSolvePage && isEnd && (
          <S.TimeOverText>시험 종료</S.TimeOverText>
        )}
        {isProblemSolvePage && !isEnd && (
          <S.TimeLeftText>남은 시간</S.TimeLeftText>
        )}
        {isProblemSolvePage && (
          <Timer
            isStop={isStop}
            minutes={minutes}
            seconds={seconds}
            openModal={openModal}
            setIsEnd={setIsEnd}
          />
        )}
      </S.TimeLeftWrapper>
      {/* TODO: 삭제 예정 navigate 테스트용 코드 */}
      {isProblemSolvePage && (
        <S.TestButton onClick={() => setIsStop(false)}>
          시험 종료 후 풀이 공유 페이지로 이동
        </S.TestButton>
      )}
      <ProblemEndModal
        modalRef={modalRef}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </S.Wrapper>
  );
}
