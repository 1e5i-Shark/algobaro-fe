import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Chat, CodeEditor } from '@/components';
import { MOCK_ROOM_DATA } from '@/constants/room';
import { SOCKET_TYPE } from '@/constants/socket';
import { useMyInfo } from '@/hooks/Api/useMembers';
import { useGetRoomMembers } from '@/hooks/Api/useRooms';
import { useGetUuidRoom } from '@/hooks/Api/useRooms';
import { useSolvedResult } from '@/hooks/Api/useSolves';
import useMessageStore from '@/store/MessageStore';
import useRoomStore from '@/store/RoomStore';

import { STATUS_DATA_SET } from '../ProblemSolvePage/constants';
import * as S from './ProblemSharePage.style';
import UserProfileList from './UserProfileList/UserProfileList';

export default function ProblemSharePage() {
  const { data: myInfo, refetch: refetchMyInfo } = useMyInfo();
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const { setRoomData } = useRoomStore(state => state);
  const { receiveLogs } = useMessageStore(state => state);

  const {
    client,
    subscription,
    connect,
    reset: resetMessage,
  } = useMessageStore();

  const params = useParams();
  const { roomShortUuid } = params;

  if (!roomShortUuid) return;

  const { data: roomDetail, refetch: refetchRoomDetail } =
    useGetUuidRoom(roomShortUuid);

  const {
    data: solvedResults = [],
    isLoading: isResultLoading,
    refetch: refetchResult,
  } = useSolvedResult(roomShortUuid);
  const { data: userList = [], isLoading: isUserListLoading } =
    useGetRoomMembers(roomShortUuid);

  const handleUserClick = (userId: number) => {
    setSelectedMemberId(userId);
  };

  const selectedResult = solvedResults.find(
    result => result.memberId === selectedMemberId
  );

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

  useEffect(() => {
    if (roomDetail?.response) {
      setRoomData(roomDetail.response);
    }
  }, [roomDetail]);

  useEffect(() => {
    if (myInfo?.response) {
      setSelectedMemberId(myInfo.response.id);
    }
  }, [myInfo]);

  useEffect(() => {
    refetchRoomDetail();
    refetchMyInfo();
  }, []);

  useEffect(() => {
    if (receiveLogs.at(-1) === SOCKET_TYPE.ROOM.END_CODING) {
      refetchResult();
    }
  }, [receiveLogs]);

  if (isResultLoading || isUserListLoading) return;

  if (solvedResults.length === 0 || userList.length === 0) {
    return <S.NoResultText>풀이 내역이 존재하지 않습니다</S.NoResultText>;
  }

  return (
    <S.Wrapper>
      <S.CodeEditorContainer>
        <UserProfileList
          selectedUserId={selectedMemberId}
          userList={userList}
          onUserClick={handleUserClick}
        />
        <S.CodeEditorWrapper>
          {selectedResult?.code && (
            <S.SolveStatusWrapper>
              {selectedResult?.solveStatus === 'SUCCESS' ? (
                <S.SolveSuccessText>SUCCESS 🎉</S.SolveSuccessText>
              ) : (
                <S.SolveFailWrapper>
                  <S.SolveFailText>
                    {selectedResult?.failureReason
                      ? `${STATUS_DATA_SET[selectedResult.failureReason]} 😭`
                      : 'FAIL 😭'}
                  </S.SolveFailText>
                </S.SolveFailWrapper>
              )}
            </S.SolveStatusWrapper>
          )}
          {selectedResult?.code ? (
            <CodeEditor
              defaultValue={selectedResult?.code}
              mode="readonly"
              roomUuid={MOCK_ROOM_DATA.roomShortUuid}
            />
          ) : (
            <S.NoResultText>아직 문제를 풀고 있어요 📝</S.NoResultText>
          )}
        </S.CodeEditorWrapper>
      </S.CodeEditorContainer>
      <S.ChatContainer>
        <Chat />
      </S.ChatContainer>
    </S.Wrapper>
  );
}
