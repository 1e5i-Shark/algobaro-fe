import { CodeEditor, Image, Modal, Spinner } from '@/components';
import { ModalProps } from '@/components/Common/Modal/Modal';
import { LOGOS } from '@/constants/logos';
import { useGetSolvedDetail } from '@/hooks/Api/useSolves';

import * as S from './HistoryDetailModal.style';
import { languageConvert } from './languageConstant';

interface HistoryDetailModalProps extends ModalProps {
  solveId: number;
}

export default function HistoryDetailModal({
  isOpen,
  onClose,
  solveId,
  ...props
}: HistoryDetailModalProps) {
  const { data, isFetched } = useGetSolvedDetail(solveId);
  const detailData = data?.response;
  const language = detailData?.language;
  const convertedLang = language && languageConvert[language];
  const solveStatus = detailData?.solveStatus;
  const solvedTime = detailData?.solvedAt;
  const problemLink = detailData?.problemLink;
  const codeData = detailData?.code;

  const handleClickProblemLink = () => {
    if (!problemLink) return;

    window.open(problemLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        style={{
          minWidth: '80rem',
        }}
        {...props}
      >
        <S.ModalInnerWrapper>
          {isFetched ? (
            <>
              <S.ModalName>풀이 세부 정보</S.ModalName>
              <S.ModalTextContainer>
                <S.ModalTitle>백준 문제 링크 :</S.ModalTitle>
                <S.ProblemLink onClick={handleClickProblemLink}>
                  {problemLink}
                </S.ProblemLink>
              </S.ModalTextContainer>
              <S.ModalTextContainer>
                <S.ModalTitle>언어 :</S.ModalTitle>
                <S.ImageContainer>
                  <Image
                    src={(convertedLang && LOGOS[convertedLang]) || ''}
                    fill={true}
                    shape="circle"
                  />
                </S.ImageContainer>
                <S.ModalText>{convertedLang}</S.ModalText>
              </S.ModalTextContainer>
              <S.ModalTextContainer>
                <S.ModalTitle>채점 상태 :</S.ModalTitle>
                {solveStatus &&
                  (solveStatus === 'SUCCESS' ? (
                    <S.SolveSuccessText>{solveStatus}</S.SolveSuccessText>
                  ) : (
                    <S.SolveFailText>{solveStatus}</S.SolveFailText>
                  ))}
              </S.ModalTextContainer>
              <S.ModalTextContainer>
                <S.ModalTitle>문제 푼 시간 :</S.ModalTitle>
                <S.ModalText>{solvedTime?.replace('T', ' ')}</S.ModalText>
              </S.ModalTextContainer>
              {codeData ? (
                <CodeEditor
                  mode="readonly"
                  defaultValue={codeData}
                  width="72rem"
                  height="30rem"
                />
              ) : (
                <S.NoCodeContainer>작성한 코드가 없어요!</S.NoCodeContainer>
              )}
            </>
          ) : (
            <Spinner />
          )}
        </S.ModalInnerWrapper>
      </Modal>
    </>
  );
}
