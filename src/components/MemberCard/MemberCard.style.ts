import { css, styled } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

export const CardWrapper = styled(Col)<{ $isEmpty?: boolean }>`
  ${({ theme, $isEmpty }) => css`
    position: relative;
    flex-shrink: 0;
    gap: 1rem;
    align-items: center;
    width: ${theme.FIXED_WIDTH.CARD};
    height: ${theme.FIXED_HEIGHT.CARD};
    padding-top: 4.5rem;
    background-color: ${!$isEmpty
      ? theme.color.transparent_10
      : theme.color.background_second};
    border: ${!$isEmpty ? `1px solid ${theme.color.transparent_30}` : 'none'};
    border-radius: 1rem;
    box-shadow: ${!$isEmpty
      ? `4px 4px 4px 0
      ${
        theme.mode === 'light'
          ? `${theme.color.transparent_50}`
          : `${theme.color.black_primary}`
      }`
      : 0};
  `}
`;

export const MenuWrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

export const NameWrapper = styled.div``;

export const StatusWrapper = styled(Row)`
  ${({ theme }) => css`
    position: absolute;
    bottom: 2rem;
    justify-content: center;
    width: calc(${theme.FIXED_WIDTH.CARD} - 5rem);
    padding-top: 1.5rem;
    border-top: 1px solid ${theme.color.transparent_30};
  `}
`;

export const StatusText = styled.span<{ $color: string }>`
  ${({ $color, theme }) => css`
    padding-right: 0.3rem;
    font-size: ${theme.size.L};
    font-weight: ${theme.fontWeight.semiBold};
    color: ${$color};
  `}
`;
