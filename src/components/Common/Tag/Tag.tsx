import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { HTMLAttributes, useState } from 'react';

import { useCustomTheme } from '@/hooks/useCustomTheme';

import { DeleteButton, TagWrapper } from './Tag.style';

export type TagModeType = 'normal' | 'select' | 'delete';

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  mode: TagModeType;
  tagId: string;
  width?: string;
  height?: string;
  fontSize?: string;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  isSelected?: boolean;
  onSelected?: (tagName: string, newState: boolean) => void;
  onDeleted?: (tagName: string) => void;
}

/**
 * Tag 컴포넌트
 * @param [mode = 'normal'] - 필수, `normal`(기본값), `select`, `delete` 모드 설정 가능
 * @param [tagId] - 필수, 태그 id
 * @param [width = 'fit-content'] - 태그 너비
 * @param [height = '3rem'] - 태그 높이
 * @param [width = 'fit-content'] - 태그 너비
 * @param [fontSize = '1.6rem'] - 태그 폰트 사이즈
 * @param [backgroundColor = 'gray_50'] - 태그 배경, 선택 태그의 경우 전역 기본 배경색
 * @param [borderColor = {기본 배경색}] - border 색
 * @param [onSelected] - 선택 시 태그 이름과 선택 여부를 외부로 전달
 * @param [onDeleted] - 삭제 시 태그 이름 외부로 전달
 * @returns
 */
export default function Tag({
  mode = 'normal',
  tagId,
  width = 'fit-content',
  height = '3rem',
  fontSize = '',
  textColor,
  backgroundColor = '',
  borderColor = '',
  children,
  isSelected = false,
  onSelected,
  onDeleted,
  ...props
}: TagProps) {
  const { theme } = useCustomTheme();

  const [isTagSelect, setIsTagSelect] = useState(isSelected);

  const handleSelectTag = () => {
    setIsTagSelect(!isTagSelect);
    tagId && onSelected && onSelected(tagId, !isTagSelect);
  };

  const handleDeleteTag = () => {
    tagId && onDeleted && onDeleted(tagId);
  };

  return (
    <TagWrapper
      mode={mode}
      $width={width}
      $height={height}
      $fontSize={fontSize}
      $textColor={
        textColor ||
        (mode === 'select' && isTagSelect
          ? theme.color.black_primary
          : theme.color.text_primary_color)
      }
      $backgroundColor={
        mode === 'select'
          ? isTagSelect
            ? theme.color.secondary_color
            : backgroundColor
          : backgroundColor
      }
      $borderColor={
        mode === 'select' && !borderColor
          ? isTagSelect
            ? theme.color.secondary_color
            : theme.color.gray_50
          : backgroundColor
      }
      onClick={handleSelectTag}
      {...props}
    >
      {children}
      {mode === 'delete' && (
        <DeleteButton
          type="button"
          className="tag-delete-button"
          onClick={handleDeleteTag}
        >
          <CloseRoundedIcon />
        </DeleteButton>
      )}
    </TagWrapper>
  );
}
