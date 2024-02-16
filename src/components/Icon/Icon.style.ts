import { styled } from 'styled-components';

export const IconWrapper = styled.button<{
  $isShowBackground: boolean;
}>`
  ${({ $isShowBackground, theme }) =>
    $isShowBackground &&
    `
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${
        theme.mode === 'light' ? theme.white_primary : theme.transparent_10
      };
      border-radius: 50%;
      box-shadow: ${
        theme.mode === 'light'
          ? `0px 4px 8px ${theme.black_primary}20`
          : `0px 4px 8px #00000050`
      };
    `}
`;
