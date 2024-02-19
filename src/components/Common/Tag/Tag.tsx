import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { HTMLAttributes, useState } from 'react';

import { DeleteButton, TagWrapper } from './Tag.style';

export type TagModeType = 'normal' | 'select' | 'delete';

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  mode: TagModeType;
  width?: string;
  height?: string;
  fontSize?: string;
  backgroundColor?: string;
  borderColor?: string;
  isSelected?: boolean;
  onSelected?: (tagName: string) => void;
  onDeleted?: (tagName: string) => void;
}

export default function Tag({
  mode = 'normal',
  width = 'fit-content',
  height = '3rem',
  fontSize = '',
  backgroundColor = '',
  borderColor = '',
  children,
  isSelected = false,
  onSelected,
  onDeleted,
  ...props
}: TagProps) {
  const [isTagSelect, setIsTagSelect] = useState(isSelected);

  const tagName = children?.toString();

  const handleSelectTag = () => {
    setIsTagSelect(!isTagSelect);
    tagName && onSelected && onSelected(tagName);
  };

  const handleDeleteTag = () => {
    tagName && onDeleted && onDeleted(tagName);
  };

  return (
    <TagWrapper
      mode={mode}
      $width={width}
      $height={height}
      $fontSize={fontSize}
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
      $isSelected={mode === 'select' ? isTagSelect : isSelected}
      onClick={handleSelectTag}
      {...props}
    >
      {children}
      {mode === 'delete' && (
        <DeleteButton
          className="tag-delete-button"
          onClick={handleDeleteTag}
        >
          <CloseRoundedIcon />
        </DeleteButton>
      )}
    </TagWrapper>
  );
}
