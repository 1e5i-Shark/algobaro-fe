import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CodeEditor } from '@/components';
import { MOCK_ROOM_DATA } from '@/constants/room';
import { useGetUuidRoom } from '@/hooks/Api/useRooms';
import useCodeEditorStore from '@/store/CodeEditorStore';
import useRoomStore from '@/store/RoomStore';
import useTimerStore from '@/store/TimerStore';

import { MOCK_USER_DATA } from './constants';
import * as S from './ProblemSharePage.style';
import UserProfileList from './UserProfileList/UserProfileList';

const userData = MOCK_USER_DATA;
const myId = 'soopy368@test.com';
const myInfo = MOCK_USER_DATA.find(user => user.id === myId);

export default function ProblemSharePage() {
  const [selectedUser, setSelectedUser] = useState(myInfo);
  const { setIsStop, setIsEnd } = useTimerStore(state => state);

  const params = useParams();
  const { roomShortUuid } = params;

  if (!roomShortUuid) return;

  const { data: roomDetail, refetch } = useGetUuidRoom(roomShortUuid);
  const { code } = useCodeEditorStore();
  const { setRoomData } = useRoomStore(state => state);

  const handleUserClick = (userId: string) => {
    const filteredUser = userData.find(user => user.id === userId);
    setSelectedUser(filteredUser ?? myInfo);
  };

  // TODO: 서버로부터 종료 timestamp 받으면 제거 예정
  useEffect(() => {
    setIsStop(true);
    setIsEnd(false);
  }, []);

  useEffect(() => {
    if (roomDetail?.response) {
      setRoomData(roomDetail.response);
    }
  }, [roomDetail]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <S.Wrapper>
      <UserProfileList
        selectedUser={selectedUser}
        userList={MOCK_USER_DATA}
        onUserClick={handleUserClick}
      />
      <S.CodeEditorWrapper>
        <CodeEditor
          defaultValue={code}
          mode="readonly"
          roomUuid={MOCK_ROOM_DATA.roomShortUuid}
        />
      </S.CodeEditorWrapper>
    </S.Wrapper>
  );
}
