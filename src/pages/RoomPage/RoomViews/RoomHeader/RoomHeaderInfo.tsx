import { ContentCopyRounded, LockRounded } from '@mui/icons-material';

import { Icon, Image, Tag } from '@/components';
import { LOGOS } from '@/constants/logos';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import * as S from '@/pages/RoomPage/RoomPage.style';
import useRoomStore from '@/store/Room';

interface RoomInfoProps {
  className: string;
}

export default function RoomInfoContainer({ className }: RoomInfoProps) {
  const { theme } = useCustomTheme();
  const { roomData } = useRoomStore();
  const { roomUUID, title, tags, languages, roomAccessType } = roomData;

  const handleCopyRoomId = () => {
    if (window.navigator.clipboard) {
      window.navigator.clipboard.writeText(roomUUID);

      alert('방 번호가 복사되었습니다!');
    } else {
      alert('복사하기가 지원되지 않는 브라우저입니다.');
    }
  };

  return (
    <div className={className}>
      <S.RoomIdWrapper className="roomId">
        <S.CopyRoomIdTag onClick={handleCopyRoomId}>
          <S.TextId>방 번호 복사</S.TextId>
          <Icon
            size="XXS"
            onClick={() => {}}
          >
            <ContentCopyRounded />
          </Icon>
        </S.CopyRoomIdTag>
      </S.RoomIdWrapper>
      <S.TitleWrapper className="title">
        {roomAccessType === 'PRIVATE' && (
          <Icon
            color={theme.color.text_primary_color}
            style={{
              paddingRight: '0.5rem',
              cursor: 'default',
            }}
          >
            <LockRounded />
          </Icon>
        )}
        <h2>{title}</h2>
      </S.TitleWrapper>
      <S.TagsWrapper className="tagsGroup">
        {tags.map((tag, index) => (
          <S.TagWrapper key={tag + index}>
            <Tag
              height="2.6rem"
              fontSize="1.4rem"
              mode="normal"
              backgroundColor={theme.color.transparent_50}
              tagId={tag + index}
            >
              {tag}
            </Tag>
          </S.TagWrapper>
        ))}
      </S.TagsWrapper>
      <S.LogosWrapper className="logosGroup">
        {languages.map(language => (
          <S.LogoWrapper key={language}>
            <Image
              shape="circle"
              alt="logo"
              fill={true}
              src={LOGOS[language.toUpperCase()]}
            />
          </S.LogoWrapper>
        ))}
      </S.LogosWrapper>
    </div>
  );
}
