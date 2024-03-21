import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';

import { Button, DropDown, Modal, Spinner } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { useSubmission, useTestCaseSubmission } from '@/hooks/useProblemSolve';
import { PATH } from '@/routes/path';
import { TestCaseResultType } from '@/services/ProblemSolve/submission';
import useCodeEditorStore from '@/store/CodeEditorStore';
import useRoomStore from '@/store/RoomStore';
import useTimerStore from '@/store/TimerStore';
import { toastify } from '@/utils/toastify';

import { STATUS_DATA_SET } from '../constants';
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
  const { isEnd } = useTimerStore(state => state);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [solveStatus, setSolveStatus] = useState('SUCCESS');
  const [failureReason, setFailureReason] = useState('');
  const [testCaseResult, setTestCaseResult] = useState<TestCaseResultType[]>(
    []
  );

  const { mutateAsync: submitMutateAsync } = useSubmission();
  const { mutateAsync: testCaseSubmitMutateAsync, isLoading } =
    useTestCaseSubmission();

  const navigate = useNavigate();

  const handleCopyCode = () => {
    if (window.navigator.clipboard) {
      window.navigator.clipboard.writeText(code);
      toastify.success('작성하신 코드가 복사되었어요!');
    } else {
      toastify.error('복사하기가 지원되지 않는 브라우저입니다.');
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

  const handleEndCoding = async () => {
    await submitMutateAsync({
      roomShortUuid,
      language,
      code,
      problemLink,
      solveStatus,
      failureReason,
    });
    navigate(`${PATH.PROBLEMSHARE}/${roomShortUuid}`, { replace: true });
  };

  const handleSubmit = async () => {
    const result = await testCaseSubmitMutateAsync({
      roomShortUuid,
      language,
      code,
      problemLink,
      solveStatus,
      failureReason,
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
      mode={isEnd ? 'confirm' : 'normal'}
      width="65rem"
      height="fit-content"
      ref={modalRef}
      isOpen={isOpen}
      onClose={closeModal}
    >
      <S.Wrapper>
        <S.SubmissionWrapper>
          <S.Title>제출하기</S.Title>
          <S.SubmissionLayoutContainer>
            <S.TestCaseResultWrapper>
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
                </S.TestCaseList>
              )}
            </S.TestCaseResultWrapper>
            <S.BojSubmissionWrapper>
              <S.BOJGuideText>{`백준 사이트에 제출하여 \n 채점 결과를 확인해 보세요!`}</S.BOJGuideText>
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
            </S.BojSubmissionWrapper>
          </S.SubmissionLayoutContainer>
        </S.SubmissionWrapper>
        <S.ResultShareWrapper>
          <S.Title>결과 공유하기</S.Title>
          <S.BOJGuideText>{`팀원들에게 채점 결과를 공유해 주세요 🤗`}</S.BOJGuideText>
          <S.BOJButtonWrapper>
            <DropDown
              width="16rem"
              dataId="submitStatus"
              labelId="status-label"
              defaultValue={'SUCCESS'}
              dataSet={STATUS_DATA_SET}
              onSelected={value => {
                if (value === 'SUCCESS') {
                  setSolveStatus(value);
                  setFailureReason('');
                  return;
                }

                setSolveStatus('FAIL');
                setFailureReason(value);
              }}
              borderColor={theme.color.gray_50}
              fontSize={theme.size.M}
              backgroundColor={theme.color.background_editor}
              hasDefaultLabel={false}
            />
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
        </S.ResultShareWrapper>
      </S.Wrapper>
    </Modal>
  );
}
