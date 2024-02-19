import styled from 'styled-components';

import { TagModeType } from './Tag';

interface TagWrapperProps {
  mode: TagModeType;
  $width: string;
  $height: string;
  $fontSize: string;
  $backgroundColor: string;
  $borderColor: string;
  $isSelected: boolean;
}

export const TagWrapper = styled.div<TagWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: ${({ theme }) => theme.size.XS + ' ' + theme.size.L};
  font-size: ${({ $fontSize }) => $fontSize};
  color: ${({ $isSelected, theme }) =>
    $isSelected && theme.color.black_primary};
  cursor: ${({ mode }) => (mode !== 'normal' ? 'pointer' : '')};

  user-select: none;
  background-color: ${({ theme, $backgroundColor, $isSelected, mode }) =>
    mode === 'select'
      ? $isSelected
        ? theme.color.secondary_color
        : $backgroundColor
      : theme.color.gray_50};
  border: 1px solid transparent;
  border-color: ${({
    $borderColor,
    $isSelected,
    mode,
    theme,
    $backgroundColor,
  }) =>
    mode === 'select' && !$borderColor
      ? $isSelected
        ? theme.color.secondary_color
        : theme.color.gray_50
      : $backgroundColor};
  border-radius: ${({ $height }) =>
    (Number($height.replace('rem', '')) / 2).toString() + 'rem'};

  &:hover {
    .tag-delete-button {
      opacity: 1;
    }
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.size.XS};
  display: flex;
  color: ${({ theme }) => theme.color.black_primary};
  opacity: 0;
`;
