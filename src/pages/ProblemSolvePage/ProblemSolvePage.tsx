import { Panel, PanelGroup } from 'react-resizable-panels';

import { Button, ResizeHandle } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { useCompile, useSubmission } from '@/hooks/useProblemSolve';

import * as S from './ProblemSolvePage.style';

const MOCK_DATA = {
  COMPILE: {
    language: 'java',
    input: '1 2',
    code: 'import java.io.BufferedReader;\nimport java.io.IOException;\nimport java.io.InputStreamReader;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String[] input = br.readLine().split(" ");\n        int a = Integer.parseInt(input[0]);\n        int b = Integer.parseInt(input[1]);\n        System.out.println(a + b);\n    }\n}',
  },
  SUBMISSION: {
    roomUuid: '123e4567-e89b-12d3-a456-426614174000',
    language: 'java',
    code: 'import java.io.BufferedReader;\nimport java.io.IOException;\nimport java.io.InputStreamReader;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String[] input = br.readLine().split(" ");\n        int a = Integer.parseInt(input[0]);\n        int b = Integer.parseInt(input[1]);\n        System.out.println(a + b);\n    }\n}',
    problemLink: 'https://www.acmicpc.net/problem/1000',
  },
};

const DIRECTION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const;

const SIZE_PERCENTAGE = {
  PROBLEM: 40,
  SOLVE: 60,
  EDITOR: 80,
  EXCEUTION: 20,
} as const;

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
