import styled, { css } from 'styled-components';

import { Col, Row } from '@/styles/GlobalStyle';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1024px;
  padding: 4rem 2rem;
  margin: 0 auto;
`;

const InputListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
`;

const InputItemWrapper = styled.li`
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: start;
  min-height: 10rem;
`;

const TitleWrapper = styled(Row)`
  position: relative;
  top: 1.2rem;
  flex-shrink: 0;
  width: 10rem;
`;

const ContentsWrapper = styled(Row)`
  width: 100%;
  min-height: 6rem;
`;

const LanguagesWrapper = styled(Col)`
  position: relative;
  transform: translateY(0.8rem);
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const RoomAccessWrapper = styled(Row)`
  position: relative;
  height: 7rem;
`;

const CheckBoxWrapper = styled(Row)`
  position: relative;
  transform: translateY(-1rem);
`;

const PasswordWrapper = styled(Row)`
  gap: 1.4rem;
  margin-left: 3rem;
`;

const RoomLimitWrapper = styled(Col)`
  width: 100%;
`;

const PasswordTitle = styled.span`
  position: relative;
  top: 1.2rem;
  width: fit-content;
  white-space: nowrap;
`;

const TagListWrapper = styled(Col)`
  gap: 1rem;
  width: 100%;
`;

const TagGuideText = styled.span`
  ${({ theme }) => css`
    color: ${theme.color.gray_30};
  `}
`;

export {
  CheckBoxWrapper,
  ContentsWrapper,
  FormWrapper,
  InputItemWrapper,
  InputListWrapper,
  LanguagesWrapper,
  PasswordTitle,
  PasswordWrapper,
  RoomAccessWrapper,
  RoomLimitWrapper,
  TagGuideText,
  TagListWrapper,
  TagWrapper,
  TitleWrapper,
};
