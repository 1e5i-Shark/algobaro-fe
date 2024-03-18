import { useEffect, useState } from 'react';

import { CodeEditor } from '@/components';
import { MOCK_ROOM_DATA } from '@/constants/room';
import useCodeEditorStore from '@/store/CodeEditorStore';
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
  const { code } = useCodeEditorStore();

  const handleUserClick = (userId: string) => {
    const filteredUser = userData.find(user => user.id === userId);
    setSelectedUser(filteredUser ?? myInfo);
  };

  // TODO: 서버로부터 종료 timestamp 받으면 제거 예정
  useEffect(() => {
    setIsStop(true);
    setIsEnd(false);
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
