import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CodeEditor } from '@/components';
import { MOCK_ROOM_DATA } from '@/constants/room';
import { useMyInfo } from '@/hooks/Api/useMembers';
import { useGetRoomMembers } from '@/hooks/Api/useRooms';
import { useGetUuidRoom } from '@/hooks/Api/useRooms';
import { useSolvedResult } from '@/hooks/Api/useSolves';
import useRoomStore from '@/store/RoomStore';

import * as S from './ProblemSharePage.style';
import UserProfileList from './UserProfileList/UserProfileList';

export default function ProblemSharePage() {
  const { data: myInfo, refetch: refetchMyInfo } = useMyInfo();
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const { setRoomData } = useRoomStore(state => state);

  const params = useParams();
  const { roomShortUuid } = params;

  if (!roomShortUuid) return;

  const { data: roomDetail, refetch: refetchRoomDetail } =
    useGetUuidRoom(roomShortUuid);

  const { data: solvedResults = [], isLoading: isResultLoading } =
    useSolvedResult(roomShortUuid);
  const { data: userList = [], isLoading: isUserListLoading } =
    useGetRoomMembers(roomShortUuid);

  const handleUserClick = (userId: number) => {
    setSelectedMemberId(userId);
  };

  const selectedResult = solvedResults.find(
    result => result.memberId === selectedMemberId
  );

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

  if (isResultLoading || isUserListLoading) return;

  if (solvedResults.length === 0 || userList.length === 0) {
    return <S.NoResultText>풀이 내역이 존재하지 않습니다</S.NoResultText>;
  }

  return (
    <S.Wrapper>
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
              <S.SolveFailText>FAIL 🥲</S.SolveFailText>
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
    </S.Wrapper>
  );
}
