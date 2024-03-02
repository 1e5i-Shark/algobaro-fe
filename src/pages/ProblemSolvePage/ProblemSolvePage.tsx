import { Button } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { useCompile, useSubmission } from '@/hooks/useProblemSolve';

import * as S from './ProblemSolvePage.style';

export default function ProblemSolvePage() {
  const { theme } = useCustomTheme();

  return (
    <S.Wrapper>
      <S.ContentsWrapper>
        <S.ProblemWrapper>문제</S.ProblemWrapper>
        <S.SolveWrapper>
          <S.EditorWrapper>에디터</S.EditorWrapper>
          <S.ExecutionWrapper>출력 및 실행 결과</S.ExecutionWrapper>
        </S.SolveWrapper>
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
