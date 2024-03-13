import styled, { css } from 'styled-components';

import { ButtonHoverTransition } from '@/styles/GlobalStyle';

export const ModalTitle = styled.p`
  ${({ theme }) => css`
    position: absolute;
    top: ${theme.size.XXL};
    left: ${theme.size.XXL};
    font-size: ${theme.size.L};
    font-weight: ${theme.fontWeight.semiBold};
  `}
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  align-items: center;
  width: 30rem;
  button {
    width: 50%;
    ${ButtonHoverTransition}
  }
`;

export const ModalInputList = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.size.M};
    width: 100%;
  `}
`;

export const ModalInputItem = styled.li`
  ${({ theme }) => css`
    width: 100%;
    height: 9rem;
    label {
      font-size: ${theme.size.M};
      font-weight: ${theme.fontWeight.semiBold};
      color: ${theme.color.text_primary_color};
    }
    input {
      &::placeholder {
        color: ${theme.color.gray_30};
      }
    }
  `}
`;
