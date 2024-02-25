import { ContentCopyRounded, LockRounded } from '@mui/icons-material';

import { Icon, Image, Tag } from '@/components';
import { LOGOS } from '@/constants/logos';
import { useCustomTheme } from '@/hooks/useCustomTheme';
import {
  CopyRoomIdTag,
  LogosWrapper,
  LogoWrapper,
  RoomIdWrapper,
  TagsWrapper,
  TagWrapper,
  TextId,
  TitleWrapper,
} from '@/pages/RoomPage/RoomPage.style';
import { UpdateRoomType } from '@/types/room';

interface RoomInfoProps {
  data: UpdateRoomType;
  className: string;
}

export default function RoomInfoContainer({ className, data }: RoomInfoProps) {
  const { theme } = useCustomTheme();

  const { shortUUID, title, tags, languages } = data;

  const handleCopyRoomId = () => {
    alert(`코드가 복사되었습니다 : ` + shortUUID);
  };

  return (
    <div className={className}>
      <RoomIdWrapper className="roomId">
        <CopyRoomIdTag onClick={handleCopyRoomId}>
          <TextId>방 코드 : {shortUUID}</TextId>
          <Icon>
            <ContentCopyRounded />
          </Icon>
        </CopyRoomIdTag>
      </RoomIdWrapper>
      <TitleWrapper className="title">
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
      </TitleWrapper>
      <TagsWrapper className="tagsGroup">
        {tags.map((tag, index) => (
          <TagWrapper key={tag + index}>
            <Tag
              fontSize="1.4rem"
              mode="normal"
              tagId={tag + index}
            >
              {tag}
            </Tag>
          </TagWrapper>
        ))}
      </TagsWrapper>
      <LogosWrapper className="logosGroup">
        {languages.map(language => (
          <LogoWrapper key={language}>
            <Image
              shape="circle"
              alt="logo"
              fill={true}
              src={LOGOS[language]}
            />
          </LogoWrapper>
        ))}
      </LogosWrapper>
    </div>
  );
}
