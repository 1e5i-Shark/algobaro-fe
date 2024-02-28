import styled, { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

// RoomPage
export const RoomContainer = styled(Row)`
  height: 100vh;
  padding: 3rem 0rem 3rem 5rem;
`;

export const WaitingRoomContainer = styled(Col)`
  flex-grow: 2;
  min-width: 50rem;
  padding-right: 3rem;
`;

export const ChatContainer = styled(Col)`
  ${({ theme }) => css`
    flex-grow: 1;
    min-width: 25rem;
    padding: 0 1rem;
    border-left: 1px solid ${theme.color.transparent_30};
  `}
`;

// ChatInput
export const ChatInputWrapper = styled(Col)`
  justify-content: center;
  height: 5rem;
`;

export const ChatListWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export const Form = styled(Row)`
  align-items: center;
  justify-content: center;
`;

export const InputWrapper = styled.div`
  flex-grow: 1;
  width: 10rem;
  height: 4rem;
`;

export const SendButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  margin-left: 1rem;
  border-radius: 0.5rem;
`;

// RoomHeader
export const HeaderContainer = styled(Row)`
  justify-content: space-between;
  width: 100%;
`;

export const RoomInfoContainer = styled.div`
  /* background-color: 'peru'; */
`;

export const ButtonsWrapper = styled(Row)``;

export const RoomIdWrapper = styled(Row)`
  padding-bottom: 1rem;

  &:hover {
    filter: brightness(95%);
  }
`;

export const CopyRoomIdTag = styled(Row)`
  ${({ theme }) => css`
    padding: 0.6rem 1rem;
    cursor: pointer;
    background-color: ${theme.color.container_color};
    border-radius: 0.3rem;
  `}
`;

export const TextId = styled.div`
  padding-right: 0.3rem;
  font-size: 1.4rem;
`;

export const TitleWrapper = styled(Row)`
  align-items: center;
  padding-bottom: 2rem;
`;

export const TagsWrapper = styled(Row)`
  padding-bottom: 1rem;
`;

export const TagWrapper = styled.div`
  padding-right: 0.5rem;
`;

export const LogosWrapper = styled(Row)``;

export const LogoWrapper = styled.div`
  ${({ theme }) => css`
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.5rem;
    border: 1px solid ${theme.color.transparent_50};
    border-radius: ${theme.size.half};

    &:last-of-type {
      margin-right: 0;
    }
  `}
`;

export const ModalWrapper = styled(Col)`
  gap: 2rem;
`;

export const ModalHeader = styled.h3``;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PasswordWrapper = styled(Row)`
  gap: 1rem;
  align-items: center;
  height: 7rem;

  > :first-child {
    width: 20rem;
  }
`;

export const ModalButtonsWrapper = styled(Row)`
  gap: 1rem;
  padding-top: 1rem;
`;

// Participants
export const ParticipantsContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(3, ${theme.FIXED_WIDTH.CARD});
    gap: 2rem;
    justify-content: center;
    margin-top: 5rem;
  `}
`;

// TestInfo
export const TestInfoWrapper = styled(Row)`
  justify-content: space-between;
  margin-top: 5rem;
`;

export const WaitingButtonWrapper = styled(Col)`
  align-items: flex-end;
`;

export const Text = styled.div<{ $color: string; $padding: string }>`
  ${({ $color, $padding }) => css`
    padding: ${$padding};
    color: ${$color};
  `}
`;

export const TestInfoTable = styled.table`
  ${({ theme }) => css`
    width: fit-content;
    border-spacing: 0;
    border: 1px solid ${theme.color.transparent_90};
    border-radius: 0.5rem;
    tr {
      height: 4rem;

      &:first-of-type td {
        border-bottom: 1px solid ${theme.color.transparent_90};
      }
    }

    td {
      padding: 1rem 1.5rem;

      .row-content {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .icon {
        padding-left: 0.5rem;
        transform: rotate(135deg);
      }
    }
  `}
`;
