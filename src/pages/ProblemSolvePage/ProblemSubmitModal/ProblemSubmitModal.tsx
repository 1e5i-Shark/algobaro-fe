import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';

import { Button, Modal, Spinner } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { useSubmission } from '@/hooks/useProblemSolve';
import { PATH } from '@/routes/path';
import { TestCaseResultType } from '@/services/ProblemSolve/submission';
import useCodeEditorStore from '@/store/CodeEditorStore';
import useRoomStore from '@/store/RoomStore';

import failLottie from './lottie/fail-lottie.json';
import successLottie from './lottie/success-lottie.json';
import * as S from './ProblemSubmitModal.style';

interface ProblemSubmitModalProps {
  modalRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  closeModal: () => void;
}

export default function ProblemSubmitModal({
  modalRef,
  isOpen,
  closeModal,
}: ProblemSubmitModalProps) {
  const { theme } = useCustomTheme();

  const { roomShortUuid, problemLink } = useRoomStore(state => state.roomData);
  const { code, language } = useCodeEditorStore(state => state);

  const [testCaseResult, setTestCaseResult] = useState<TestCaseResultType[]>(
    []
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const { mutateAsync: submitMutateAsync, isLoading } = useSubmission();

  const navigate = useNavigate();

  const handleCopyCode = () => {
    if (window.navigator.clipboard) {
      window.navigator.clipboard.writeText(code);
      alert('작성하신 코드가 복사되었어요!');
    } else {
      alert('복사하기가 지원되지 않는 브라우저입니다.');
    }
  };

  const handleBOJSubmit = () => {
    handleCopyCode();
    setTimeout(() => {
      window.open(
        problemLink.replace('problem', 'submit'),
        '_blank',
        'noopener,noreferrer'
      );
      setIsSubmitDisabled(false);
    }, 800);
  };

  const handleEndCoding = () => {
    navigate(`${PATH.PROBLEMSHARE}/${roomShortUuid}`);
  };

  const handleSubmit = async () => {
    const result = await submitMutateAsync({
      roomShortUuid,
      language,
      code,
      problemLink,
    });

    if (result.response?.testCaseResults) {
      setTestCaseResult(result.response.testCaseResults);
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleSubmit();
      setIsSubmitDisabled(true);
    } else {
      setTestCaseResult([]);
    }
  }, [isOpen]);

  return (
    <Modal
      width="60rem"
      height="fit-content"
      ref={modalRef}
      isOpen={isOpen}
      onClose={closeModal}
    >
      <S.Wrapper>
        <S.TestCaseWrapper>
          <S.Title>채점 결과</S.Title>
          {testCaseResult.length === 0 && (
            <S.TestResultWrapper>
              {isLoading ? (
                <Spinner />
              ) : (
                <S.TestErrorText>{`실행 중 오류가 발생했습니다 \n 잠시 후 다시 시도해주세요`}</S.TestErrorText>
              )}
            </S.TestResultWrapper>
          )}
          {testCaseResult.length > 0 && (
            <S.TestCaseList>
              {testCaseResult.map((result, index) => (
                <S.TestCaseItem key={index}>
                  <S.TestCaseTitle>{`TestCase ${index + 1}:`}</S.TestCaseTitle>
                  <S.LottieWrapper>
                    <Lottie
                      width={result.success ? 100 : 21}
                      height={result.success ? 100 : 21}
                      options={{
                        loop: false,
                        autoplay: true,
                        animationData: result.success
                          ? successLottie
                          : failLottie,
                      }}
                      style={{ margin: '0' }}
                    />
                  </S.LottieWrapper>
                </S.TestCaseItem>
              ))}
              <S.TestCaseItem>
                <S.TestCaseTitle>{`TestCase 3:`}</S.TestCaseTitle>
                <S.LottieWrapper>
                  <Lottie
                    width={true ? 100 : 21}
                    height={true ? 100 : 21}
                    options={{
                      loop: false,
                      autoplay: true,
                      animationData: true ? successLottie : failLottie,
                    }}
                    style={{ margin: '0' }}
                  />
                </S.LottieWrapper>
              </S.TestCaseItem>
            </S.TestCaseList>
          )}
        </S.TestCaseWrapper>
        <S.BOJWrapper>
          <S.Title>백준 제출하기</S.Title>
          <S.BOJGuideText>{`백준 사이트에 제출하여 채점 결과를 확인해 보세요!
          제출이 완료되어야 서비스를 정상적으로 이용할 수 있어요`}</S.BOJGuideText>
          <S.BOJButtonWrapper>
            <Button
              width="16rem"
              height="5rem"
              fontSize="1.6rem"
              onClick={handleBOJSubmit}
            >
              백준 제출하러 가기
            </Button>
          </S.BOJButtonWrapper>
          <S.EndButtonWrapper>
            <Button
              width="16rem"
              height="4rem"
              fontSize="1.6rem"
              backgroundColor={theme.color.gray_20}
              textColor={`${theme.color.red}`}
              onClick={handleEndCoding}
              disabled={isSubmitDisabled}
            >
              풀이 종료하기
            </Button>
          </S.EndButtonWrapper>
        </S.BOJWrapper>
      </S.Wrapper>
    </Modal>
  );
}
