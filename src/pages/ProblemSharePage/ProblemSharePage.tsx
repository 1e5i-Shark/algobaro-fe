import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Chat, CodeEditor } from '@/components';
import { MOCK_ROOM_DATA } from '@/constants/room';
import { useGetRoomMembers } from '@/hooks/Api/useRooms';
import { useSolvedResult } from '@/hooks/Api/useSolves';

import { MOCK_MY_ID } from './constants';
import * as S from './ProblemSharePage.style';
import UserProfileList from './UserProfileList/UserProfileList';

export default function ProblemSharePage() {
  const [selectedMemberId, setSelectedMemberId] = useState(MOCK_MY_ID);

  const params = useParams();
  const { roomShortUuid } = params;

  if (roomShortUuid == null) return;

  const { data: solvedResults = [] } = useSolvedResult(roomShortUuid);
  const { data: userList = [] } = useGetRoomMembers(roomShortUuid);

  const handleUserClick = (userId: number) => {
    setSelectedMemberId(userId);
  };

  const selectedResult = solvedResults.find(
    result => result.memberId === selectedMemberId
  );

  if (solvedResults.length === 0 || userList.length === 0) return;

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
            <S.NoResultText>풀이 내역이 존재하지 않습니다</S.NoResultText>
          )}
        </S.CodeEditorWrapper>
      </S.CodeEditorContainer>
      <S.ChatContainer>
        <Chat />
      </S.ChatContainer>
    </S.Wrapper>
  );
}
