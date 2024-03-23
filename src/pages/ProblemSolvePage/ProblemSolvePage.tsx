import { useEffect } from 'react';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { useParams } from 'react-router-dom';

import { Button, CodeEditor, ResizeHandle } from '@/components';
import { useGetUuidRoom } from '@/hooks/Api/useRooms';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import useModal from '@/hooks/useModal';
import { useCompile } from '@/hooks/useProblemSolve';
import useCodeEditorStore from '@/store/CodeEditorStore';
import useMessageStore from '@/store/MessageStore';
import useRoomStore from '@/store/RoomStore';
import useTimerStore from '@/store/TimerStore';
import { toastify } from '@/utils/toastify';

import { DIRECTION, SIZE_PERCENTAGE } from './constants';
import ProblemExecution from './ProblemExecution/ProblemExecution';
import ProblemSection from './ProblemSection/ProblemSection';
import * as S from './ProblemSolvePage.style';
import ProblemSubmitModal from './ProblemSubmitModal/ProblemSubmitModal';
import TestCaseInput from './TestCaseInput/TestCaseInput';

export default function ProblemSolvePage() {
  const { theme } = useCustomTheme();
  const { modalRef, isOpen, openModal, closeModal } = useModal();

  const {
    client,
    subscription,
    connect,
    reset: resetMessage,
  } = useMessageStore();

  const params = useParams();
  const { roomShortUuid } = params;

  if (!roomShortUuid) return;

  const {
    mutate: compileMutate,
    isLoading: isCompileLoading,
    isError: isCompileError,
  } = useCompile();
  const { data: roomDetail, refetch } = useGetUuidRoom(roomShortUuid);

  const { input, code, language, reset, setInput } = useCodeEditorStore(
    state => state
  );
  const {
    roomData: { problemLink },
    setRoomData,
  } = useRoomStore(state => state);
  const { isEnd } = useTimerStore(state => state);

  const handleClickProblemLink = () => {
    if (!problemLink) return;

    window.open(problemLink, '_blank', 'noopener,noreferrer');
  };

  const handleCompileExecution = async () => {
    if (confirm('하루 실행 제한이 있습니다. 정말 실행하시겠습니까?')) {
      if (!input.trim()) {
        toastify.error('테스트 케이스를 입력해주세요!');
        return;
      }
      compileMutate({ code, input, language });
    }
  };

  const handleSubmit = async () => {
    openModal();
  };

  const handleChangeTestCase = (newText: string) => {
    setInput(newText);
  };

  useEffect(() => {
    if (roomDetail?.response) {
      setRoomData(roomDetail.response);
    }
  }, [roomDetail]);

  useEffect(() => {
    if (isEnd) {
      openModal();
    } else {
      closeModal();
    }
  }, [isEnd]);

  useEffect(() => {
    reset();
    refetch();
  }, []);

  // 새로고침 해도 소켓 재접속
  useEffect(() => {
    connect(roomShortUuid);

    return () => {
      if (!client || !subscription) return;

      subscription.unsubscribe();
      client.deactivate();

      resetMessage();
    };
  }, []);

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
                  {problemLink}
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
                  <CodeEditor defaultValue={code} />
                </S.EditorWrapper>
              </Panel>
              <ResizeHandle direction={DIRECTION.VERTICAL} />
              <Panel defaultSize={SIZE_PERCENTAGE.EXECUTION}>
                <PanelGroup direction={DIRECTION.HORIZONTAL}>
                  <Panel defaultSize={SIZE_PERCENTAGE.EXECUTION_INPUT}>
                    <S.ExecutionWrapper>
                      <TestCaseInput onChange={handleChangeTestCase} />
                    </S.ExecutionWrapper>
                  </Panel>
                  <ResizeHandle direction={DIRECTION.HORIZONTAL} />
                  <Panel defaultSize={SIZE_PERCENTAGE.EXECUTION_RESULT}>
                    <S.ExecutionWrapper>
                      <ProblemExecution
                        isLoading={isCompileLoading}
                        isError={isCompileError}
                      />
                    </S.ExecutionWrapper>
                  </Panel>
                </PanelGroup>
                {/* 실행 영역 */}
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </S.ContentsWrapper>
      {/* 실행 및 제출 버튼 영역 */}
      <S.ButtonWrapper>
        <Button
          width="12rem"
          height="4rem"
          fontSize="1.6rem"
          backgroundColor={theme.color.gray_20}
          onClick={handleCompileExecution}
        >
          실행
        </Button>
        <Button
          width="12rem"
          height="4rem"
          fontSize="1.6rem"
          onClick={handleSubmit}
        >
          제출
        </Button>
      </S.ButtonWrapper>
      <ProblemSubmitModal
        modalRef={modalRef}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </S.Wrapper>
  );
}
