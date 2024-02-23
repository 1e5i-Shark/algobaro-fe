import styled, { css } from 'styled-components';

import { Row } from '@/styles/GlobalStyle';

interface StyledWrapperProps {
  $textColor: string;
  $fontSize: string;
  $fontWeight: number;
}

export const CheckBoxWrapper = styled(Row)`
  gap: 0.5rem;
  align-items: center;
`;

export const LabelText = styled.label<StyledWrapperProps>`
  ${({ $textColor, $fontSize, $fontWeight }) => css`
    font-size: ${$fontSize};
    font-weight: ${$fontWeight};
    color: ${$textColor};
    cursor: pointer;
  `}
`;
