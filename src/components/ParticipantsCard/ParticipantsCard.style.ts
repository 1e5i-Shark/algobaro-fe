import { css, styled } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

export const CardWrapper = styled(Col)`
  ${({ theme }) => css`
    position: relative;
    flex-shrink: 0;
    gap: 1rem;
    align-items: center;
    width: ${theme.FIXED_WIDTH.CARD};
    height: ${theme.FIXED_HEIGHT.CARD};
    padding-top: 4.5rem;
    margin-right: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 8px 0 ${theme.color.transparent_30};
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
    padding-top: 1.5rem;
    border-top: 1px solid ${theme.color.transparent_50};
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
