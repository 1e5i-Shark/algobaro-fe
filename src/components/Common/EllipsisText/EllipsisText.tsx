import { ComponentProps, ReactNode } from 'react';

import { BaseEllipsisText } from './EllipsisText.style';

interface EllipsisTextProps extends ComponentProps<'span'> {
  width?: string;
  fontSize?: string;
  fontWeight?: number;
  lineClamp?: number;
  children: ReactNode;
}

/**
 * EllipsisText 컴포넌트
 * @param [width='100%']
 * @param [fontSize='1.6rem']
 * @param [fontWeight=400]
 * @param [lineClamp=1]
 */

export default function EllipsisText({
  width = '100%',
  fontSize = '1.6rem',
  fontWeight = 400,
  lineClamp = 1,
  children,
  ...props
}: EllipsisTextProps) {
  return (
    <BaseEllipsisText
      $width={width}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $lineClamp={lineClamp}
      {...props}
    >
      {children}
    </BaseEllipsisText>
  );
}
