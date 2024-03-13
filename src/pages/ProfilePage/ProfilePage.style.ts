import styled, { css } from 'styled-components';

import { ButtonHoverTransition, Col, Row } from '@/styles/GlobalStyle';

import PasswordEditModal from './PasswordEditModal/PasswordEditModal';
import ProfileEditModal from './ProfileEditModal/ProfileEditModal';

export const ProfilePageWrapper = styled(Col)`
  ${({ theme }) => css`
    align-items: center;
    width: 100%;
    height: 100%;
    padding: ${theme.size.XXL} 0;
  `}
`;

export const UserInfoContainer = styled(Row)`
  ${({ theme }) => css`
    flex-shrink: 0;
    gap: ${theme.size.M};
    align-items: center;
    width: 60%;
    min-width: 65rem;
    height: 12rem;
    padding: ${theme.size.M};
    background-color: ${theme.color.background_menu};
    border: 1px solid ${theme.color.gray_20};
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
      border: 1px solid ${theme.color.gray_20};
      ${ButtonHoverTransition}
    }
  `}
`;

export const MySolveTextContainer = styled(Row)`
  ${({ theme }) => css`
    justify-content: normal;
    width: 60%;
    min-width: 65rem;
    padding-left: ${theme.size.S};
    margin-top: ${theme.size.M};
  `}
`;

export const MySolveTitle = styled.p`
  ${({ theme }) => css`
    margin-right: ${theme.size.XS};
    font-weight: ${theme.fontWeight.semiBold};
  `}
`;

export const MySolveText = styled.p``;

export const ProblemHistoryContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 60%;
    min-width: 65rem;
    margin-top: ${theme.size.S};
    > :last-child {
      ul {
        justify-content: center;
      }
    }
  `}
`;
export const ProblemHistoryTitle = styled.p`
  ${({ theme }) => css`
    padding-left: ${theme.size.S};
    margin-bottom: ${theme.size.S};
    font-weight: ${theme.fontWeight.semiBold};
  `}
`;

export const ProblemHistoryListContainer = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: ${theme.size.S};
    width: 100%;
    padding: 0 ${theme.size.S};
    margin-top: ${theme.size.XS};
    margin-bottom: ${theme.size.XS};
  `}
`;

export const ProblemHistoryItem = styled.li`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.size.M};
    align-items: center;
    padding: ${theme.size.S} ${theme.size.L};
    cursor: pointer;
    background-color: ${theme.color.background_menu};
    border: 1px solid ${theme.color.gray_20};
    border-radius: ${theme.size.S};
  `}
`;

export const ProblemLink = styled.p`
  margin-right: auto;
`;

export const EmptyHistory = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const EditInfoModal = styled(ProfileEditModal)`
  max-width: 60rem;
  min-height: 50rem;
`;
export const EditPWModal = styled(PasswordEditModal)`
  max-width: 60rem;
  min-height: 50rem;
`;
