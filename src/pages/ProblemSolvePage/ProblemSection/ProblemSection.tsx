import { useEffect } from 'react';

import { useProblemInfo } from '@/hooks/Api/useProblem';
import useRoomStore from '@/store/RoomStore';

import parseProblemInfo from './parseProblemInfo';
import * as S from './ProblemSection.style';

export default function ProblemSection() {
  const { roomData } = useRoomStore();

  const { data, refetch } = useProblemInfo(roomData.problemLink);

  useEffect(() => {
    refetch();
  }, []);

  const problemInfoHtml = data?.response.problemInfoHtml;
  // 문제 크롤링 정보 html 문자열 값을 파싱 후 객체 배열 형태로 변환한다.
  const problemInfo = parseProblemInfo(problemInfoHtml);

  return (
    <S.ProblemWrapper>
      {problemInfo &&
        problemInfo.map((problem, index) => (
          <S.ProblemTextWrapper key={index}>
            {problem.text || problem.code || problem.domString ? (
              <>
                {problem.title && (
                  <S.ProblemTitle>{problem.title}</S.ProblemTitle>
                )}
                {problem.domString && (
                  <S.ProblemContent
                    dangerouslySetInnerHTML={{ __html: problem.domString }}
                  ></S.ProblemContent>
                )}
                {problem.text && <S.ProblemText>{problem.text}</S.ProblemText>}

                {problem.code && <S.ProblemCode>{problem.code}</S.ProblemCode>}
              </>
            ) : null}
          </S.ProblemTextWrapper>
        ))}
    </S.ProblemWrapper>
  );
}
