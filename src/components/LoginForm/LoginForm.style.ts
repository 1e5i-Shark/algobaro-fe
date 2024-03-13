import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { ButtonHoverTransition, Row } from '@/styles/GlobalStyle';
import { ThemeType } from '@/styles/theme';

import { Button } from '..';

interface LoginFormWrapperProps {
  theme: ThemeType;
  width: string;
}

export const LoginFormWrapper = styled.div<LoginFormWrapperProps>`
  ${({ theme, width }) => css`
    width: ${width};
    padding: ${theme.size.S};
  `}
`;

export const LoginFormContainer = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.size.M};
    user-select: none;
  `}
`;

export const LoginInputContainer = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.size.M};
  `}
`;

export const LoginInputItem = styled.li`
  ${({ theme }) => css`
    label {
      font-size: ${theme.size.M};
      font-weight: ${theme.fontWeight.semiBold};
      color: ${theme.color.text_primary_color};
    }
    input {
      padding-left: ${theme.size.L};
      color: ${theme.color.text_primary_color};
      &::placeholder {
        color: ${theme.mode === 'light'
          ? theme.color.gray_50
          : theme.color.gray_30};
      }
      background-color: ${theme.color.transparent_50};
    }
  `}
`;

export const LoginButton = styled(Button)`
  width: 100%;
  ${ButtonHoverTransition}
`;

export const LoginOptionContainer = styled(Row)`
  ${({ theme }) => css`
    align-items: center;
    justify-content: space-between;
    user-select: none;
    & {
      span {
        width: 1.2rem;
        height: 1.2rem;
      }

      label {
        font-size: 1.2rem;
        color: ${theme.color.gray_50};
        &:hover {
          color: ${theme.color.gray_20};
        }
      }
    }
  `}
`;

export const SignUpTextLink = styled(NavLink)`
  ${({ theme }) => css`
    font-size: 1.2rem;
    color: ${theme.color.gray_50};
    &:hover {
      color: ${theme.color.gray_20};
    }
  `}
`;
