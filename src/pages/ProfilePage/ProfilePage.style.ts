import styled, { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

import ProfileEditModal from './ProfileEditModal/ProfileEditModal';

export const ProfilePageWrapper = styled(Col)`
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const UserInfoContainer = styled(Row)`
  ${({ theme }) => css`
    gap: ${theme.size.XXL};
    align-items: center;
    width: %;
    min-width: 54rem;
    height: 13rem;
    padding: ${theme.size.M};
    background-color: ${theme.color.background_menu};
    border-radius: ${theme.size.S};
  `}
`;

export const UserAvatarContainer = styled.div`
  ${({ theme }) => css`
    padding: ${theme.size.M};
  `}
`;

export const UserInfoTextContainer = styled(Col)``;

export const UserName = styled.p``;
export const UserEmail = styled.p``;

export const UserInfoButtonContainer = styled(Row)`
  ${({ theme }) => css`
    gap: 1rem;
    margin-right: ${theme.size.XL};
    margin-left: auto;
    button {
      width: 10rem;
      height: 3rem;
      font-size: ${theme.size.M};
    }
  `}
`;

export const MySolveTextContainer = styled(Row)`
  justify-content: normal;
`;

export const EditModal = styled(ProfileEditModal)`
  max-width: 60rem;
  min-height: 50rem;
`;
