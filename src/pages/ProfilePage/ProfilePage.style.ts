import styled, { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

import PasswordEditModal from './PasswordEditModal/PasswordEditModal';
import ProfileEditModal from './ProfileEditModal/ProfileEditModal';

export const ProfilePageWrapper = styled(Col)`
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const UserInfoContainer = styled(Row)`
  ${({ theme }) => css`
    gap: ${theme.size.M};
    align-items: center;
    width: 60%;
    min-width: 65rem;
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

export const AvatarInput = styled.input`
  display: none;
`;

export const UserInfoTextContainer = styled(Col)``;

export const UserName = styled.p`
  ${({ theme }) => css`
    margin-bottom: ${theme.size.XS};
    font-size: ${theme.size.L};
    font-weight: ${theme.fontWeight.bold};
  `}
`;
export const UserEmail = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.size.M};
  `}
`;
export const UserInfoTitle = styled.span`
  ${({ theme }) => css`
    margin-right: ${theme.size.XS};
    font-weight: ${theme.fontWeight.semiBold};
  `}
`;

export const UserBojId = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.size.M};
  `}
`;

export const UserInfoButtonContainer = styled(Row)`
  ${({ theme }) => css`
    gap: 1rem;
    margin-right: ${theme.size.L};
    margin-left: auto;
    button {
      width: 10rem;
      height: 3rem;
      font-size: ${theme.size.M};
    }
  `}
`;

export const MySolveTextContainer = styled(Row)`
  ${({ theme }) => css`
    justify-content: normal;
    width: 60%;
    min-width: 65rem;
    margin-top: ${theme.size.XL};
  `}
`;

export const MySolveTitle = styled.p`
  ${({ theme }) => css`
    margin-right: ${theme.size.XS};
    font-weight: ${theme.fontWeight.semiBold};
  `}
`;

export const MySolveText = styled.p``;

export const EditInfoModal = styled(ProfileEditModal)`
  max-width: 60rem;
  min-height: 50rem;
`;
export const EditPWModal = styled(PasswordEditModal)`
  max-width: 60rem;
  min-height: 50rem;
`;
