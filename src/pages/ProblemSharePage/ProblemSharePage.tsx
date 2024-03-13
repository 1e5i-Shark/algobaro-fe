import { useState } from 'react';

import { CodeEditor } from '@/components';
import { MOCK_ROOM_DATA } from '@/constants/room';

import { MOCK_USER_DATA } from './constants';
import * as S from './ProblemSharePage.style';
import UserProfileList from './UserProfileList/UserProfileList';

const userData = MOCK_USER_DATA;
const myId = 'soopy368@test.com';
const myInfo = MOCK_USER_DATA.find(user => user.id === myId);

export default function ProblemSharePage() {
  const [selectedUser, setSelectedUser] = useState(myInfo);

  const handleUserClick = (userId: string) => {
    const filteredUser = userData.find(user => user.id === userId);
    setSelectedUser(filteredUser ?? myInfo);
  };

  return (
    <S.Wrapper>
      <UserProfileList
        selectedUser={selectedUser}
        userList={MOCK_USER_DATA}
        onUserClick={handleUserClick}
      />
      <S.CodeEditorWrapper>
        <CodeEditor roomUuid={MOCK_ROOM_DATA.roomShortUuid} />
      </S.CodeEditorWrapper>
    </S.Wrapper>
  );
}
