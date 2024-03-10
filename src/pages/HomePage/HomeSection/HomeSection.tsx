import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

import { Button, Icon, Image, Tag } from '@/components';
import { useCustomTheme } from '@/hooks/useCustomTheme';

import { DummyImgLink, RoomDataProps } from '../DummyData';
import * as S from './HomeSection.style';

export default function HomeSection({
  title,
  roomAccess,
  currentRoomMember,
  roomMemberLimit,
  tags,
  language,
  roomStatus,
}: RoomDataProps) {
  const { theme } = useCustomTheme();

  return (
    <S.SectionWrapper>
      <S.RoomHeader>
        <S.TitleWrapper>
          <S.RoomTitle title={title}>{title}</S.RoomTitle>
          <Icon>
            {roomAccess ? <LockOpenRoundedIcon /> : <LockRoundedIcon />}
          </Icon>
        </S.TitleWrapper>
        <S.RoomLimit>{`${currentRoomMember}/${roomMemberLimit}`}</S.RoomLimit>
      </S.RoomHeader>

      <S.RoomTags>
        {tags.map((tag, index) => {
          return (
            <Tag
              key={`${tag}-${index}`}
              mode="normal"
              tagId="코딩테스트"
              height="2.4rem"
              fontSize="1rem"
              style={{
                backgroundColor: theme.color.gray_30,
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

      {/* // todo: 수영님 이미지 컴포넌트 pull 반영 후 width, height 제거하기 */}
      <S.RoomFooter>
        <S.LanguageImgs>
          {language.map((lang, index) => {
            return (
              <Image
                key={`${lang}-${index}`}
                src={DummyImgLink[lang]}
                width="2.4rem"
                height="2.4rem"
                shape="circle"
              />
            );
          })}
        </S.LanguageImgs>

        {roomStatus === '대기중' ? (
          <Button>입장</Button>
        ) : (
          <S.InProgress>진행중</S.InProgress>
        )}
      </S.RoomFooter>
    </S.SectionWrapper>
  );
}
