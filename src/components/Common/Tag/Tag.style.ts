import styled from 'styled-components';

import { TagModeType } from './Tag';

interface TagWrapperProps {
  mode: TagModeType;
  $width: string;
  $height: string;
  $fontSize: string;
  $backgroundColor: string;
  $borderColor: string;
}

export const TagWrapper = styled.div<TagWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: ${({ theme }) => theme.size.XS + ' ' + theme.size.L};
  font-size: ${({ $fontSize }) => $fontSize};
  cursor: ${({ mode }) => (mode !== 'normal' ? 'pointer' : '')};

  user-select: none;
  background-color: ${({ theme, $backgroundColor, mode }) =>
    mode === 'select' ? $backgroundColor : theme.color.gray_50};
  border: 1px solid transparent;
  border-color: ${({ $borderColor, mode, theme, $backgroundColor }) =>
    mode === 'select' && !$borderColor
      ? theme.color.gray_50
      : $backgroundColor};
  border-radius: ${({ $height }) =>
    (Number($height.replace('rem', '')) / 2).toString() + 'rem'};
`;
