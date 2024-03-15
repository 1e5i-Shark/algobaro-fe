import { Panel, PanelGroup } from 'react-resizable-panels';

import { Button, CodeEditor, ResizeHandle } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { useCompile, useSubmission } from '@/hooks/useProblemSolve';
import useRoomStore from '@/store/RoomStore';
import useTimerStore from '@/store/TimerStore';

import { DIRECTION, MOCK_DATA, SIZE_PERCENTAGE } from './constants';
import ProblemExecution from './ProblemExecution/ProblemExecution';
import ProblemSection from './ProblemSection/ProblemSection';
import * as S from './ProblemSolvePage.style';

export default function ProblemSolvePage() {
  const { theme } = useCustomTheme();

  const { roomData } = useRoomStore();
  const { mutate: compileMutate } = useCompile();
  const { mutate: submitMutate } = useSubmission();

  const setIsStop = useTimerStore(state => state.setIsStop);

  const handleCompileExecution = () => {
    compileMutate(MOCK_DATA.COMPILE);
  };

  const handleSubmit = () => {
    submitMutate(MOCK_DATA.SUBMISSION);
    setIsStop(false);
  };

  const handleClickProblemLink = () => {
    if (!roomData.problemLink) return;

    window.open(roomData.problemLink, '_blank', 'noopener');
  };

  return (
    <S.Wrapper>
      <S.ContentsWrapper>
        <PanelGroup direction={DIRECTION.HORIZONTAL}>
          <Panel defaultSize={SIZE_PERCENTAGE.PROBLEM}>
            {/* 문제 영역 */}
            <S.ProblemLinkContainer>
              <S.ProblemLinkText>
                문제 출처 :{' '}
                <S.ProblemLink onClick={handleClickProblemLink}>
                  {roomData.problemLink}
                </S.ProblemLink>
              </S.ProblemLinkText>
            </S.ProblemLinkContainer>
            <ProblemSection />
          </Panel>
          <ResizeHandle direction={DIRECTION.HORIZONTAL} />
          <Panel defaultSize={SIZE_PERCENTAGE.SOLVE}>
            <PanelGroup direction={DIRECTION.VERTICAL}>
              <Panel defaultSize={SIZE_PERCENTAGE.EDITOR}>
                {/* 에디터 영역 */}
                <S.EditorWrapper>
                  <CodeEditor />
                </S.EditorWrapper>
              </Panel>
              <ResizeHandle direction={DIRECTION.VERTICAL} />
              <Panel defaultSize={SIZE_PERCENTAGE.EXECUTION}>
                {/* 실행 영역 */}
                <ProblemExecution />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </S.ContentsWrapper>
      {/* 실행 및 제출 버튼 영역 */}
      <S.ButtonWrapper>
        <Button
          backgroundColor={theme.color.gray_20}
          onClick={handleCompileExecution}
        >
          실행
        </Button>
        <Button onClick={handleSubmit}>제출</Button>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
