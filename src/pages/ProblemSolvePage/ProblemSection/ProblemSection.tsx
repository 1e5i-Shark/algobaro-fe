import * as S from './ProblemSection.style';

const problemTextList = [
  {
    title: '문제',
    text: '두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.',
  },
  { title: '입력', text: '첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)' },
  { title: '출력', text: '첫째 줄에 A+B를 출력한다.' },
  { title: '예제 입력 1 ', code: '1 2' },
  { title: '예제 출력 1 ', code: '3' },
];

export default function ProblemSection() {
  return (
    <S.ProblemWrapper>
      {problemTextList.map((problem, index) => (
        <S.ProblemTextWrapper key={index}>
          <S.ProblemTitle>{problem.title}</S.ProblemTitle>
          {problem.text && <S.ProblemText>{problem.text}</S.ProblemText>}
          {problem.code && <S.ProblemCode>{problem.code}</S.ProblemCode>}
        </S.ProblemTextWrapper>
      ))}
    </S.ProblemWrapper>
  );
}
