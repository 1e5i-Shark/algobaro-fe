import { HTMLAttributes, useState } from 'react';

import { TagWrapper } from './Tag.style';

export type TagModeType = 'normal' | 'select' | 'delete';

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  mode: TagModeType;
  width?: string;
  height?: string;
  fontSize?: string;
  backgroundColor?: string;
  borderColor?: string;
  isSelected?: boolean;
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
  ...props
}: TagProps) {
  const [isTagSelect, setIsTagSelect] = useState(isSelected);

  const handleSelectTag = () => {
    setIsTagSelect(!isTagSelect);
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
    </TagWrapper>
  );
}
