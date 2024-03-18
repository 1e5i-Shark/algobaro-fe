import { Avatar, EllipsisText } from '@/components';
import { RoomMemberType } from '@/types/room';

import * as S from './UserProfileList.style';

interface UserProfileListProps {
  selectedUserId: number | null;
  userList: RoomMemberType[];
  onUserClick: (userId: number) => void;
}

export default function UserProfileList({
  selectedUserId,
  userList,
  onUserClick,
}: UserProfileListProps) {
  const selectedUser = userList.find(user => user.memberId === selectedUserId);

  return (
    <S.Wrapper>
      <S.UserList>
        {userList?.map(user => (
          <S.UserItem
            key={user.memberId}
            onClick={() => onUserClick(user.memberId)}
          >
            <Avatar
              size="L"
              src={user.profileImage ?? ''}
            />
            <S.UserName $isSelected={selectedUser?.memberId === user.memberId}>
              <EllipsisText
                width="8rem"
                lineClamp={2}
              >
                {user.nickname}
              </EllipsisText>
            </S.UserName>
          </S.UserItem>
        ))}
      </S.UserList>
    </S.Wrapper>
  );
}
