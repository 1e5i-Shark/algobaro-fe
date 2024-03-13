import { Avatar, EllipsisText } from '@/components';

import { User } from '../type';
import * as S from './UserProfileList.style';

interface UserProfileListProps {
  selectedUser?: User;
  userList: User[];
  onUserClick: (userId: string) => void;
}

export default function UserProfileList({
  selectedUser,
  userList,
  onUserClick,
}: UserProfileListProps) {
  return (
    <S.Wrapper>
      <S.UserList>
        {userList.map(user => (
          <S.UserItem
            key={user.id}
            onClick={() => onUserClick(user.id)}
          >
            <Avatar
              size="L"
              src={user.profileImage ?? ''}
            />
            <S.UserName $isSelected={selectedUser?.id === user.id}>
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
