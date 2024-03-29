import styled from 'styled-components';
import { css } from 'styled-components';

import { Button } from '@/components';
import { ButtonHoverTransition } from '@/styles/GlobalStyle';

// 반복되는 너비 설정을 mixin으로 분리한다.
const commonWidth = css`
  width: 50%;
  max-width: 40rem;
`;

export const SignUpPageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const SignUpFormContainer = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.size.S};
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    user-select: none;

    > :nth-child(2) {
      ${commonWidth}
      display: flex;
      height: 2.1rem;
      span {
        margin: 0;
      }

      label {
        line-height: 2.1rem;
        color: ${theme.color.gray_50};
      }
    }
  `}
`;

export const SignUpInputContainer = styled.ul`
  ${commonWidth}
  display: flex;
  flex-direction: column;
`;

export const SignUpInputItem = styled.li`
  ${({ theme }) => css`
    width: 100%;
    /* 에러 라벨이 아래쪽에 표시됐을 때 최대 높이이다. */
    height: 9.3rem;
    label {
      font-size: ${theme.size.M};
      font-weight: ${theme.fontWeight.bold};
      color: ${theme.color.text_primary_color};
      user-select: none;
    }

    input {
      padding-left: ${theme.size.L};
      color: ${theme.color.text_primary_color};
      &::placeholder {
        line-height: 4rem;
        color: ${theme.color.gray_50};
      }
    }

    > div {
      > :nth-child(3) {
        height: ${theme.size.M};
      }
    }
  `}
`;

export const SignUpButton = styled(Button)`
  ${commonWidth}
  ${ButtonHoverTransition}
`;

export const HomeButton = styled(Button)`
  ${({ theme }) => css`
    ${commonWidth}
    ${ButtonHoverTransition}
    margin-top: ${theme.size.S};
  `}
`;
