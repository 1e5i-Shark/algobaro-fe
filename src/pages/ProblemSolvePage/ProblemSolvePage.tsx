import { Panel, PanelGroup } from 'react-resizable-panels';

import { Button, ResizeHandle } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { useCompile, useSubmission } from '@/hooks/useProblemSolve';

import { DIRECTION, MOCK_DATA, SIZE_PERCENTAGE } from './constants';
import * as S from './ProblemSolvePage.style';

export default function ProblemSolvePage() {
  const { theme } = useCustomTheme();

  const { mutate: compileMutate } = useCompile();
  const { mutate: submitMutate } = useSubmission();

  const handleCompileExecution = () => {
    compileMutate(MOCK_DATA.COMPILE);
  };
  const handleSubmit = () => {
    submitMutate(MOCK_DATA.SUBMISSION);
  };

  return (
    <S.Wrapper>
      <S.ContentsWrapper>
        <PanelGroup direction={DIRECTION.HORIZONTAL}>
          <Panel defaultSize={SIZE_PERCENTAGE.PROBLEM}>
            <S.ProblemWrapper>문제</S.ProblemWrapper>
          </Panel>
          <ResizeHandle direction={DIRECTION.HORIZONTAL} />
          <Panel defaultSize={SIZE_PERCENTAGE.SOLVE}>
            <PanelGroup direction={DIRECTION.VERTICAL}>
              <Panel defaultSize={SIZE_PERCENTAGE.EDITOR}>
                <S.EditorWrapper>에디터</S.EditorWrapper>
              </Panel>
              <ResizeHandle direction={DIRECTION.VERTICAL} />
              <Panel defaultSize={SIZE_PERCENTAGE.EXCEUTION}>
                <S.ExecutionWrapper>출력 및 실행 결과</S.ExecutionWrapper>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </S.ContentsWrapper>
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
