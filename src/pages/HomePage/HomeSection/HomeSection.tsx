import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { useNavigate } from 'react-router-dom';

import { Button, Icon, Image, Tag } from '@/components';
import { LOGOS } from '@/constants/logos';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import { RoomsListType } from '@/types/room';

import * as S from './HomeSection.style';

export default function HomeSection({
  roomId,
  roomStatus,
  title,
  languages,
  roomAccessType,
  roomLimit,
  tags,
  roomShortUuid,
  currentMemberCount,
}: RoomsListType) {
  const { theme } = useCustomTheme();
  const navigate = useNavigate();

  const handleRoomEnter = () => {
    navigate(`/room/${roomId}`, { state: roomShortUuid });
  };

  return (
    <S.SectionWrapper>
      <S.RoomHeader>
        <S.TitleWrapper>
          <S.RoomTitle title={title}>{title}</S.RoomTitle>
          <Icon>
            {roomAccessType === 'PUBLIC' ? (
              <LockOpenRoundedIcon />
            ) : (
              <LockRoundedIcon />
            )}
          </Icon>
        </S.TitleWrapper>
        <S.RoomLimit>{`${currentMemberCount}/${roomLimit}`}</S.RoomLimit>
      </S.RoomHeader>

      <S.RoomTags>
        {tags.map((tag, index) => {
          return (
            <Tag
              key={`${tag}-${index}-${roomShortUuid}`}
              mode="normal"
              tagId="코딩테스트"
              height="2.4rem"
              fontSize="1rem"
              style={{
                backgroundColor:
                  theme.mode === 'light'
                    ? theme.color.gray_30
                    : theme.color.gray_50,
                maxWidth: '20%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                marginRight: '1rem',
              }}
            >
              <S.TagText
                title={tag}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {tag}
              </S.TagText>
            </Tag>
          );
        })}
      </S.RoomTags>

      <S.RoomFooter>
        <S.LanguageImgs>
          {languages.map((lang, index) => {
            return (
              <Image
                key={`${lang}-${index}-${roomShortUuid}`}
                src={LOGOS[lang]}
                fill={true}
                shape="circle"
              />
            );
          })}
        </S.LanguageImgs>

        {roomStatus === 'RECRUITING' ? (
          <Button onClick={handleRoomEnter}>입장</Button>
        ) : (
          <S.InProgress>진행중</S.InProgress>
        )}
      </S.RoomFooter>
    </S.SectionWrapper>
  );
}
