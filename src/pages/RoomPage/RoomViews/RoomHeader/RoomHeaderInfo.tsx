import { ContentCopyRounded, LockRounded } from '@mui/icons-material';

import { Icon, Image, Tag } from '@/components';
import { LOGOS } from '@/constants/logos';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import * as S from '@/pages/RoomPage/RoomPage.style';
import { RoomType } from '@/types/room';

interface RoomInfoProps {
  data: RoomType;
  className: string;
}

export default function RoomInfoContainer({ className, data }: RoomInfoProps) {
  const { theme } = useCustomTheme();

  const { roomUUID, title, tags, languages } = data;

  const handleCopyRoomId = () => {
    window.navigator.clipboard.writeText(roomUUID);

    alert('방 번호가 복사되었습니다!');
  };

  return (
    <div className={className}>
      <S.RoomIdWrapper className="roomId">
        <S.CopyRoomIdTag onClick={handleCopyRoomId}>
          <S.TextId>방 번호 복사</S.TextId>
          <Icon size="XXS">
            <ContentCopyRounded />
          </Icon>
        </S.CopyRoomIdTag>
      </S.RoomIdWrapper>
      <S.TitleWrapper className="title">
        <Icon
          color={theme.color.text_primary_color}
          style={{
            paddingRight: '0.5rem',
            cursor: 'default',
          }}
        >
          <LockRounded />
        </Icon>
        <h2>{title}</h2>
      </S.TitleWrapper>
      <S.TagsWrapper className="tagsGroup">
        {tags.map((tag, index) => (
          <S.TagWrapper key={tag + index}>
            <Tag
              height="2.6rem"
              fontSize="1.4rem"
              mode="normal"
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
              src={LOGOS[language]}
            />
          </S.LogoWrapper>
        ))}
      </S.LogosWrapper>
    </div>
  );
}
