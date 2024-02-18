import { HTMLAttributes } from 'react';

import { TagWrapper } from './Tag.style';

export type TagModeType = 'normal' | 'select' | 'delete';

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  mode: TagModeType;
  width?: string;
  height?: string;
  fontSize?: string;
  backgroundColor?: string;
  borderColor?: string;
}

export default function Tag({
  mode = 'normal',
  width = 'fit-content',
  height = '3rem',
  fontSize = '',
  backgroundColor = '',
  borderColor = '',
  children,
  ...props
}: TagProps) {
  return (
    <TagWrapper
      mode={mode}
      $width={width}
      $height={height}
      $fontSize={fontSize}
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
      {...props}
    >
      {children}
    </TagWrapper>
  );
}
