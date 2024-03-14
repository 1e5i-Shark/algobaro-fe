import { Spinner } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import useCodeEditorStore from '@/store/CodeEditorStore';

import * as S from './ProblemExecution.style';

interface Props {
  isLoading: boolean;
}

export default function ProblemExecution({ isLoading }: Props) {
  const { theme } = useCustomTheme();
  const result = useCodeEditorStore(state => state.result);

  return (
    <S.Wrapper>
      <S.ResultTitle>실행 결과</S.ResultTitle>
      <S.ResultWrapper>
        {isLoading && <Spinner color={theme.color.gray_30} />}
        {!isLoading && (
          <S.ResultText>
            {result === '' ? (
              <S.GuideText>실행 버튼을 누르면 결과가 표시됩니다.</S.GuideText>
            ) : (
              result
            )}
          </S.ResultText>
        )}
      </S.ResultWrapper>
    </S.Wrapper>
  );
}
