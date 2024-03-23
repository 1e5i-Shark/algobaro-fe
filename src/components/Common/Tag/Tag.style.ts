import styled, { css } from 'styled-components';

import { TagModeType } from './Tag';

interface TagWrapperProps {
  mode: TagModeType;
  $width: string;
  $height: string;
  $fontSize: string;
  $textColor: string;
  $backgroundColor: string;
  $borderColor: string;
}

export const TagWrapper = styled.div<TagWrapperProps>`
  ${({
    theme,
    mode,
    $width,
    $height,
    $fontSize,
    $textColor,
    $backgroundColor,
    $borderColor,
  }) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${$width};
    height: ${$height};
    padding: ${theme.size.XS + ' ' + theme.size.L};
    font-size: ${$fontSize};
    color: ${$textColor};
    cursor: ${mode !== 'normal' ? 'pointer' : ''};
    user-select: none;
    background-color: ${$backgroundColor};
    border: 1px solid transparent;
    border-color: ${$borderColor};
    /* pill 모양 디자인을 위해 height의 1/2 값을 사용 */
    border-radius: ${(Number($height.replace('rem', '')) / 2).toString() +
    'rem'};

    &:hover {
      .tag-delete-button {
        opacity: 1;
      }
    }
  `}
`;

export const DeleteButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    right: ${theme.size.XS};
    display: flex;
    color: ${theme.color.black_primary};
    opacity: 0;
  `}
`;
